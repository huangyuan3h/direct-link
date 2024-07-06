const cookie = `acw_tc=0c3a6bf47446b3b3425792857eca417a3e7c4202e04a23949c0c4a87e420b760; abRequestId=cec10676-2f70-53e2-81cc-9f856eeceab4; webBuild=4.24.2; a1=1908a177c81ww7w6p81pxlxqgcviuwoce5lpooxcj30000393310; webId=30bd5bd636ee4a62b75e77933644d880; websectiga=59d3ef1e60c4aa37a7df3c23467bd46d7f1da0b1918cf335ee7f2e9e52ac04cf; sec_poison_id=b3dcbf4b-6844-4d0f-a5f5-8e4884a8c0d8; web_session=030037a1ba94150bcd3c2e86f1214a8cc60d7f; gid=yj8Y0yWY8KdSyj8Y0yWWS2lCYyEEWEKUYyUC1SV1CAkShUq837ElSl888qjqqy88K8Y8W84j; xsecappid=login`;

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
