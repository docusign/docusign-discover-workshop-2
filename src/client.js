import { IamClient } from '@docusign/iam-sdk';

export function makeClient(accessToken) {
  if (!accessToken) throw new Error('Access token required')
  
  return new IamClient({
    basePath: process.env.DS_ENV === 'prod' 
      ? 'https://api.docusign.com'
      : 'https://api-d.docusign.com',
    accessToken
  })
}

