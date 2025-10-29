# docusign-discover-workshop-2

By the end of this lab you will have:

* [Run the project with mock data (instant feedback).](#run-the-project-with-mock-data)

* [Used the Docusign AI assistant to create an IK and generate an access token.](#create-an-integration-key-and-obtain-an-access-token-using-the-vscode-docusign-ai-assistant)

* [Bulk uploaded agreement documents to Navigator using an API call.](#bulk-upload-agreements-using-the-navigator-api)

* [Used the IAM SDK to get navigator agreements.](#get-agreements-using-the-navigator-sdk)

* [Used the IAM SDK to delete an agreement.](#implement-delete-agreement-your-task)

* [(Optional) Learned how to implement OAuth with the IAM SDK.](#add-oauth-optional-advanced)

* [Created and tested Connect webhooks for Navigator events.](#create-and-test-connect-webhooks)

* [Made requests to the Docusign MCP server.](#connect-to-the-docusign-mcp-server)


# Run the project with mock data

1. Clone the [project repo](https://github.com/docusign/docusign-discover-workshop-2) into VS Code.

```shell
git clone https://github.com/docusign/docusign-discover-workshop-2.git
```

2. Install dependencies:

```shell
npm install
```

3. Start the server in development mode:  
   

```shell
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

* You should see a list of **agreements**.  
* These are coming from a **Postman mock server**, not your real Docusign account.

# Create an integration key and obtain an access token using the VSCode Docusign AI Assistant

[Follow instructions here](/oauthWithAIAssistant.md)

# Bulk upload agreements using the Navigator API

* Open your .env file and update the variable BASE\_PATH to the value [api-d.docusign.com](http://api-d.docusign.com).

## Create bulk upload job

1. The `try` statement includes an empty `body` constant. Add the following as the value of `body`:

```json
{
  "job_name": "test_name",
  "expected_number_of_docs": 2,
  "language": "en_us"
}
```

2. The `res` constant uses a `fetch` statement. Add the URL for the [create job endpoint](./bulkUploadWithAPI.md#bulk-upload-steps) as the first argument.

3. The `completeRes` constant uses a `fetch` statement. Add the URL for the [complete job endpoint](./bulkUploadWithAPI.md#bulk-upload-steps) as the first argument.

4. The `bulkUploadStatus` function makes a request to check the status of `jobId`. Complete the `statusCheck` constant with a fetch statement to the [check status endpoint](./bulkUploadWithAPI.md#check-bulk-upload-status) that includes `Authorization`, `Accept`, and `Content-Type` headers.

5. Restart your server and refresh the browser — you should now see **real agreements from your Docusign account**.

6. Click the **Bulk Upload** button. You should see a modal confirming successful upload of 2 agreements.

7. Click the **Check Status** button. You should see a modal providing the status of the agreement upload and processing. Status should report complete after about 60 seconds.

# Get agreements using the Navigator SDK

* Open your .env file and update the variable BASE\_PATH to the value [api-d.docusign.com](http://api-d.docusign.com)  

The code currently fetches agreements using a REST API call.
[`getAgreements.js`](./src/getAgreements.js)

Replace this with the equivalent SDK call to Navigator:

```javascript
client.navigator.agreements.getAgreementsList({ accountId });
```

[API reference](https://developers.docusign.com/docs/navigator-api/reference/navigator/agreements/getagreement/)

Restart your server and refresh the browser — you should now see **real agreements from your Docusign account**.

## Implement agreement filtering (optional/advanced)

You can filter agreements by properties such as status, expiration date, party name, etc. The full list of available query parameters is documented on
 the [API reference page.](https://developers.docusign.com/docs/navigator-api/reference/navigator/agreements/getagreementslist/)

Try extending your SDK method calls with additional query parameters. Experiment with different combinations to see how you can sort and filter agreements in ways that match the requirements of various use cases.

# Implement “Delete Agreement” (your task)

* In the project there’s a stubbed-out function for **Delete Agreement** using the SDK.
[`deleteAgreement.js`](./src/deleteAgreement.js)

Your job is to complete that function:

```javascript
client.navigator.agreements.deleteAgreement({ accountId, agreementId });
```

[API reference](https://developers.docusign.com/docs/navigator-api/reference/navigator/agreements/deleteagreement/)

* Test it by deleting one of your agreements.

# Add OAuth (Optional, advanced)
[Auth examples](https://github.com/docusign/docusign-iam-typescript-client/tree/main/auth-examples)

* Right now you pasted in an access token manually.

* For a production app, you should implement an OAuth flow to fetch/refresh tokens automatically.

* Choose either:

  * **Authorization Code Grant** (browser \+ server flow)

  * **JWT Grant** (server-to-server)

* The project has an [`auth.js`](./src/auth.js) file stubbed out for you to implement.

# Create and Test Connect Webhooks

1. Visit [https://apps-d.docusign.com/admin/connect/](https://apps-d.docusign.com/admin/connect/).

1. Click **Add Configuration** > **Custom**.

1. In the Name box, type **Navigator API test** or another configuration name of your choosing.

1. In a new tab, open [https://webhook.site](https://webhook.site), then click the generated URL to copy it.

1. Return to your Custom Connect configuration, then in the **URL to Publish** box paste the URL you copied.

1. In the Trigger Events section, open the Navigator list and check all 5 events.

1. Click **Add Configuration**.

1. In a new tab, open [https://apps-d.docusign.com/send/documents](https://apps-d.docusign.com/send/documents), then in the sidebar, click **Completed**.

1. Click an agreement with the icon for AI suggestions (purple star), click **Review All**, approve one of the AI-suggested values, then click **Save**.

1. On the webhook.site tab, review the **agreement-extractions-reviewed** message.

1. In your open agreement, click **Review All**, approve all remaining AI-suggested values, then click **Save**.

1. On the webhook.site tab, review the **agreement-reviews-complete** message.

1. In your open agreement, click the edit icon (pencil), change a data value, then click **Save**.

1. On the webhook.site tab, review the **agreement-updated** message.

1. Return to your open agreement close it, in the agreements list click the vertical ellipsis (**&vellip;**) for the agreement, click **Remove**, then click **Remove Agreement.**

1. On the webhook.site tab, review the **agreement-deleted** message.

# Connect to the Docusign MCP server

Check out the `discover-mcp-workshop` branch of this repo. You'll need to work in this branch to ensure clean context for the agent you're building.

See [Docusign MCP Workshop: AI-Powered Agreement Analysis](https://github.com/docusign/docusign-discover-workshop-2/blob/discover-mcp-workshop/README.md) for your instructions.



