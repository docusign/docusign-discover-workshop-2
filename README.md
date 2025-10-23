# docusign-discover-workshop-2

By the end of this lab you will have:

* [Run the project with mock data (instant feedback).](#run-the-project-with-mock-data)

* [Configured your own DocuSign developer app.]()

* Called the Navigator API via SDK.

* Extended the project by implementing a delete operation.

* (Optional) Learned how to implement OAuth.

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

Follow instructions here

# Get agreements using the Navigator API

1. Open your .env file and update the variable BASE\_PATH to the value [api-d.docusign.com](http://api-d.docusign.com)  
2. Restart your server and refresh the browser — you should now see **real agreements from your Docusign account**.

# Get agreements using the Navigator SDK

The code currently fetches agreements using a REST call (the same one the mock server used).

Replace this with the equivalent SDK call to Navigator:

```javascript
client.navigator.agreements.getAgreementsList({ accountId });
```

Restart your server and refresh the browser — you should now see **real agreements from your Docusign account**.

# Implement “Delete Agreement” (your task)

* In the project there’s a stubbed-out function for **Delete Agreement** using the SDK.

Your job is to complete that function:

```javascript
client.navigator.agreements.deleteAgreement({ accountId, agreementId });
```

* Test it by deleting one of your agreements.

# Add OAuth (Optional, advanced)

* Right now you pasted in an access token manually.

* For a production app, you should implement an OAuth flow to fetch/refresh tokens automatically.

* Choose either:

  * **Authorization Code Grant** (browser \+ server flow)

  * **JWT Grant** (server-to-server)

* The project has an `auth.js` file stubbed out for you to implement.

