// Deletes a single agreement by its ID.
import { makeClient } from './client.js';

export async function deleteAgreement({ agreementId, force = false, accessToken } = {}) {
  const client = makeClient(accessToken);
  const accountId = process.env.DS_ACCOUNT_ID;
  if (!accountId) throw new Error('ACCOUNT_ID missing');

  await client.navigator.agreements.deleteAgreement({ accountId, agreementId });
  return { ok: true, deletedId: agreementId };
}
