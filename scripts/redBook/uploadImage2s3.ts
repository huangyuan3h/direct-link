import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

export const generateSignedURL = async (): Promise<string> => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: randomUUID(),
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
  });
  return getSignedUrl(new S3Client({}), command);
};

export const uploadImagesToS3 = async (
  imageBlobs: Blob[]
): Promise<string[]> => {
  let imageUrls: string[] = [];
  let imageContents: string[] = [];
  if (imageBlobs && imageBlobs.length > 0) {
    imageUrls = await Promise.all(
      imageBlobs.map(async (blob: Blob, idx: number) => {
        try {
          const uploadUrl = await generateSignedURL();
          const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: blob,
            headers: {
              'Content-Type': 'image/webp',
              'Content-Disposition': `attachment; filename="${randomUUID()}.webp"`,
            },
          });

          return response.url.split('?')[0];
        } catch (error) {
          console.error(`Error uploading image ${idx}:`, error);
        }
        return '';
      })
    );
  }

  return imageUrls;
};
