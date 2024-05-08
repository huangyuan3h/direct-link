import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const MAX_IMAGE_SIZE = 9;

const generateSignedURL = async (): Promise<string> => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: randomUUID(),
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
  });
  return getSignedUrl(new S3Client({}), command);
};

const generateMultipleURLS = async (num: number): Promise<string[]> => {
  return Promise.all(
    Array.from({ length: num }, async () => {
      return await generateSignedURL();
    })
  );
};

const getUploadImageSize = (url: string): number => {
  const parts = url.split('/');
  const uploadId = parseInt(parts[parts.length - 1], 10);
  return uploadId;
};

export async function GET(request: Request) {
  const imageSize = getUploadImageSize(request.url);

  const urls = await generateMultipleURLS(Math.min(imageSize, MAX_IMAGE_SIZE));

  return Response.json({ urls });
}
