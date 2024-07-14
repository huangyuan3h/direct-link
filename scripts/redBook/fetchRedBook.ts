const cookie = `acw_tc=3e9430a953539081282515cb7cb88c17bdc86a8fa7a4c4cd10deec437e3fdf76; abRequestId=50db25e0-420f-5918-aefb-f84ad456befc; webBuild=4.25.1; a1=190b1af096awg9m7o92t7c3zck0a7vscbmas49wov30000100679; webId=036029a7879cf08fddbd03ca33d6d058; websectiga=29098a4cf41f76ee3f8db19051aaa60c0fc7c5e305572fec762da32d457d76ae; sec_poison_id=b202ab34-0e8c-45fa-bc72-03784e983849; web_session=030037a1a0b761090d6659a5eb214a9c484afc; gid=yj8Dy0i8fiDSyj8Dy0i8j6jEK0Ekj6WljJ9W0lhSquST8Mq80WhMS4888y88KWj8WSSSSY4S; xsecappid=login`;

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
