export async function getAgreement({ agreementId, accessToken } = {}) {
  const accountId = process.env.DS_ACCOUNT_ID;
  const baseUrl = process.env.BASE_URL;

  const res = await fetch(`${baseUrl}/v1/accounts/${accountId}/agreements/${agreementId}`, {
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
    throw new Error(`Get Agreement API failed: ${res.status} ${error}`);
  }

  return await res.json();
}
