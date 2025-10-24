# docusign-discover-workshop-2

By the end of this lab you will have:

* [Run the project with mock data (instant feedback).](#run-the-project-with-mock-data)

* [Configured your own DocuSign developer app.]()

* [Called the Navigator API via SDK.](#get-agreements-using-the-navigator-sdk)

* [Extended the project by implementing a delete operation.](#implement-delete-agreement-your-task)

* [(Optional) Learned how to implement OAuth.](#add-oauth-optional-advanced)

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

