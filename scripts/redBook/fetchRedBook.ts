const cookie = `acw_tc=29def04c79864a6b5d3aa544661dd5ccfed05a905d03ac4ddcec2553235b5895; abRequestId=05179477-60cf-5869-b6de-7c5e20f60469; webBuild=4.23.1; a1=1906d9084f44aaat0hb2p2eytfgrv7eeziarrnu5y30000779728; webId=23f670b158cf6fa968d30fe30c305098; websectiga=29098a4cf41f76ee3f8db19051aaa60c0fc7c5e305572fec762da32d457d76ae; sec_poison_id=4ab4a1e0-4339-4b91-80bc-e6ece73ff9fd; web_session=030037a1b126a61c00f89e34fa214a65f9a7dc; gid=yj8Kfj8YYDudyj8Kfj8Y43I7i4400098xDJU02vJdv9ikFq8FhWddF888WWjWJY8dddY8f48; xsecappid=ranchi`;

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
