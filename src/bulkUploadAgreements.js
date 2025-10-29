// Uploads 2 agreements (in a hard coded folder).
export async function bulkUploadAgreements({ accessToken } = {}) {
 
  console.log(`Bulk uploading agreements`);
  const accountId = process.env.DS_ACCOUNT_ID;
  const baseUrl = process.env.BASE_URL; 
  try {
    // Step 1: Add a value for body:
    const body = {};
    
    // Step 2: Add the create job endpoint URL as the first fetch argument:
    const res = await fetch(``, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      let jobId;
      let i;
      if (data && data.id) {
        jobId = data.id;
      }

      if (
        data._embedded &&
        Array.isArray(data._embedded.documents) &&
        data._embedded.documents.length > 0
      ) {
        const blobUrls = data._embedded.documents
          .filter(doc => doc._actions && doc._actions.upload_document)
          .map(doc => doc._actions.upload_document);

        // Upload PDF files to each blob URL
        const fs = await import('fs');
        const path = await import('path');
        
        const pdfFiles = [
          './demo_agreements/CX/Acme Cloud Services.pdf',
          './demo_agreements/CX/MSA.pdf'
        ];

        for (i = 0; i < Math.min(blobUrls.length, pdfFiles.length); i++) {
          const blobUrl = blobUrls[i];
          const pdfPath = pdfFiles[i];
          
          try {
            const fileBuffer = fs.readFileSync(pdfPath);
            
            const uploadRes = await fetch(blobUrl, {
              method: 'PUT',
              headers: {
                'x-ms-blob-type': 'BlockBlob',
                'x-ms-meta-myownprop': 'mytestprop',
                'Content-Type': 'application/pdf'
              },
              body: fileBuffer
            });

            if (uploadRes.ok) {
              console.log(`Successfully uploaded ${pdfPath} to blob URL ${i + 1}`);
            } else {
              console.error(`Failed to upload ${pdfPath}:`, uploadRes.status, uploadRes.statusText);
            }
          } catch (err) {
            console.error(`Error uploading ${pdfPath}:`, err);
          }
        }
      }

      // Step 3: Add the complete job endpoint URL as the first fetch argument:
      const completeRes = await fetch(``, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    return {jobId: jobId, received: i};

  }

  } catch (err) {
    console.error('getAgreements failed:', err);
    throw err;
  }
  
  return {ok: true}
}

export async function bulkUploadStatus({ jobId, accessToken } = {}) {
  const accountId = process.env.DS_ACCOUNT_ID;
  const baseUrl = process.env.BASE_URL;

  // Step 4: Complete the statusCheck constant with a fetch statement to the check status endpoint:
  const statusCheck = await fetch(); 

    const statusC = await statusCheck.json();

  return {status: statusC.status}
}
