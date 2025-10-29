// Lists agreements using the Docusign IAM Navigator SDK.
import { makeClient } from './client.js';

// Mock data
// Lists agreements using the Docusign IAM Navigator API directly
export async function getAgreements({ accessToken } = {}) {
  const client = makeClient(accessToken);
  const accountId = process.env.DS_ACCOUNT_ID;
  if (!accountId) throw new Error('ACCOUNT_ID missing');

  let data;
  try {
    data = await client.navigator.agreements.getAgreementsList({ accountId });
  } catch (err) {
    if (err?.message?.includes('Response validation failed') && err?.rawValue) {
      console.warn('getAgreements: response validation failed — using rawValue fallback');
      data = err.rawValue;
    } else {
      console.error('getAgreements failed:', err?.message || err);
      if (err?.response) {
        try {
          console.error('HTTP status:', err.response.status || err?.status);
          console.error('Raw response body:', err.response.body ?? err.response.text ?? err.response);
        } catch (e) {
          console.error('Failed to print response body', e);
        }
      }
      if (err?.validationErrors) console.error('Validation errors:', err.validationErrors);
      throw err;
    }
  }

  const list = (data?.items ?? data?.data ?? []);

  const items = list.map(a => ({
    agreementId: a.agreementId ?? a.id ?? a.agreement_id ?? '',
    name: a.title ?? a.name ?? a.file_name ?? '',
    raw: a
  }));
  // console.log(`ITEMS: ${JSON.stringify(items)}`);
  return { items };
}
