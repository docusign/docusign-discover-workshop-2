// Uploads 2 agreements (in a hard coded folder).
export async function bulkUploadAgreements({ accessToken } = {}) {
 
  console.log(`Bulk uploading agreements`);
  const accountId = process.env.DS_ACCOUNT_ID;
  const baseUrl = process.env.BASE_URL; 
  try {
    // Upload files to each blob URL
    const fs = await import('fs');
    const path = await import('path');
    
    // Automatically read files from demo_agreements folder
    const demoAgreementsDir = './demo_agreements';
    
    // Function to recursively find all files
    const findFiles = (dir) => {
      const files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Recursively search subdirectories
          files.push(...findFiles(fullPath));
        } else if (path.extname(item).toLowerCase() === '.docx') {
          files.push(fullPath);
        }
      }
      
      return files;
    };

    const files = findFiles(demoAgreementsDir);

    if (files.length === 0) {
      console.warn('No files found in demo_agreements folder');
      return { jobId: jobId, received: 0 };
    }
    
    console.log(`Found ${files.length} files:`, files);
    
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

        for (i = 0; i < Math.min(blobUrls.length, files.length); i++) {
          const blobUrl = blobUrls[i];
          const filePath = files[i];
          
          try {
            const fileBuffer = fs.readFileSync(filePath);
            
            const uploadRes = await fetch(blobUrl, {
              method: 'PUT',
              headers: {
                'x-ms-blob-type': 'BlockBlob',
                'x-ms-meta-filename': path.basename(filePath),
                'x-ms-meta-myownprop': 'mytestprop',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              },
              body: fileBuffer
            });

            if (uploadRes.ok) {
              console.log(`Successfully uploaded ${path.basename(filePath)} to blob URL ${i + 1}`);
            } else {
              console.error(`Failed to upload ${path.basename(filePath)}:`, uploadRes.status, uploadRes.statusText);
            }
          } catch (err) {
            console.error(`Error uploading ${path.basename(filePath)}:`, err);
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
        },
        body: JSON.stringify(body)
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