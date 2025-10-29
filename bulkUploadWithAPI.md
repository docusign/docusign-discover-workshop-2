# Bulk Upload using the Navigator API

## Bulk Upload Steps

Bulk upload consists of 3 steps:

**1. Create the job**

POST to `https://{{host}}/v1/accounts/{{accountId}}/upload/jobs`, passing a JSON body:

```json
{ 
  "job_name":"test_name",
  "expected_number_of_docs":1,
  "language":"en_us"
}
```

A successful response includes one or more unique upload URLs corresponding to the `expected_number_of_docs` value in the request.

**2. Upload documents**

PUT to each unique URL, passing a document in the body as binary data.

A successful response is a 201 with no data.

**3. Complete the upload**

POST to `https://{{host}}/v1/accounts/{{accountId}}/upload/jobs/{{jobId_int}}/actions/complete`.

A successful response provides data about the job, including the status.

## Check Bulk Upload Status

GET `https://{{host}}/v1/accounts/{{accountId}}/upload/jobs/{{jobId_int}}`.

A successful response provides data about the job, including the status.