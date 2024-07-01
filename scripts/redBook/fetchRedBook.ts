const cookie = `acw_tc=7092e9cf61c766ee4f338a4c188c0081d5678449f35ef97054d6b2762a981af3; abRequestId=c161cf5a-26ac-50a1-a89c-a14fdc0b9166; webBuild=4.23.1; a1=1906b759fa2p5i6f7cipi2y5g1hhipw16z8y8gzzz30000331115; webId=02703fbc61a8eaf97c024a043abb39cf; websectiga=2a3d3ea002e7d92b5c9743590ebd24010cf3710ff3af8029153751e41a6af4a3; sec_poison_id=6eeec404-6930-44da-8a2c-39b2724b29fe; web_session=030037a1b2bca91ca70d91aef9214aa6f445e3; gid=yj8KDW2044K8yj8KDW2jiuku0JU23KiWS3U3YuuJv2kyxvq8x3UEyY888qqyyy280S4Yq4qd; xsecappid=xhs-pc-web`;

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
