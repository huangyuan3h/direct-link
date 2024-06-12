import * as cheerio from 'cheerio';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { PostType } from '@/app/pages/posts/types';

dotenv.config({ path: './.env.prod' });

const cookie =
  'acw_tc=6314685a1e1cc30c6865dec44d1c5d3ec55e930a83e5b54eaeafd766fc1149b9; abRequestId=07d1d153-5081-5ed5-afcf-5fbe3910662d; webBuild=4.20.1; a1=1900b1dfa7akdi7wow0tt38ykfwtxdct2nrf2c67030000208366; webId=3dd763c98068819c78635e06fead3bb4; websectiga=16f444b9ff5e3d7e258b5f7674489196303a0b160e16647c6c2b4dcb609f4134; sec_poison_id=366fa5f5-1b5a-43c2-815b-206882452a31; web_session=030037a15a6a8d093527b57811214a0951ff89; gid=yj88DyfiiJJiyj88Dyfi0ISKW0Tf3WElE899FW8qYvTiEiq89CfS9J888J8YqKK8dSdYi044; xsecappid=login';

const auth =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiJodHRwczovL3Byb2Qtbm9ydGgtcGF0aC1hcGktc3RhY2stYXZhdGFyYnVja2V0ZDgwZGJkYjUtNXBzdXhidWJqbmdjLnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tLzVlOTcyYTFjLThlMzQtNGQyNS1iZDI0LTQ1MWE1YzZjNjNhYy0xNzE2NTMzODUyIiwiZW1haWwiOiJodWFuZ3l1YW4zaEBnbWFpbC5jb20iLCJleHAiOjE3MjA2ODI5OTgsImlzcyI6Imh0dHA6Ly9ub3J0aC1wYXRoLnNpdGUiLCJ1c2VyTmFtZSI6Ium7hOe8mO-8iFl1YW4gSHVhbmfvvIkifQ.ASnezNyenOmYvlfzytpg9TzYPCgj4q7rmzOPc7UgDmo';

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
      cookie,
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

type GeminiResponseType = {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
};

type GeneratedPostType = Pick<
  PostType,
  'subject' | 'content' | 'category' | 'topics'
> | null;

const getPrompt = (text: string) => `
你是一个文章生成的程序，我们在为一个北美华人社区写文章，并且用JSON上传到系统里。
文章的内容一般都和“华人”，“移民”，“新移民生活”，“留学”，“加拿大移民政策”有关。

文章的大致要求如下：
############################
目标受众： 北美华人社区
文章主题： 华人、移民、新移民生活、留学
写作风格： 理性、清晰、客观
文章结构：
标题： 主标题 + 副标题 (例：华人移民的困境与希望：数据揭示的现状与趋势）
  开头：用数据概括全文主题，提高 SEO（100 字以内）（记住目标是提高seo！同时不要让这段文字在文章中感觉突兀！）
  段落 1
  段落 2
  段落 3
  段落 4
  ...
  结尾：总结全文，呼吁行动

文章内容优化建议：
数据驱动： 在文章中使用翔实的数据和案例，增强文章的可信度和说服力。
多角度分析： 从不同角度分析问题，避免片面性。
客观中立： 保持客观中立的立场，不偏不倚地呈现事实。
实用建议： 提供切实可行的建议，帮助读者解决问题。
其他建议：
  文章的字数应控制在 1000 字左右。
  文章的语言应简洁明了，避免使用过于复杂的句式和词汇。
  文章的排版应清晰美观，易于阅读。
  结尾生成5个中文的hashtag
  
############################

我会首先给出一篇文章, 根据文章的内容返回一个JSON。

文章的内容是: ${text}

以下是JSON 的定义
type PostType = {
  subject: string; // 文章的标题
  content: string; // 文章的内容, html 格式，标题可以用h4,h5, 内容可以包裹在p 和li 里面
  category: "immigration"|"studyAbroad"|"house"|"car"|"jobs"|"general"; // 在固定的类型中选一个
  topics: string[]; // 文章末尾的hashtag 不超过5个
};

记住作为系统的一部分，你的输出会被直接执行JSON.parse, 所以不需要任何解释内容。
`;

const generatePayload = async (text: string): Promise<GeneratedPostType> => {
  const prompts = {
    contents: [{ parts: [{ text: getPrompt(text) }] }],
    generationConfig: {
      response_mime_type: 'application/json',
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify(prompts),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result: GeminiResponseType = await response.json();

  const firstResult = result.candidates[0];

  const actualResult = firstResult.content.parts[0].text;

  try {
    return JSON.parse(actualResult);
  } catch (e) {
    throw new Error('JSON parse ERROR');
  }
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

  // upload images
  let imageUrls: string[] = await uploadImagesToS3(images);

  const payload = await generatePayload(text);

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
