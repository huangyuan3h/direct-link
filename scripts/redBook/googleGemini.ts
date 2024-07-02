import {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
  SafetySetting,
  GenerateContentResponse,
} from '@google/generative-ai';
import { PostType } from '@/app/pages/posts/types';
import { getPrompt } from './prompt';

export const getGoogleGeminiClient = () => {
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

type GeneratedPostType = Pick<
  PostType,
  'subject' | 'content' | 'category' | 'topics'
> | null;

export const generatePayload = async (
  text: string,
  imageContents: string[]
): Promise<GeneratedPostType> => {
  const model = getGoogleGeminiClient();

  if (!model) {
    throw new Error('Google Gemini client not found');
  }

  let imageParts = await Promise.all(
    imageContents.map((content) => fileToGenerativePart(content, 'image/webp'))
  );

  imageParts = imageParts.slice(0, 3);

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
    console.error(JSON.stringify(result, null, 2));
    throw new Error('JSON parse ERROR');
  }
};
