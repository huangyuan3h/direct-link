const cookie = `acw_tc=154ecb5a1cd864d11ad69ec14523ca77dbcb1f928476e6e6194abf055ae69bbc; abRequestId=9a4541d1-452e-561b-b487-2c6670c67201; webBuild=4.24.2; a1=190801f0a8aa89avb7i74hxq165lwl2o1zi72oe5b30000378851; webId=8a20ad5b9b240a9409b0eee91a472e7f; websectiga=f3d8eaee8a8c63016320d94a1bd00562d516a5417bc43a032a80cbf70f07d5c0; sec_poison_id=75c97199-5245-4256-b58e-671942e41897; web_session=030037a1b466801c2f2cb874ff214a359ab47b; gid=yj8Y8yi8i8yDyj8Y8yi80uldY00Yj0hDW3W432DxCAyK2Wq81E1JlJ888qWYY2y8SJ08Dy8J; xsecappid=xhs-pc-web`;

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
