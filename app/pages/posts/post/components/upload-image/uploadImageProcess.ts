import { uploadFileToS3 } from '@/utils/s3Upload';

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
