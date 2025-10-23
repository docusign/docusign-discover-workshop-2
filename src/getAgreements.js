// Lists agreements using the Docusign IAM Navigator SDK.
import { makeClient } from './client.js';

// Mock data
// Lists agreements using the Docusign IAM Navigator API directly
export async function getAgreements({ accessToken } = {}) {
  // if (!accessToken) throw new Error('Access token required');
  // const accountId = process.env.DS_ACCOUNT_ID;
  // if (!accountId) throw new Error('ACCOUNT_ID missing');

  const baseUrl = process.env.BASE_URL; 

  try {
    const res = await fetch(`${baseUrl}/v1/accounts/${accountId}/agreements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log("RESPONSE STATUS:", res.status);

    if (!res.ok) {
      const text = await res.text();
      let error;
      try {
        const json = JSON.parse(text);
        error = json.message || json.error || text;
      } catch (e) {
        error = text;
      }
      throw new Error(`Agreements API failed: ${res.status} ${error}`);
    }

    const data = await res.json();

    console.log("DATA RECEIVED:", data);
    
    const items = (data?.items ?? data?.data ?? []);

    // Normalize response shape
    return {
      items: items.map(a => ({
        agreementId: a.agreementId ?? a.id ?? '',
        name: a.name ?? a.file_name ?? '',
        status: a.status ?? 'unknown',
        raw: a
      }))
    };
  } catch (err) {
    console.error('getAgreements failed:', err);
    throw err;
  }
}
