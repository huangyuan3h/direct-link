import {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
  SafetySetting,
  GenerateContentResponse,
} from '@google/generative-ai';
import { PostType } from '@/app/pages/posts/types';
import { getPrompt } from './prompt';
import {
  fileToGenerativePart,
  getGoogleGeminiClient,
} from '../utils/googleGemini';

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
    imageContents.map((content) => fileToGenerativePart(content, 'image/jpg'))
  );

  imageParts = imageParts.slice(0, 5); // 给5张图片

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
