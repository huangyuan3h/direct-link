const cookie = `acw_tc=7a5a840f19bd15d435b5319571d3bb9ee8d614dcb58fc7a2ac66994297f6db2f; abRequestId=1a62794f-1b14-5640-b691-de15df4822c2; webBuild=4.23.1; a1=1907ae79a3e37p8pwfkpm7v30yzszmds25fw6obtc30000184543; webId=811c8417192785f77be3cfd6fc74a8a4; websectiga=8886be45f388a1ee7bf611a69f3e174cae48f1ea02c0f8ec3256031b8be9c7ee; sec_poison_id=82eb2835-312e-4492-8184-fa97f5b7faaf; web_session=030037a1b6896109092f599bfd214a91b702eb; gid=yj8W0dWjdqJfyj8W0dWj02lDqdqWUYUEiTU6i9SWhq8vuEq8Mu6fMK888yY424q80yd0Y0id; xsecappid=login`;

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
