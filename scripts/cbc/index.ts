import { auth } from '../utils/auth';
import { fetchImage, getImageContentFromBlob } from '../utils/fetchImage';
import { uploadImagesToS3 } from '../utils/uploadImage2s3';
import { getHTMLText } from './fetchCBC';
import { generatePayload } from './googleGemini';
import { extraImageUrls, extraText, extractUrlFromLocal } from './queryContent';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.prod' });

const cbcDomain = 'https://www.cbc.ca';

const cbc_list = [
  'https://www.cbc.ca/news/canada/toronto',
  'https://www.cbc.ca/news/canada/british-columbia',
  'https://www.cbc.ca/news/canada/calgary',
  'https://www.cbc.ca/news/canada/edmonton',
];

const sync_single = async (url: string) => {
  const html = await getHTMLText(url);
  const text = extraText(html);
  const images = extraImageUrls(html);

  const imageBlobs = await Promise.all(images.map(fetchImage));

  const imageBlobsWithData: Blob[] = imageBlobs.filter(
    (b) => !!b && b.size !== 0
  ) as Blob[];

  let imageContents = await Promise.all(
    imageBlobsWithData.map(getImageContentFromBlob)
  );

  const payload = await generatePayload(text, imageContents);

  // upload images
  let imageUrls = await uploadImagesToS3(imageBlobsWithData, 'jpg');

  imageUrls = imageUrls.filter((u) => !!u);

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

const sync_cbc = async () => {
  for (let i = 0; i < cbc_list.length; i++) {
    const url = cbc_list[i];

    const html = await getHTMLText(url);

    const urls = extractUrlFromLocal(html);

    const filtered = urls.filter((url) => url.today);

    const url2Crawl = filtered.map((i) => cbcDomain + i.url);

    for (let j = 0; j < url2Crawl.length; j++) {
      if (url2Crawl[j]) {
        await sync_single(url2Crawl[j]);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  }
};

sync_cbc();
