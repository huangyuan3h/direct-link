import puppeteer from 'puppeteer';

export type NoteCard = {
  displayTitle: string;
  desc: string;
  imageList: {
    urlDefault: string;
  }[];
};

export type RawValType = {
  noteCard: NoteCard;
};

export interface REDWindow {
  __INITIAL_STATE__: {
    feed: {
      feeds: {
        _rawValue: RawValType[];
      };
    };
  };
}

export const getHTMLText = async (url: string): Promise<NoteCard> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });

  const result = await page.evaluate(() => {
    // 在页面上下文中执行的代码
    return (window as unknown as REDWindow).__INITIAL_STATE__.feed.feeds
      ._rawValue?.[0].noteCard;
  });

  // 关闭浏览器
  await browser.close();

  return result;
};
