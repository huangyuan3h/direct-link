const cookie = `acw_tc=518b81723028e6bd5fd9fc17383dc12a449e7e3823af5db2419c040427742054; abRequestId=26c4a71b-8919-5d2b-8f08-7811dad435ea; webBuild=4.23.1; a1=190666bf7fd5sy4aha787ebee7p2b1g7k4ual2nvz30000415594; webId=197c7d51528916c32546a274b1148523; websectiga=2a3d3ea002e7d92b5c9743590ebd24010cf3710ff3af8029153751e41a6af4a3; sec_poison_id=f915b7d3-05c1-4c99-9f8c-d4d8f53216bc; web_session=030037a1b3cac2147a49fad8f8214ab5b22085; gid=yj8KKKDiDiTfyj8KKKDiW4JIif2Mv40x0WYW7hudDddWU0q8JDykW18884y22j48q0jWqi42; xsecappid=xhs-pc-web`;

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
