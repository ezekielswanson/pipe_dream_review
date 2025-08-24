8/20/2025, 3:22:30 PM
WEBHOOK URL?

8/20/2025, 3:22:30 PM
https://eoy9igovhui9tm7.m.pipedream.net

8/20/2025, 3:22:30 PM
🔄 Starting Referrers sync - Athena to HubSpot

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - Full steps object:

8/20/2025, 3:22:30 PM
{ "trigger": { "event": { "method": "POST", "path": "/", "query": {}, "client_ip": "3.90.53.87", "url": "https://eo5lor4tlxry33b.m.pipedream.net/", "headers": { "host": "eo5lor4tlxry33b.m.pipedream.net", "content-length": "151", "accept": "application/json, text/plain, */*", "content-type": "application/json", "user-agent": "axios/1.11.0", "accept-encoding": "gzip, compress, deflate, br" }, "body": { "trigger_source": "main-scheduler", "timestamp": "2025-08-20T20:22:28.016Z", "integration_cycle_id": "cycle_patients_1755721348016", "practice_id": "247701" } }, "context": { "id": "31ZAiWhdhvDBHw2y8ypg8kJr7UY", "ts": "2025-08-20T20:22:28.084Z", "pipeline_id": null, "workflow_id": "p_JZCVvex", "deployment_id": "d_KLs3NvnV", "source_type": "COMPONENT", "verified": false, "hops": null, "test": false, "replay": false, "owner_id": "o_YDI1lXr", "platform_version": "3.59.2", "workflow_name": "Patients Athena -> HS", "resume": null, "emitter_id": "hi_q7HlW5B", "external_user_id": null, "external_user_environment": null, "trace_id": "31ZAib5KdKKOS3seVpNyrQurEo2", "project_id": "proj_0psxrWG", "attachments": {} } }, "code": {} }

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps type: object

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps is null: false

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps is undefined: false

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps keys: [ 'trigger', 'code' ]

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger exists: true

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger value: { event: { method: 'POST', path: '/', query: {}, client_ip: '3.90.53.87', url: 'https://eo5lor4tlxry33b.m.pipedream.net/', headers: { host: 'eo5lor4tlxry33b.m.pipedream.net', 'content-length': '151', accept: 'application/json, text/plain, */*', 'content-type': 'application/json', 'user-agent': 'axios/1.11.0', 'accept-encoding': 'gzip, compress, deflate, br' }, body: { trigger_source: 'main-scheduler', timestamp: '2025-08-20T20:22:28.016Z', integration_cycle_id: 'cycle_patients_1755721348016', practice_id: '247701' } }, context: { id: '31ZAiWhdhvDBHw2y8ypg8kJr7UY', ts: '2025-08-20T20:22:28.084Z', pipeline_id: null, workflow_id: 'p_JZCVvex', deployment_id: 'd_KLs3NvnV', source_type: 'COMPONENT', verified: false, hops: null, test: false, replay: false, owner_id: 'o_YDI1lXr', platform_version: '3.59.2', workflow_name: 'Patients Athena -> HS', resume: null, emitter_id: 'hi_q7HlW5B', external_user_id: null, external_user_environment: null, trace_id: '31ZAib5KdKKOS3seVpNyrQurEo2', project_id: 'proj_0psxrWG', attachments: {} } }

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger type: object

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger keys: [ 'event', 'context' ]

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger.event exists: true

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger.event value: { method: 'POST', path: '/', query: {}, client_ip: '3.90.53.87', url: 'https://eo5lor4tlxry33b.m.pipedream.net/', headers: { host: 'eo5lor4tlxry33b.m.pipedream.net', 'content-length': '151', accept: 'application/json, text/plain, */*', 'content-type': 'application/json', 'user-agent': 'axios/1.11.0', 'accept-encoding': 'gzip, compress, deflate, br' }, body: { trigger_source: 'main-scheduler', timestamp: '2025-08-20T20:22:28.016Z', integration_cycle_id: 'cycle_patients_1755721348016', practice_id: '247701' } }

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger.event keys: [ 'method', 'path', 'query', 'client_ip', 'url', 'headers', 'body' ]

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger.event.body: { trigger_source: 'main-scheduler', timestamp: '2025-08-20T20:22:28.016Z', integration_cycle_id: 'cycle_patients_1755721348016', practice_id: '247701' }

8/20/2025, 3:22:30 PM
🔍 DEBUGGING - steps.trigger.event.query: {}

8/20/2025, 3:22:30 PM
✅ Found trigger data in body: { "trigger_source": "main-scheduler", "timestamp": "2025-08-20T20:22:28.016Z", "integration_cycle_id": "cycle_patients_1755721348016", "practice_id": "247701" }

8/20/2025, 3:22:30 PM
📨 Triggered by: main-scheduler

8/20/2025, 3:22:30 PM
🆔 Cycle ID: cycle_patients_1755721348016

8/20/2025, 3:22:30 PM
🔐 Authenticating with Athena...

8/20/2025, 3:22:30 PM
✅ Using cached authentication token

8/20/2025, 3:22:30 PM
📥 Fetching patients from Athena...

8/20/2025, 3:22:31 PM
📊 Found 1 Patients in Athena

8/20/2025, 3:22:31 PM
🔍 DEBUG - Sample Athena patients data:

8/20/2025, 3:22:31 PM
{ "email": "zeke_473_@aptitude8.com", "guarantorcountrycode3166": "US", "city": "AMARILLO", "departmentid": "102", "contactpreference": "MOBILEPHONE", "portaltermsonfile": false, "consenttotext": true, "dob": "09/01/1960", "guarantorzip": "79121", "guarantorfirstname": "Test Zeke Athena To Hubsppot", "consenttocall": false, "lastname": "Swanson Athena To Hubspot 43", "racename": "African American", "guarantorcity": "AMARILLO", "guarantorlastname": "Swanson Athena To Hubspot 43", "zip": "79121", "contactpreference_announcement_sms": true, "guarantordob": "09/01/1960", "guarantorrelationshiptopatient": "1", "firstname": "Test Zeke Athena To Hubsppot", "confidentialitycode": "N", "guarantoraddress1": "7809 Covington Pwky", "referralsourceid": "1641", "emailexists": true, "testpatient": false, "sex": "F", "homephone": "8064333378", "smsoptindate": "08/20/2025", "guarantorstate": "TX", "guarantoremail": "zeke_473_@aptitude8.com", "mobilephone": "8064333378", "patientid": "1229350", "lastupdated": "08/20/2025", "contactpreference_billing_sms": true, "address1": "7809 Covington Pwky", "primarydepartmentid": "102", "guarantoraddresssameaspatient": true, "guarantorphone": "8064333378", "countrycode": "USA", "caresummarydeliverypreference": "PORTAL", "registrationdate": "08/20/2025", "contactpreference_appointment_sms": true, "maritalstatusname": "SINGLE", "lastupdatedby": "ndixon43", "guarantorcountrycode": "USA", "sexualorientation": "Choose not to disclose", "homebound": false, "language6392code": "eng", "contactpreference_lab_sms": true, "primaryproviderid": "99", "maritalstatus": "S", "status": "active", "race": [ "2058-6" ], "privacyinformationverified": false, "hasmobile": true, "notes": "Update note test", "countrycode3166": "US", "racecode": "R3.02", "state": "TX", "customfields": [ { "customfieldvalue": "CHANG, BILL K", "customfieldid": "2" } ] }

8/20/2025, 3:22:31 PM
🔍 DEBUG - Sample mapped HubSpot data:

8/20/2025, 3:22:31 PM
{
  "patientid": "1229350",
  "updated_by_integration": "true",
  "firstname": "Test Zeke Athena To Hubsppot",
  "lastname": "Swanson Athena To Hubspot 43",
  "gender": "F",
  "date_of_birth": "09/01/1960",
  "address": "7809 Covington Pwky",
  "city": "AMARILLO",
  "state": "TX",
  "zip": "79121",
  "country": "USA",
  "phone": "8064333378",
  "mobilephone": "8064333378",
  "email": "zeke_473_@aptitude8.com",
  "maritalstatus": "S",
  "referralsourceid": "1641",
  "guarantorfirstname": "Test Zeke Athena To Hubsppot",
  "guarantorlastname": "Swanson Athena To Hubspot 43",
  "guarantordob": -294537600000,
  "department_id_lookup": "102",
  "primaryproviderid": "99",
  "language6392code": "eng",
  "active_departments": "",
  "other_patient_departments": ""
}

8/20/2025, 3:22:31 PM
🔄 Processing batch 1 (1 patients)

8/20/2025, 3:22:31 PM
{
  patientsToUpsert: [ { athenaId: '1229350', mappedData: [Object] } ],
  errorCount: 0
}

8/20/2025, 3:22:31 PM
PDD:

8/20/2025, 3:22:31 PM
[ { athenaId: '1229350', mappedData: { patientid: '1229350', updated_by_integration: 'true', firstname: 'Test Zeke Athena To Hubsppot', lastname: 'Swanson Athena To Hubspot 43', gender: 'F', date_of_birth: '09/01/1960', address: '7809 Covington Pwky', address2: undefined, city: 'AMARILLO', state: 'TX', zip: '79121', country: 'USA', phone: '8064333378', mobilephone: '8064333378', email: 'zeke_473_@aptitude8.com', deceaseddate: undefined, maritalstatus: 'S', referralsourceid: '1641', referralsourceother: undefined, guarantorfirstname: 'Test Zeke Athena To Hubsppot', guarantorlastname: 'Swanson Athena To Hubspot 43', guarantordob: -294537600000, relationshiptoinsured: undefined, insureddob: undefined, image: undefined, providergroupid: undefined, department_id_lookup: '102', primaryproviderid: '99', language6392code: 'eng', fax: undefined, specialty: undefined, npinumber: undefined, active_departments: '', other_patient_departments: '' } } ]

8/20/2025, 3:22:31 PM
PATIENTS:

8/20/2025, 3:22:31 PM
[
  {
    athenaId: '1229350',
    mappedData: {
      patientid: '1229350',
      updated_by_integration: 'true',
      firstname: 'Test Zeke Athena To Hubsppot',
      lastname: 'Swanson Athena To Hubspot 43',
      gender: 'F',
      date_of_birth: '09/01/1960',
      address: '7809 Covington Pwky',
      address2: undefined,
      city: 'AMARILLO',
      state: 'TX',
      zip: '79121',
      country: 'USA',
      phone: '8064333378',
      mobilephone: '8064333378',
      email: 'zeke_473_@aptitude8.com',
      deceaseddate: undefined,
      maritalstatus: 'S',
      referralsourceid: '1641',
      referralsourceother: undefined,
      guarantorfirstname: 'Test Zeke Athena To Hubsppot',
      guarantorlastname: 'Swanson Athena To Hubspot 43',
      guarantordob: -294537600000,
      relationshiptoinsured: undefined,
      insureddob: undefined,
      image: undefined,
      providergroupid: undefined,
      department_id_lookup: '102',
      primaryproviderid: '99',
      language6392code: 'eng',
      fax: undefined,
      specialty: undefined,
      npinumber: undefined,
      active_departments: '',
      other_patient_departments: ''
    }
  }
]

8/20/2025, 3:22:31 PM
📝 Batch upserting 1 patients in HubSpot

8/20/2025, 3:22:31 PM
🔍 DEBUG - HubSpot batch upsert request:

8/20/2025, 3:22:31 PM
📝 URL: https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert

8/20/2025, 3:22:31 PM
📝 Input count: 1

8/20/2025, 3:22:31 PM
📝 First input sample: {
  "idProperty": "patientid",
  "id": "1229350",
  "properties": {
    "patientid": "1229350",
    "updated_by_integration": "true",
    "firstname": "Test Zeke Athena To Hubsppot",
    "lastname": "Swanson Athena To Hubspot 43",
    "gender": "F",
    "date_of_birth": "09/01/1960",
    "address": "7809 Covington Pwky",
    "city": "AMARILLO",
    "state": "TX",
    "zip": "79121",
    "country": "USA",
    "phone": "8064333378",
    "mobilephone": "8064333378",
    "email": "zeke_473_@aptitude8.com",
    "maritalstatus": "S",
    "referralsourceid": "1641",
    "guarantorfirstname": "Test Zeke Athena To Hubsppot",
    "guarantorlastname": "Swanson Athena To Hubspot 43",
    "guarantordob": -294537600000,
    "department_id_lookup": "102",
    "primaryproviderid": "99",
    "language6392code": "eng",
    "active_departments": "",
    "other_patient_departments": ""
  }
}

8/20/2025, 3:22:31 PM
✨ Created patient 1229350 in HubSpot with ID 148929281044

8/20/2025, 3:22:31 PM
GOT HERE 2

8/20/2025, 3:22:31 PM
✅ Patients sync completed: 1 processed, 0 errors

8/20/2025, 3:22:31 PM
ATTEMPTING CASES SYNC

8/20/2025, 3:22:32 PM
🔍 DEBUG - HubSpot batch upsert request:

8/20/2025, 3:22:32 PM
📝 URL: https://api.hubapi.com/crm/v3/objects/2-47837618/batch/upsert

8/20/2025, 3:22:32 PM
📝 Input count: 1

8/20/2025, 3:22:32 PM
📝 First input sample: { "idProperty": "referralauthid", "id": 216744, "properties": { "updated_by_integration": "true", "referring_provider_id": 99, "department_id": 102, "expired": false, "last_modified_by": "ndixon43", "last_modified_in_athena": 1755648000000, "referralauthid": 216744, "referral_auth_number": "487749383", "start_date": 1755648000000, "visits_approved": 8, "visits_left": 8, "referral_auth_type": "REFERRAL", "specialty": "Vascular Surgery", "placeholderid": 99, "patient_id": "1229350", "insuranceid": "493848832" } }

8/20/2025, 3:22:32 PM
🔍 DEBUG - HubSpot batch upsert request:

8/20/2025, 3:22:32 PM
📝 URL: https://api.hubapi.com/crm/v3/objects/2-47742702/batch/upsert

8/20/2025, 3:22:32 PM
📝 Input count: 1

8/20/2025, 3:22:32 PM
📝 First input sample: {
  "idProperty": "insuranceid",
  "id": "852059",
  "properties": {
    "updated_by_integration": true,
    "insurancepackagezip": "75266-0044",
    "insurancephone": "(800) 451-0287",
    "insuranceid": "852059",
    "insurancepackageid": 455673,
    "state": "TX",
    "insuranceplanname": "BCBS-TX",
    "insurancepackageaddress1": "PO BOX 660044",
    "insurancepackagecity": "DALLAS",
    "insurance_product_type_name": "POS",
    "insurancepolicyholdersex": "F",
    "insurancepolicyholderfirstname": "TEST ZEKE ATHENA TO HUBSPPOT",
    "insurancepolicyholderlastname": "SWANSON ATHENA TO HUBSPOT 43",
    "insurancepolicyholderdob": "09/01/1960",
    "insurancepolicyholderzip": "79121",
    "insurancepolicyholdercity": "AMARILLO",
    "insurancepolicyholderstate": "TX",
    "insurancepolicyholderaddress1": "7809 COVINGTON PWKY",
    "insurancepolicyholdercountrycode": "USA",
    "insurancepolicyholdercountryiso3166": "US",
    "eligibilityreason": "Athena",
    "eligibilitystatus": "Eligible",
    "eligibilitylastchecked": "08/20/2025",
    "patientid": "1229350"
  }
}

8/20/2025, 3:22:33 PM
CASES SYNC DONE

8/20/2025, 3:22:33 PM
🔗 Triggering patients HubSpot to Athena sync workflow...

8/20/2025, 3:22:33 PM
ATTEMPTING POST

8/20/2025, 3:22:33 PM
✅ patients HubSpot to Athena sync workflow triggered

8/20/2025, 3:22:33 PM
Sending to next workflow HS -> Athena