import * as cheerio from 'cheerio';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { PostType } from '@/app/pages/posts/types';
import {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
  SafetySetting,
  GenerateContentResponse,
} from '@google/generative-ai';

dotenv.config({ path: './.env.prod' });

const getGoogleGeminiClient = () => {
  if (!process.env.GEMINI_KEY) return undefined;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

  const safetySettings: SafetySetting[] = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
    generationConfig: {
      temperature: 1,
      responseMimeType: 'application/json',
    },
    safetySettings,
  });
  return model;
};

export function fileToGenerativePart(content: string, mimeType: string) {
  return {
    inlineData: {
      data: content,
      mimeType,
    },
  };
}

const cookie = `acw_tc=42ed4ad25ab3ce6d5d42b9eb27ec2737670e1b262cca8465c8756cbaa4c7f236; abRequestId=31d4f2c8-2b35-5add-8f08-c4a823895c03; webBuild=4.23.1; a1=19062b48ee34eu0kzeqo6vmp0pq81yc0x6mqx6cfl30000188860; webId=96c9aa6f6a34f8cdcc38f5b7788a1c68; websectiga=6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99; sec_poison_id=feb1a417-8b77-4365-8d40-f3f13c0a489b; web_session=030037a14cff530bc75f6bed07214aacabfe4e; gid=yj8KJD4jY4CWyj8KJD4YdKKSdq4d78TudAlK6i1h6U8UAAq8YyvS8C888yYYYK880dqqJ22j; xsecappid=xhs-pc-web`;

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

const uploadImagesToS3 = async (
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
  文章的字数应不少于 1200 字。
  文章的语言应简洁明了，避免使用过于复杂的句式和词汇。
  文章的排版应清晰美观，易于阅读。
  结尾生成5个中文的hashtag
  段落与段落之间额外多一个换行（html 的<br/> 或一个空的<p></p>）
  文章中不要使用markdown的标记（如**，##），因为文章会直接放在网页里，并不支持markdown
  文章内容不要出现引导联系我，我是移民顾问的内容
  文章中不要出现的类似联系我的信息
  不要出现类似“如果您对美国移民有任何疑问，欢迎咨询专业的移民顾问，获得个性化的移民方案规划。”这样的话术，来引导读者主动联系
  在文章中去除作者名称，比如“七七老师”等
  
############################

我会首先给出一篇文章或者一些图片, 你需要首先按照文章或图片，更具上述要求进行改写,在改写的过程中尝试让文章内容更加丰富和连贯，更有人性，然后返回一个JSON。

文章的内容是: ${text}

以下是JSON 的定义
type PostType = {
  subject: string; // 文章的标题, 少于20个字！
  content: string; // 文章的内容, html 格式，标题可以用h4,h5, 内容可以包裹在p 和li 里面
  category: "immigration"|"studyAbroad"|"house"|"car"|"jobs"|"news"|"travel"｜"general"; // 在固定的类型中选一个
  topics: string[]; // 文章末尾的hashtag 不超过5个
};

记住，文章一定要改写的更加吸引人，并且优化seo，绝对不要完全使用原始文章。
记住作为系统的一部分，你的输出会被直接执行JSON.parse, 所以不需要任何解释内容。
`;

const generatePayload = async (
  text: string,
  imageContents: string[]
): Promise<GeneratedPostType> => {
  const model = getGoogleGeminiClient();

  if (!model) {
    throw new Error('Google Gemini client not found');
  }

  const imageParts = await Promise.all(
    imageContents.map((content) => fileToGenerativePart(content, 'image/webp'))
  );

  const content = await model.generateContent([getPrompt(text), ...imageParts]);

  const result: GenerateContentResponse = await content.response;

  if (!result.candidates) {
    throw new Error('candidates not exist, generate error');
  }

  const firstResult = result.candidates[0];

  const actualResult = firstResult.content.parts[0].text;

  if (!actualResult) {
    throw new Error('actualResult not exist, generate error');
  }

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
