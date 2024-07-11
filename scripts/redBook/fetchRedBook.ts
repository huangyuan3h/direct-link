const cookie = `acw_tc=0e79ba244518034c416e86b84e4fb19ac57cb8829e37700d54bbc44b0cbed03d; abRequestId=fc064067-493d-5d79-8ede-deea52425b92; webBuild=4.25.0; a1=190a3bee303b0cx79b7nwm5f77f4h4vdgc2olmxw730000202831; webId=fc9e9edb568bd7ee30cbbcb7d6768be1; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=076d3662-49ba-4121-a193-4f9eca8b7d97; web_session=030037a1a305d71c6f10ef17e8214a9ec57fee; gid=yj80qDddW0k8yj80qDddqS6C8qD8SCWjDWIEJEW62iWWilq84x4hf1888J8JYqy8fKdWyffy; xsecappid=login`;

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
