export async function uploadFileToS3(url: string, file: File) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    });

    return response.url.split('?')[0];
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

type ImageResponse = {
  urls: string[];
};

export async function uploadFiles(files: File[]) {
  const response = await (
    await fetch(`/api/getUploadUrl/${files.length}`)
  ).json();

  const { urls } = response as unknown as ImageResponse;
  try {
    const uploadPromises = files.map(
      async (file, idx) => await uploadFileToS3(urls[idx], file)
    );

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading files:', error);
  }
}
