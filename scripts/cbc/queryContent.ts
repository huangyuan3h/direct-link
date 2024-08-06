import * as cheerio from 'cheerio';

export const extractUrlFromLocal = (html: string) => {
  const $ = cheerio.load(html);

  let list = $('.contentListCards a.card')
    .map((_, el) => {
      const text = $(el).text();

      return { url: $(el).attr('href'), today: text.includes('hours ago') };
    })
    .toArray();

  const ele = $('.contentWrapper').get();

  if (ele.length > 0) {
    const item = $(ele[0]);

    const obj = {
      url: item.attr('href'),
      today: item.text().includes('hours ago'),
    };

    list = [...list, obj];
  }

  return list;
};

export const extraText = (html: string): string => {
  const $ = cheerio.load(html);

  let text = $('.story').text();

  let title = $('.detailHeadline').text();

  return title + '\n' + text;
};

export const extraImageUrls = (html: string): string[] => {
  const $ = cheerio.load(html);

  let images: string[] = [];

  const url1 = $('figure.leadmedia-story img').attr('src');
  if (url1) {
    images.push(url1);
  }

  const url2 = $('.story img')
    .map((_, el) => {
      return $(el).attr('src');
    })
    .toArray();

  return [...images, ...url2];
};
