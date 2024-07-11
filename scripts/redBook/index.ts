import dotenv from 'dotenv';
import { getHTMLText } from './fetchRedBook';
import { extractImagesFromHTML, extractTextFromHTML } from './queryContent';
import { uploadImagesToS3 } from './uploadImage2s3';
import { generatePayload } from './googleGemini';

dotenv.config({ path: './.env.prod' });

const auth =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiJodHRwczovL3Byb2Qtbm9ydGgtcGF0aC1hcGktc3RhY2stYXZhdGFyYnVja2V0ZDgwZGJkYjUtNXBzdXhidWJqbmdjLnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tLzVlOTcyYTFjLThlMzQtNGQyNS1iZDI0LTQ1MWE1YzZjNjNhYy0xNzE2NTMzODUyIiwiZW1haWwiOiJodWFuZ3l1YW4zaEBnbWFpbC5jb20iLCJleHAiOjE3MjMzMjY0NTQsImlzcyI6Imh0dHA6Ly9ub3J0aC1wYXRoLnNpdGUiLCJ1c2VyTmFtZSI6Ium7hOe8mO-8iFl1YW4gSHVhbmfvvIkifQ.n_cdCXVtIHNNvAZjlUXqPPIHk9TM4HCUzzz1qP9xuPk';

interface InputParams {
  url: string;
}

const fetchImage = async (url: string): Promise<Blob | null> => {
  try {
    const imageResponse = await fetch(url);
    const imageBlob = await imageResponse.blob();
    return imageBlob;
  } catch (error) {
    console.error(`fetch image ${url}:`, error);
  }

  return null;
};

const getImageContentFromBlob = async (blob: Blob): Promise<string> => {
  const buffer = Buffer.from(await blob.arrayBuffer());
  return buffer.toString('base64');
};

const handleData = async ({ url }: InputParams) => {
  const html = await getHTMLText(url);
  const text = extractTextFromHTML(html);
  const images = extractImagesFromHTML(html);

  if (!text || text.length === 0 || !images || images.length === 0) {
    console.log('cookie 过期....');
    return;
  }

  console.log(text, images);

  const imageBlobs = await Promise.all(images.map(fetchImage));

  const imageBlobsWithData: Blob[] = imageBlobs.filter(
    (b) => !!b && b.size !== 0
  ) as Blob[];

  let imageContents = await Promise.all(
    imageBlobsWithData.map(getImageContentFromBlob)
  );

  const payload = await generatePayload(text, imageContents);

  // upload images
  let imageUrls = await uploadImagesToS3(imageBlobsWithData);

  imageUrls = imageUrls.filter((u) => !!u);

  // send to the server

  const overallPayload = {
    ...payload,
    images: imageUrls,
    location: 'N/A',
  };
  console.log(overallPayload);

  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'post/create',
    {
      method: 'POST',
      body: JSON.stringify(overallPayload),
      credentials: 'include',
      headers: {
        Cookie: `Authorization=${auth}`,
      },
    }
  );

  const result = await response.json();

  console.log(result);
};

const args = process.argv.slice(2);
const url = args[0];

handleData({ url });
