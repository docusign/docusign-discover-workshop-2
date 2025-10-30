// Lists agreements using the Docusign IAM Navigator SDK.
import { makeClient } from './client.js';

// Mock data
// Lists agreements using the Docusign IAM Navigator API directly
export async function getAgreements({ accessToken } = {}) {
  // if (!accessToken) throw new Error('Access token required');
  const accountId = process.env.DS_ACCOUNT_ID;
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
    
    const items = (data?.items ?? data?.data ?? []);
    console.log(`Agreements fetched: ${JSON.stringify(items, null, 2)}`);

    // Normalize response shape
    return {
      items: items.map(a => ({
        agreementId: a.agreementId ?? a.id ?? '',
        name: a.name ?? a.title ?? '',
        status: a.review_status ?? 'unknown',
        category: a.category ?? 'unknown',
        raw: a
      }))
    };
  } catch (err) {
    console.error('getAgreements failed:', err);
    throw err;
  }
}
