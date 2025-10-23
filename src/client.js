import { IamClient } from '@docusign/iam-sdk';

// export class IamClientPlaceholder {
//   constructor({ accessToken }) { this.accessToken = accessToken; }
//   navigator = {
//     agreements: {
//       async getAgreementsList({ accountId }) {
//         // Fallback mock data so the UI renders before wiring the real SDK.
//         return {
//           items: [
//             { agreementId: 'A-001', name: 'MSA - Acme', status: 'active', updatedTime: '2025-09-01T12:00:00Z' },
//             { agreementId: 'TEST_002', name: 'TEST_Training', status: 'draft', updatedTime: '2025-09-03T09:22:00Z' }
//           ]
//         };
//       },
//       async deleteAgreement({ accountId, agreementId }) {
//         return; // no-op in mock
//       }
//     }
//   }
// }

export function makeClient(accessToken) {
  if (!accessToken) throw new Error('Access token required')
  
  return new IamClient({
    basePath: process.env.DS_ENV === 'prod' 
      ? 'https://api.docusign.com'
      : 'https://api-d.docusign.com',
    accessToken
  })
}

