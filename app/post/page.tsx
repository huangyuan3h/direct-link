import { Header } from '@/components/header';
import { Post } from '../pages/posts/post';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const MAX_NUMBER = 9;

const generateSignedURL = async (): Promise<string> => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: randomUUID(),
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
  });
  return getSignedUrl(new S3Client({}), command);
};

const generateMultipleURLS = async (): Promise<string[]> => {
  return Promise.all(
    Array.from({ length: MAX_NUMBER }, async () => {
      return await generateSignedURL();
    })
  );
};

export default async function Home() {
  const urls = await generateMultipleURLS();

  return (
    <main className="">
      <Header />
      <Post signedURLs={urls} />
    </main>
  );
}
