import * as cheerio from 'cheerio';

export const extractTextFromHTML = (html: string): string => {
  const $ = cheerio.load(html);

  return $('.note-content')
    .map((_, el) => $(el).text().trim())
    .get()
    .join('\n');
};

export const extractImagesFromHTML = (html: string): string[] => {
  const $ = cheerio.load(html);

  return $('meta[name="og:image"]')
    .map((_, el) => $(el).attr('content'))
    .get();
};
