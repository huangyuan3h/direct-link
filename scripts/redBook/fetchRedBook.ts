const cookie = `acw_tc=69e23d4b5ea6ca961c5b8389345c4910490b1573ebde05728c5f8578d33bbb31; abRequestId=66f4a9fa-48c8-576e-8e65-aebaecf99794; webBuild=4.27.7; a1=190f93c737eetna087phteun4ghagkbw95qqhqznl30000569421; webId=cf33c37b09e9dfe37d19cae00121be9b; websectiga=16f444b9ff5e3d7e258b5f7674489196303a0b160e16647c6c2b4dcb609f4134; sec_poison_id=9460953d-d4d7-49d5-bc28-a7bf9681423b; web_session=030037a195602309205c1b72de214a87ae2a56; gid=yj8ijqSWW0jjyj8ijqSWq2AuWdd9I08YWUx9AI1d7I4kxAq80kTDEx8882Kj4Jy8yySDdJJq; xsecappid=login`;

export const getHTMLText = async (id: string): Promise<string> => {
  const response = await fetch(
    `https://www.xiaohongshu.com/explore/${id}?note_flow_source=wechat&xsec_token=CB1iy7a1zRHzvRZmZaSh7Av0TkYc44Qwi0R57455ffVj8=`,
    {
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
    }
  );

  return await response.text();
};
