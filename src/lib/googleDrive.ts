export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
  modifiedTime?: string;
}

/**
 * Lists or searches files in the user's Google Drive.
 */
export async function listDriveFiles(
  accessToken: string,
  searchQuery?: string,
  mimeTypeFilter?: string
): Promise<GoogleDriveFile[]> {
  let q = "trashed = false";
  
  if (mimeTypeFilter) {
    if (mimeTypeFilter === "folder") {
      q += ` and mimeType = 'application/vnd.google-apps.folder'`;
    } else if (mimeTypeFilter === "document") {
      q += ` and (mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/pdf' or mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')`;
    } else if (mimeTypeFilter === "image") {
      q += ` and mimeType startsWith 'image/'`;
    } else if (mimeTypeFilter === "spreadsheet") {
      q += ` and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')`;
    }
  }

  if (searchQuery) {
    // Sanitize and escape single quotes
    const escapedQuery = searchQuery.replace(/'/g, "\\'");
    q += ` and name contains '${escapedQuery}'`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    q
  )}&pageSize=40&fields=files(id,name,mimeType,webViewLink,iconLink,size,modifiedTime)&orderBy=modifiedTime desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error de Google Drive API: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Uploads a text/JSON file directly to Google Drive.
 * Uses a multipart/related upload to set both metadata and content in one request.
 */
export async function uploadFileToDrive(
  accessToken: string,
  filename: string,
  content: string,
  mimeType: string = "application/json"
): Promise<GoogleDriveFile> {
  const boundary = "drive_upload_boundary_987654";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: filename,
    mimeType: mimeType,
  };

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    content +
    closeDelimiter;

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error de carga en Google Drive: ${response.status} - ${errText}`);
  }

  return response.json();
}
