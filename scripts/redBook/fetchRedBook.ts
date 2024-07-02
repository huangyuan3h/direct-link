const cookie = `acw_tc=3c4cbd8f0d28ac3810d87ae113ab4c96bc97c111e68fe335b4f928771c1005d5; abRequestId=8b546540-b650-53c8-b771-8ad1a40d7605; webBuild=4.23.1; a1=19075991adaf0xlicjp4lamrt7glgjhz9rjrh04jk30000204348; webId=52920f83d87a06d33eebd068c4a6dc02; websectiga=59d3ef1e60c4aa37a7df3c23467bd46d7f1da0b1918cf335ee7f2e9e52ac04cf; sec_poison_id=321c635c-0a33-439a-95e6-8e905c3bec41; web_session=030037a1b7d53a1c4dc003c7fc214a61f7f272; gid=yj8W2jjydYjYyj8W2jjy0F84f0i8C13SVU41VVT06F9WkFq81kVxux888J84q4Y82fYYqY2W; xsecappid=xhs-pc-web`;

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
