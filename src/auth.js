import 'dotenv/config';
import { AuthUtils, IamClient } from '@docusign/iam-sdk';

const CLIENT_ID = process.env.DS_CLIENT_ID;
const SECRET_KEY = process.env.DS_SECRET_KEY;
const REDIRECT_URI = process.env.DS_REDIRECT_URI;

if (!CLIENT_ID || !SECRET_KEY) {
  console.warn('Missing DS client id / secret. Set DS_CLIENT_ID and DS_SECRET_KEY.');
}

function buildAuthUrl({ 
  redirectUri = REDIRECT_URI, 
  scopes = [
    "adm_store_unified_repo_read",
    "adm_store_unified_repo_write",
    "document_uploader_write",
    "document_uploader_read",
    "aow_manage",
    "signature"
  ], 
  state = '' 
} = {}) {
  if(process.env.DS_ACCESS_TOKEN) {
    return "/ds/callback";
  }
  
  if (!CLIENT_ID) throw new Error('CLIENT_ID missing');
  return AuthUtils.createAuthorizationUrl({
    type: 'code',
    clientId: CLIENT_ID,
    redirectUri,
    scopes,
    state,
  });
}

/**
 * Exchange authorization code for tokens using the @docusign/iam-sdk
 * returns { accessToken, refreshToken, expiresIn, raw }
 */
async function exchangeCodeForToken(code, { redirectUri = REDIRECT_URI } = {}) {
  if (!code) throw new Error('authorization code is required');
  if (!CLIENT_ID || !SECRET_KEY) throw new Error('CLIENT_ID or SECRET_KEY missing');

  const iam = new IamClient();
  try {
    // TODO: Implement token exchange via sdk

    return {};
  } catch (err) {
    const msg = err?.errorDescription ?? err?.error_description ?? err?.message ?? String(err);
    const e = new Error(`Token exchange failed: ${msg}`);
    e.cause = err;
    throw e;
  }
}

/**
 * Optional: get userinfo via the IAM client
 */
async function getUserInfo(accessToken) {
  if (!accessToken) throw new Error('accessToken is required');
  const iam = new IamClient();
  try {
    const info = await iam.auth.getUserInfo({ accessToken });
    return info;
  } catch (err) {
    const msg = err?.message ?? String(err);
    const e = new Error(`getUserInfo failed: ${msg}`);
    e.cause = err;
    throw e;
  }
}

export {
  buildAuthUrl,
  exchangeCodeForToken,
  getUserInfo,
};