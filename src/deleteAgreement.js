// Deletes a single agreement by its ID.
import { makeClient } from './client.js';

export async function deleteAgreement({ agreementId, force = false, accessToken } = {}) {
  // TODO: Add sdk call to delete an agreement.
  return { ok: true, deletedId: agreementId };
}
