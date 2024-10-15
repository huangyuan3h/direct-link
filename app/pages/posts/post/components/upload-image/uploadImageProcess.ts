import { uploadFileToS3 } from '@/utils/s3Upload';

type ImageResponse = {
  urls: string[];
};

export async function uploadFiles(files: (File | string)[]): Promise<string[]> {
  // 过滤掉非 File 类型的元素
  const filesToUpload = files
    .map((file, idx) => ({ file, idx }))
    .filter((item) => item.file instanceof File);

  const response = await (
    await fetch(`/api/getUploadUrl/${filesToUpload.length}`)
  ).json();

  const { urls } = response as unknown as ImageResponse;

  try {
    const uploadPromises = filesToUpload.map(async ({ file, idx }, i) => {
      await uploadFileToS3(urls[i], file as File);
      return { url: urls[i], idx };
    });

    const uploadedResults = await Promise.all(uploadPromises);

    // 构造返回的数组，保持与原始输入相同顺序
    const result: string[] = files.map((file, idx) => {
      const uploaded = uploadedResults.find((res) => res.idx === idx);
      return uploaded ? uploaded.url : (file as string);
    });

    return result;
  } catch (error) {
    console.error('Error uploading files:', error);
    return [];
  }
}
