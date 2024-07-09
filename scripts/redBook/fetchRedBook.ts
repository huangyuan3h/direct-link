const cookie = `acw_tc=335b6113087c16b44229ebda1d3e31ee76f7562eec0e1c3a4033ef5930dc8409; abRequestId=8693163f-fc72-50a5-bfd5-73f2465c51f5; webBuild=4.24.2; a1=1909482f22f8sqbc4ykcytfza8cge5hwfd33wesoz30000189864; webId=f08d37ec6ce53dbd7f9365abff1a1150; websectiga=8886be45f388a1ee7bf611a69f3e174cae48f1ea02c0f8ec3256031b8be9c7ee; sec_poison_id=fbee509b-1dc4-41d8-bc92-69f83de5c775; web_session=030037a1bf3f341cf6570c2df4214ac2d4cf76; gid=yj8j4YJiKyi4yj8j4YJiJfdMJiYMADS4vTSvqlu9iu0YSqq8kd2xEE888yYjYK48fKi8DJ00; xsecappid=xhs-pc-web`;

export const getHTMLText = async (url: string): Promise<string> => {
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
