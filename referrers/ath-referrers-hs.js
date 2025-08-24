// Referrer Sync - Athena to HubSpot
import axios from "axios";

// Helper functions outside component (proper Pipedream pattern)
async function authenticateAthena(clientId, clientSecret, dataStore) {
	// Check for cached token
	const tokenCacheKey = `athena_token_195900`;
	let cachedToken = await dataStore.get(tokenCacheKey);

	// Validate cached token
	if (
		cachedToken &&
		cachedToken.expires_at &&
		new Date() < new Date(cachedToken.expires_at)
	) {
		console.log("✅ Using cached authentication token");
		return {
			auth_token: cachedToken.access_token,
			base_url: "https://api.preview.platform.athenahealth.com/v1",
			practice_id: "195900"
		};
	}

	// Get new token
	console.log("🔄 Requesting new authentication token...");

	try {
		const response = await axios({
			method: "POST",
			url: "https://api.preview.platform.athenahealth.com/oauth2/v1/token",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
			},
			data: "grant_type=client_credentials&scope=athena/service/Athenanet.MDP.*"
		});

		if (response.data && response.data.access_token) {
			const token = response.data.access_token;
			const expiresIn = response.data.expires_in || 3600; // Default 1 hour
			const expiresAt = new Date(Date.now() + (expiresIn - 60) * 1000); // 1 min buffer

			// Cache the token with TTL
			await dataStore.set(
				tokenCacheKey,
				{
					access_token: token,
					expires_at: expiresAt.toISOString(),
					practice_id: "195900"
				},
				{ ttl: expiresIn - 60 }
			);

			console.log("✅ Authentication successful");

			return {
				auth_token: token,
				base_url: "https://api.preview.platform.athenahealth.com/v1",
				practice_id: "195900"
			};
		} else {
			throw new Error("No access token in response");
		}
	} catch (error) {
		throw new Error(`Athena authentication failed: ${error.message}`);
	}
}

function validateAthenaReferrer(referrerData) {
	const errors = [];
	const sanitized = {};

	// Required fields
	if (!referrerData.name) {
		errors.push("Referrer name is required");
	}

	// Name validation
	if (referrerData.name) {
		sanitized.name = referrerData.name.toString().substring(0, 100);
	}

	// Address validation
	if (referrerData.address) {
		sanitized.address = referrerData.address.toString().substring(0, 200);
	}
	if (referrerData.city) {
		sanitized.city = referrerData.city.toString().substring(0, 50);
	}
	if (referrerData.state) {
		sanitized.state = referrerData.state.toString().substring(0, 2);
	}
	if (referrerData.zip) {
		sanitized.zip = referrerData.zip.toString().substring(0, 10);
	}

	// Phone validation
	if (referrerData.phone) {
		const phone = referrerData.phone.toString().replace(/\D/g, "");
		if (phone.length >= 7) {
			if (phone.length === 10) {
				sanitized.phone = `+1${phone}`;
			} else if (phone.length === 11 && phone.startsWith("1")) {
				sanitized.phone = `+${phone}`;
			} else {
				sanitized.phone = phone;
			}
		}
	}

	return {
		is_valid: errors.length === 0,
		errors: errors,
		sanitized_data: sanitized
	};
}

function athenaToHubspotReferrers(athenaReferrer) {
	return {
		// Currently enabled - known working field
		name:
			athenaReferrer.name,

		// Integration tracking - THIS IS THE UPSERT KEY
		referringproviderid: athenaReferrer.referringproviderid,

		// 🔄 INTEGRATION FLAGS per your architecture:
		// athena_integration_flag: NOT SET - this flag is ONLY for marking HubSpot records that need to go TO Athena
		// updated_by_integration: "true" - tells HubSpot workflow "this update came from integration, don't set athena_integration_flag"
		updated_by_integration: "true", // Prevents HubSpot workflow from setting athena_integration_flag = true

		// TODO: Enable these as HubSpot properties are created:
		firstname: athenaReferrer.firstname,
		lastname: athenaReferrer.lastname,
		middleinitial: athenaReferrer.middleinitial,
		address: athenaReferrer.address,
		address2: athenaReferrer.address2,
		city: athenaReferrer.city,
		state: athenaReferrer.state,
		zip: athenaReferrer.zip,
		phone: athenaReferrer.phone,
		fax: athenaReferrer.fax,
		specialty: athenaReferrer.specialty,
		npinumber: athenaReferrer.npinumber
	};
}

function normalizePhone(phone) {
	if (!phone) return null;

	const digits = phone.toString().replace(/\D/g, "");

	if (digits.length === 10) {
		return `+1${digits}`;
	} else if (digits.length === 11 && digits.startsWith("1")) {
		return `+${digits}`;
	} else if (digits.length >= 7) {
		// For shorter numbers, return the digits as-is
		return digits;
	}

	return null; // Only reject very short numbers
}

async function fetchAthenaProviders(authToken, baseUrl, practiceId) {
	try {
		const response = await axios({
			method: "GET",
			url: `${baseUrl}/${practiceId}/referringproviders?limit=5000`,
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Content-Type": "application/json"
			},
			timeout: 30000
		});

		return response.data.referringproviders || [];
	} catch (error) {
		if (error.response?.status === 404) {
			console.log(
				"ℹ️ No referrers endpoint available or no referrerr found"
			);
			return [];
		}
		throw new Error(`Failed to fetch referrers: ${error.message}`);
	}
}

async function processReferrer(referrer, dataStore) {
	// 1. Validate referrers data
	const validationResult = validateAthenaReferrer(referrer);

	if (!validationResult.is_valid) {
		throw new Error(
			`Invalid referrers data: ${validationResult.errors.join(", ")}`
		);
	}

	// 2. Transform referrers data for upsert
	const mappedData = athenaToHubspotReferrers(referrer);

	// 3. Return processed data for batch upsert (no need to check existing mappings)
	return {
		athenaId: referrer.referringproviderid,
		mappedData: mappedData
	};
}

async function batchUpsertHubSpotReferrers(referrers, hubspotToken) {
	try {
		const inputs = referrers.map((dept) => ({
			idProperty: "referringproviderid", // Property to use for upsert matching
			id: dept.mappedData.referringproviderid, // The actual ID value
			properties: dept.mappedData
		}));

		console.log("🔍 DEBUG - HubSpot batch upsert request:");
		console.log(
			"📝 URL:",
			"https://api.hubapi.com/crm/v3/objects/company/batch/upsert"
		);
		console.log("📝 Input count:", inputs.length);
		console.log("📝 First input sample:", JSON.stringify(inputs[0], null, 2));

		const response = await axios({
			method: "POST",
			url: "https://api.hubapi.com/crm/v3/objects/company/batch/upsert",
			headers: {
				Authorization: `Bearer ${hubspotToken}`,
				"Content-Type": "application/json"
			},
			data: {
				inputs
			},
			timeout: 60000 // Longer timeout for batch operations
		});

		return response.data.results; // Array of created/updated objects with IDs
	} catch (error) {
		console.error("❌ HubSpot batch upsert error details:");
		console.error("📝 Status:", error.response?.status);
		console.error("📝 Status text:", error.response?.statusText);
		console.error(
			"📝 Response data:",
			JSON.stringify(error.response?.data, null, 2)
		);
		console.error("📝 Request URL:", error.config?.url);
		console.error("📝 Request method:", error.config?.method);

		throw new Error(
			`Failed to batch upsert HubSpot referrers: ${error.message}${error.response?.data ? ` - ${JSON.stringify(error.response.data)}` : ""}`
		);
	}
}

async function processBatch(batch, dataStore) {
	const referrersToUpsert = [];
	let errorCount = 0;

	for (const referrer of batch) {
		try {
			const processedDept = await processReferrer(referrer, dataStore);
			referrersToUpsert.push(processedDept);
		} catch (error) {
			console.error(
				`❌ Error processing referrers ${referrer.referringproviderid}:`,
				error.message
			);
			errorCount++;

			// Log error
			await dataStore.set(
				`error_${Date.now()}_${referrer.referringproviderid}`,
				{
					error_message: `Referrer ${referrer.referringproviderid}: ${error.message}`,
					workflow_name: "Referrer Sync - Athena to HubSpot",
					object_id: referrer.referringproviderid,
					timestamp: new Date().toISOString()
				},
				{ ttl: 86400 * 7 } // 7 days
			);
		}
	}

	return { referrersToUpsert, errorCount };
}

async function executeBatchOperations(
	referrersToUpsert,
	hubspotToken,
	dataStore
) {
	let processedCount = 0;
	let errorCount = 0;

	// Batch upsert all referrers
	if (referrersToUpsert.length > 0) {
		try {
			console.log(
				`📝 Batch upserting ${referrersToUpsert.length} referrers in HubSpot`
			);
			const upsertResults = await batchUpsertHubSpotReferrers(
				referrersToUpsert,
				hubspotToken
			);

			// Process results and log successful operations
			for (let j = 0; j < upsertResults.length; j++) {
				const result = upsertResults[j];
				const athenaId = referrersToUpsert[j].athenaId;

				// Log whether this was a create or update based on the result
				if (result.createdAt === result.updatedAt) {
					console.log(
						`✨ Created referrers ${athenaId} in HubSpot with ID ${result.id}`
					);
				} else {
					console.log(
						`📝 Updated referrers ${athenaId} in HubSpot with ID ${result.id}`
					);
				}

				processedCount++;
			}
		} catch (error) {
			console.error(`❌ Batch upsert failed:`, error.message);
			errorCount += referrersToUpsert.length;
		}
	}

	return { processedCount, errorCount };
}

async function syncReferrersBatch(
	referrers,
	batchSize,
	hubspotToken,
	dataStore
) {
	let totalProcessed = 0;
	let totalErrors = 0;

	for (let i = 0; i < referrers.length; i += batchSize) {
		const batch = referrers.slice(i, i + batchSize);
		console.log(
			`🔄 Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} referrers)`
		);

		// Process batch for upsert
		const { referrersToUpsert, errorCount } = await processBatch(
			batch,
			dataStore
		);
		totalErrors += errorCount;

		// Execute batch upsert
		const { processedCount } = await executeBatchOperations(
			referrersToUpsert,
			hubspotToken,
			dataStore
		);
		totalProcessed += processedCount;

		// Delay between batches to respect rate limits
		if (i + batchSize < referrers.length) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}
	}

	return { processedCount: totalProcessed, errorCount: totalErrors };
}

async function triggerNextWorkflow(webhookUrl, cycleId) {
	try {
		await axios({
			method: "POST",
			url: webhookUrl,
			data: {
				trigger_source: "referrers-athena-to-hubspot",
				integration_cycle_id: cycleId,
				timestamp: new Date().toISOString(),
				previous_workflow: "referrers-athena-to-hubspot"
			},
			timeout: 30000
		});
		console.log("✅ referrers HubSpot to Athena sync workflow triggered");
	} catch (error) {
		console.error("⚠️ Failed to trigger next workflow:", error.message);
		// Don't throw - this shouldn't fail the current workflow
	}
}

export default defineComponent({
	props: {
		// Data store for state management
		dataStore: {
			type: "data_store",
			label: "Integration Data Store",
			description: "Data store for caching and state management"
		},
		// Authentication credentials
		athena_client_id: {
			type: "string",
			label: "Athena Client ID",
			description: "Athena API client ID",
			secret: true
		},
		athena_client_secret: {
			type: "string",
			label: "Athena Client Secret",
			description: "Athena API client secret",
			secret: true
		},
		athena_practice_id: {
			type: "string",
			label: "Athena Practice ID",
			description: "Athena practice ID for API calls",
			default: "195900"
		},
		hubspot_access_token: {
			type: "string",
			label: "HubSpot Access Token",
			description: "HubSpot private app access token",
			secret: true
		},
		// Configuration
		batch_size: {
			type: "integer",
			label: "Batch Size",
			description: "Number of referrers to process in each batch",
			default: 50,
			optional: true
		},
		referrers_hubspot_to_athena_webhook_url: {
			type: "string",
			label: "referrers HubSpot to Athena Webhook URL",
			description: "HTTP trigger URL for next workflow in chain",
			optional: true
		}
	},

	async run({ steps, $ }) {
		try {
			console.log("🔄 Starting Referrers sync - Athena to HubSpot");

			// Debug logging - let's see exactly what we have
			console.log("🔍 DEBUGGING - Full steps object:");
			console.log(JSON.stringify(steps, null, 2));

			console.log("🔍 DEBUGGING - steps type:", typeof steps);
			console.log("🔍 DEBUGGING - steps is null:", steps === null);
			console.log("🔍 DEBUGGING - steps is undefined:", steps === undefined);
			console.log(
				"🔍 DEBUGGING - steps keys:",
				steps ? Object.keys(steps) : "no keys"
			);

			if (steps) {
				console.log("🔍 DEBUGGING - steps.trigger exists:", "trigger" in steps);
				console.log("🔍 DEBUGGING - steps.trigger value:", steps.trigger);
				console.log("🔍 DEBUGGING - steps.trigger type:", typeof steps.trigger);

				if (steps.trigger) {
					console.log(
						"🔍 DEBUGGING - steps.trigger keys:",
						Object.keys(steps.trigger)
					);
					console.log(
						"🔍 DEBUGGING - steps.trigger.event exists:",
						"event" in steps.trigger
					);
					console.log(
						"🔍 DEBUGGING - steps.trigger.event value:",
						steps.trigger.event
					);

					if (steps.trigger.event) {
						console.log(
							"🔍 DEBUGGING - steps.trigger.event keys:",
							Object.keys(steps.trigger.event)
						);
						console.log(
							"🔍 DEBUGGING - steps.trigger.event.body:",
							steps.trigger.event.body
						);
						console.log(
							"🔍 DEBUGGING - steps.trigger.event.query:",
							steps.trigger.event.query
						);
					}
				}
			}

			// Safe access with detailed logging
			let triggerData = {};

			if (
				steps &&
				steps.trigger &&
				steps.trigger.event &&
				steps.trigger.event.body
			) {
				triggerData = steps.trigger.event.body;
				console.log(
					"✅ Found trigger data in body:",
					JSON.stringify(triggerData, null, 2)
				);
			} else if (
				steps &&
				steps.trigger &&
				steps.trigger.event &&
				steps.trigger.event.query
			) {
				triggerData = steps.trigger.event.query;
				console.log(
					"✅ Found trigger data in query:",
					JSON.stringify(triggerData, null, 2)
				);
			} else {
				console.log("⚠️ No trigger data found - using empty object");
				console.log("⚠️ This might be a manual test or different trigger type");
			}

			console.log(
				`📨 Triggered by: ${triggerData.trigger_source || "unknown"}`
			);
			console.log(`🆔 Cycle ID: ${triggerData.integration_cycle_id || "N/A"}`);

			// 1. Authenticate with Athena directly
			console.log("🔐 Authenticating with Athena...");
			const athenaAuth = await authenticateAthena(
				this.athena_client_id,
				this.athena_client_secret,
				this.dataStore
			);

			if (!athenaAuth || !athenaAuth.auth_token) {
				throw new Error("Failed to authenticate with Athena");
			}

			// 2. Get referrers from Athena (no changed feed - full list)
			console.log("📥 Fetching referrers from Athena...");
			const referrers = await fetchAthenaProviders(
				athenaAuth.auth_token,
				athenaAuth.base_url,
				this.athena_practice_id
			);

			if (!referrers || referrers.length === 0) {
				console.log("ℹ️ No referrers found in Athena");

				const result = {
					status: "success",
					processed: 0,
					errors: 0,
					timestamp: new Date().toISOString(),
					next_workflow: this.referrers_hubspot_to_athena_webhook_url
						? "referrers-hubspot-to-athena"
						: null
				};

				// Export data for downstream steps following Pipedream pattern
				$.export("result", result);
				return result;
			}

			console.log(`📊 Found ${referrers.length} Referrers in Athena`);

			// Debug: Show sample referrers data
			if (referrers.length > 0) {
				console.log("🔍 DEBUG - Sample Athena referrers data:");
				console.log(JSON.stringify(referrers[0], null, 2));

				// Debug: Show mapped data
				const sampleMapped = athenaToHubspotReferrers(referrers[0]);
				console.log("🔍 DEBUG - Sample mapped HubSpot data:");
				console.log(JSON.stringify(sampleMapped, null, 2));
			}

			// 3. Process referrers in batches using batch APIs
			const { processedCount, errorCount } = await syncReferrersBatch(
				referrers,
				this.batch_size,
				this.hubspot_access_token,
				this.dataStore
			);

			// 4. Update last sync timestamp
			await this.dataStore.set("last_sync_referrers_athena_to_hubspot", {
				timestamp: new Date().toISOString(),
				processed: processedCount,
				errors: errorCount
			});

			console.log(
				`✅ Referrers sync completed: ${processedCount} processed, ${errorCount} errors`
			);

			// 5. Trigger next workflow in chain (referrers HubSpot to Athena)
			if (this.referrers_hubspot_to_athena_webhook_url) {
				console.log(
					"🔗 Triggering referrers HubSpot to Athena sync workflow..."
				);
				await triggerNextWorkflow(
					this.referrers_hubspot_to_athena_webhook_url,
					triggerData.integration_cycle_id
				);
			}

			const result = {
				status: "success",
				processed: processedCount,
				errors: errorCount,
				timestamp: new Date().toISOString(),
				workflow: "referrers-athena-to-hubspot",
				cycle_id: triggerData.integration_cycle_id,
				next_workflow: this.referrers_hubspot_to_athena_webhook_url
					? "referrers-hubspot-to-athena"
					: null
			};

			// Export data for downstream steps following Pipedream pattern
			$.export("result", result);
			return result;
		} catch (error) {
			console.error("❌ referrers sync failed:", error.message);

			// Log error directly
			await this.dataStore.set(`error_${Date.now()}`, {
				error_message: error.message,
				workflow_name: "referrers Sync - Athena to HubSpot",
				timestamp: new Date().toISOString(),
				stack: error.stack
			});

			// Export error for downstream steps
			$.export("error", {
				status: "error",
				error: error.message,
				workflow: "referrers-athena-to-hubspot",
				timestamp: new Date().toISOString()
			});

			throw error;
		}
	}
});
