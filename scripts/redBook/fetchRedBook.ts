const cookie = `acw_tc=3b2379857bb782bb6bc6e07551f84aa948d13ad51d3c98b1490208afce276e2d; abRequestId=1d16a03b-dc86-56fd-8fae-deea2c67fbe4; webBuild=4.23.1; a1=19078e153f1yl5mnmvcp0t5ru9que46406n01afwf30000245405; webId=cc492c16a74cfb585f4e00dfe4e3215f; websectiga=9730ffafd96f2d09dc024760e253af6ab1feb0002827740b95a255ddf6847fc8; sec_poison_id=f37fd5ba-2a3d-43cf-a72d-687629fb53ba; web_session=030037a1b60c131ca4ce2b1efd214a0183bffa; gid=yj8WYdy2YK8Kyj8WYdy2qK0iiyv126I6hSU8IEi92F7jA8q87d4K4y888J4248280y4jWS4y; xsecappid=login`;

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
