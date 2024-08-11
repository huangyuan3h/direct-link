import dotenv from 'dotenv';
import { getHTMLText } from './fetchRedBook';
import { extractImagesFromHTML, extractTextFromHTML } from './queryContent';
import { uploadImagesToS3 } from '../utils/uploadImage2s3';
import { generatePayload } from './googleGemini';
import { fetchImage, getImageContentFromBlob } from '../utils/fetchImage';
import { auth } from '../utils/auth';

dotenv.config({ path: './.env.prod' });

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
const xscode = args[1];

handleData({ url });
