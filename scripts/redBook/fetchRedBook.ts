const cookie = `acw_tc=0524bc5421853f5250b268c96dc34dae5547b607e914eb74a76ba22a97f54e90; abRequestId=c7fb4a18-7b82-5cb9-8ba4-cbe990d90075; webBuild=4.23.1; a1=190727d7fccgsq4drlmjcujdwebc2q3ty2qdbv08n30000571631; webId=df249d5322078bdaee8045a854e2d08c; websectiga=634d3ad75ffb42a2ade2c5e1705a73c845837578aeb31ba0e442d75c648da36a; sec_poison_id=f9c243b4-9b46-4ffb-aed9-0a4ed558fda9; web_session=030037a1b0e1d60bd772eef3fb214a4dea6722; gid=yj8WJWfY48vjyj8WJWfWiJh8SSkMA4fF16VSAYI7VfEdDfq8SJAq9D8882WyKqy8SdiyqJji; xsecappid=xhs-pc-web`;

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
