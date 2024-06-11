import * as cheerio from 'cheerio';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import 'dotenv/config';

interface InputParams {
  url: string;
}

const extractTextFromHTML = (html: string): string => {
  const $ = cheerio.load(html);

  return $('.note-content')
    .map((_, el) => $(el).text().trim())
    .get()
    .join('\n');
};

const extractImagesFromHTML = (html: string): string[] => {
  const $ = cheerio.load(html);

  return $('meta[name="og:image"]')
    .map((_, el) => $(el).attr('content'))
    .get();
};

const generateSignedURL = async (): Promise<string> => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: randomUUID(),
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
  });
  return getSignedUrl(new S3Client({}), command);
};

const getHTMLText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-GB,en;q=0.9',
      priority: 'u=0, i',
      'sec-ch-ua':
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      cookie:
        'acw_tc=797fbedc1b19bc362bb0214549399dcd5689712b902e9c395803b8c5517f9c04; abRequestId=c82702f0-7f06-5ede-9071-367573db1d6a; webBuild=4.20.1; a1=190067798c36jqw1zun68jdf9gk9gpmct2h1sj87830000118271; webId=d6ab46b961b79bf20a028930504c8f99; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=63794146-cacd-4a8a-83b5-cb6042f3ecb8; web_session=030037a15b5a481cbc87704810214a3bed140f; gid=yj88KWWjfS9Wyj88KWWjYJVYSqKVAEyu7IKYxWYVfijkTyq8jkU6SM888yyYJWy82224KfKf; xsecappid=login',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: null,
    method: 'GET',
  });

  return await response.text();
};

const uploadImagesToS3 = async (images: string[]): Promise<string[]> => {
  let imageUrls: string[] = [];

  if (images && images.length > 0) {
    imageUrls = await Promise.all(
      images.map(async (imageUrl: string) => {
        try {
          const imageResponse = await fetch(imageUrl);
          const imageBlob = await imageResponse.blob();

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

  return imageUrls;
};

const handleData = async ({ url }: InputParams) => {
  console.log(url);
  const html = await getHTMLText(url);
  const text = extractTextFromHTML(html);
  const images = extractImagesFromHTML(html);

  console.log(text, images);

  // upload images
  // let imageUrls: string[] = await uploadImagesToS3(images);

  // console.log(imageUrls);

  // use google to fetch
};

const args = process.argv.slice(2);
const url = args[0];

handleData({ url })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
