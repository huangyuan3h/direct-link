const cookie = `acw_tc=67358fab38d56ff8082b76f3766a4e0a35cc8db68cd53fcf0f729a3edb63eafb; abRequestId=b6c00058-aa40-5590-911a-f32fcc2a5e9f; webBuild=4.25.1; a1=190b3629c25yw3zvas8un3bx7l7efxly9f58h1g4l30000267070; webId=d5c46815f36b711d4d2f04ba1ffb9b95; websectiga=8886be45f388a1ee7bf611a69f3e174cae48f1ea02c0f8ec3256031b8be9c7ee; sec_poison_id=da38c46e-485a-45e7-8fbe-903399873b5c; web_session=030037a1a706e31c29dcdb14ec214a2ed1e81d; gid=yj8DqKJ08Sjfyj8DqKJjSiykJ2vEquh0MY7I241qDCW1WYq8diC1vx888JKW8W88j8iYDJYd; xsecappid=login`;

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
