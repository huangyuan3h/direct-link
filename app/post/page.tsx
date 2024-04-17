import { Header } from '@/components/header';
import { Post } from '../pages/posts/post';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

async function getData() {
  let url = '';
  try {
    const command = new PutObjectCommand({
      ACL: 'public-read',
      Key: randomUUID(),
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    });

    const client = new S3Client({});
    url = await getSignedUrl(client, command);

    return { url };
  } catch (error) {
    console.error('Error:', error);
    return { url: '' };
  }
}

export default async function Home() {
  const data = await getData();
  console.log(data); // todo: get the url of s3 to upload
  return (
    <main className="">
      <Header />
      <Post />
    </main>
  );
}
