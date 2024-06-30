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
  images: string[]
): Promise<{ imageUrls: string[]; imageContents: string[] }> => {
  let imageUrls: string[] = [];
  let imageContents: string[] = [];
  if (images && images.length > 0) {
    imageUrls = await Promise.all(
      images.map(async (imageUrl: string) => {
        try {
          const imageResponse = await fetch(imageUrl);
          const imageBlob = await imageResponse.blob();
          const buffer = Buffer.from(await imageBlob.arrayBuffer());
          const imageContent = buffer.toString('base64');
          imageContents.push(imageContent);
          const uploadUrl = await generateSignedURL();

          const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: imageBlob,
            headers: {
              'Content-Type': 'image/webp',
              'Content-Disposition': `attachment; filename="${randomUUID()}.webp"`,
            },
          });

          return response.url.split('?')[0];
        } catch (error) {
          console.error(`Error uploading image ${imageUrl}:`, error);
        }
        return '';
      })
    );
  }

  return { imageUrls, imageContents };
};
