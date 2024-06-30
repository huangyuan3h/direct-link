import dotenv from 'dotenv';
import { getHTMLText } from './fetchRedBook';
import { extractImagesFromHTML, extractTextFromHTML } from './queryContent';
import { uploadImagesToS3 } from './uploadImage2s3';
import { generatePayload } from './googleGemini';

dotenv.config({ path: './.env.prod' });

const auth =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiJodHRwczovL3Byb2Qtbm9ydGgtcGF0aC1hcGktc3RhY2stYXZhdGFyYnVja2V0ZDgwZGJkYjUtNXBzdXhidWJqbmdjLnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tLzVlOTcyYTFjLThlMzQtNGQyNS1iZDI0LTQ1MWE1YzZjNjNhYy0xNzE2NTMzODUyIiwiZW1haWwiOiJodWFuZ3l1YW4zaEBnbWFpbC5jb20iLCJleHAiOjE3MjA2ODI5OTgsImlzcyI6Imh0dHA6Ly9ub3J0aC1wYXRoLnNpdGUiLCJ1c2VyTmFtZSI6Ium7hOe8mO-8iFl1YW4gSHVhbmfvvIkifQ.ASnezNyenOmYvlfzytpg9TzYPCgj4q7rmzOPc7UgDmo';

interface InputParams {
  url: string;
}

const handleData = async ({ url }: InputParams) => {
  const html = await getHTMLText(url);
  const text = extractTextFromHTML(html);
  const images = extractImagesFromHTML(html);

  if (!text || text.length === 0 || !images || images.length === 0) {
    console.log('cookie 过期....');
    return;
  }

  console.log(text, images);

  // upload images
  let { imageUrls, imageContents } = await uploadImagesToS3(images);

  const payload = await generatePayload(text, imageContents);

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
