export const getHTMLText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language':
        'en-GB,en;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6,ja;q=0.5',
      'cache-control': 'max-age=0',
      priority: 'u=0, i',
      'sec-ch-ua':
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      cookie:
        'X-AB-VARIANT=a-XqLpqP27HpU2|B; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIE4AmHgZgDZuARgCsvDhwAMAdgAsADmm8QAXyA; _pcid=%7B%22browserId%22%3A%22lvccrn6bj2rp7qtn%22%7D; cX_P=lvccrn6bj2rp7qtn; _cb=rcrTBCe-htfC_WOJv; cbc_visitor=b13e60a1-1c49-4467-80d8-26b0b73f663b; AMCVS_951720B3535680CB0A490D45%40AdobeOrg=1; s_ecid=MCMID%7C21071277975646010014122964150822143410; cbc_privacy_notification=1; referrerPillar=feed; s_cc=true; BCSessionID=10c59fec-73da-4ede-8276-e255843c7657; __gads=ID=b5ef96d7e607f00b:T=1719065623:RT=1719065623:S=ALNI_MaSiqJx02LtmSiCiLd1ceggpnnnHw; __gpi=UID=00000e5b9539e34a:T=1719065623:RT=1719065623:S=ALNI_MaWpRo77fJoFvBnXSqMCmQtJ6yw-g; __eoi=ID=ee9180ba3fe22ecc:T=1719065623:RT=1719065623:S=AA-AfjbDGyxi0B67jzDLJyaanTMK; _fbp=fb.1.1719065670811.945003802614537540; s_sq=cbc-production%3D%2526pid%253Dnews%25253Acanada%25253Astory%25253A1.7242389-calgarys-water-crisis-is-a-wake-up-call-for-every-city-in-canada-warn-infrastructure-experts%2526pidt%253D1%2526oid%253DfunctionJr%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DSUBMIT; stats_experiment_ids=%5B%22a-XqLpqP27HpU2%22%5D; stats_experiment_variants=%5B%22a-XqLpqP27HpU2%7CB%22%5D; _v__chartbeat3=zSZHqBFnxMGBu2m4O; cbc_ppid=b13e60a1-1c49-4467-80d8-26b0b73f663b; cbc-session=1722935242; cp-sess=eyJ0cmFpdHMiOlsiY3VzdC9jLWktYS1YcUxwcVAyN0hwVTI6QiJdLCJzZWxzIjp7ImEtWHFMcHFQMjdIcFUyIjp7ImEiOiJhLVhxTHBxUDI3SHBVMiIsImMiOiJCIiwicCI6ImEiLCJmcyI6WyIqIiwiZ2VvL2RtOmkiLCJ1YS9vczptIiwidWEvYnI6YyIsInVhL21vOm4iLCJkdC93cDp3ZCJdLCJ0cyI6MTcyMjg1NDM1NywicyI6Im9rIiwiZHAiOiJwIn19LCJyd2RzIjp7fSwidm4iOjIsInR2dHMiOjE3MjI5MzUyNDIsInZ0cyI6MTcyMjkzNTI0MiwidmFscyI6eyJkdC93cCI6eyJ2Ijoid2QiLCJ0cyI6MTcyMjkzNTI0Mn19LCJwdnRzIjoxNzIyODU1NDkzfQ%3D%3D; ak_bmsc=4C5465FDABF7CAF630D3758B39C095CD~000000000000000000000000000000~YAAQFepCF1ObHBiRAQAA4m7xJhg+tUHogv4QrNBwA96hxMOMVkZ/UmOBPWO4OsEcCXZ4dJ4zNxgr65P/7/+9FfxM9N1bOPpEamjY7I9T+SEjHsFsYTpr0UodQWIm5ETigTcEmzcvnv7CnA4I6jV/i4hzsCTos+WJlpZD+bw4+QjgMCBIpYVIUuoayQoUpiJQzie2gXm5gyTHZ1r4HMeA0GXQJVDIhrwOOZ8Qz1Zlag96RawLLjAxJ9YMDPxCr/jImyOazpSMvngqKW+LS/1ENzywdzRL7LVjUU1cO3n+pAmaVAKKDKulmJO2QE1TQ2YpMNtHP6rr3KMCU5y7wBX2wlj/RmqpZF9PH7LqwLF9d9Wgtx0s3jQ2YcJ+d+pFGHk/PCsZsVHIy8p5jWCfEYJa8eUEqJm8Oh3DqwQDbZayZUU/APhuZ4IkjgskyHBb0H1dBQ==; AMCV_951720B3535680CB0A490D45%40AdobeOrg=1585540135%7CMCIDTS%7C19941%7CMCMID%7C21071277975646010014122964150822143410%7CMCAAMLH-1723540042%7C11%7CMCAAMB-1723540042%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1722942442s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.0%7CMCCIDH%7C-82759145; _cb_svref=https%3A%2F%2Fwww.google.com%2F; last_visit_bc=1722935249474; _awl=2.1722935250.5-759e97031469a7100073e44e37db3b3a-6763652d75732d7765737431-0; referringDepartment=local%20services%3Acalgary; _chartbeat2=.1713874741978.1722935251284.0000000000000011.Ho4RBBbzvp8CgPhO_D61hhaBp6iOg.2; _vfa=www%2Ecbc%2Eca.00000000-0000-4000-8000-082f79d5b829.f072742a-2c37-43b7-b714-68e9ef483130.1713874742.1722854301.1722935279.4; _vfb=www%2Ecbc%2Eca.00000000-0000-4000-8000-082f79d5b829.4.10.1722935279....; NSC_mcwt-ttm-xfcgbsn.dcd.db=ffffffff0983169745525d5f4f58455e445a4a423660; bm_mi=0C994CEAB723F56E28D1B6DACE51BADA~YAAQFepCF0APIRiRAQAAAbH/JhhpHhxOlIMUk5VShjTJZH1UcDOPISFVVxgeFvm56C6xol7nwL1ncDR8o2QlY4woYdsRpSJe6a8OncXH14NsNNRSHpSR6HPJv86izQFkxkFDzOVHA8/qem6iULGw3zmxQfl+UjEzWdAkXx1mySMH2DWlixT0UaGCIKFk8YJh8SfmQGzX9kYQJSimfU1mko90+qN5aG+763ISHNo5WEaapbB/xRlrsm3TMiDqoVSJ9Z4/h9eq7oJBBZjAfqYwbcmz7Dc9ECw8xBsmraBvki3cWoigYZhaJmAWFSlf6DjSWkdqheBZXXOlsiKBGG7+fTs7nEkDanMr2WVG13VN4AZmylC5SGrg7WlM24I=~1; bm_sv=45E1CED8585FB652E6FD19858EA7A75F~YAAQFepCF0EPIRiRAQAAAbH/JhiLwA3H3aoiAi2Vq0wXwanAvEAsG4MxwPZhAedgmIajoOMMDaObT6oes8dRnuJDkXMv8bz0WPQYomGTCf5cAHdZBFBp53ZSnl4gfcxMRD98nvwzakWzVnEy2MJBXazYZx3PuvYX9K/+TTHL5C+tr3Tte/UU5wfJDy1KNDU3t/IKMCYoQaWKbDS4j/vmfwUUxCpRAjbT3Bnu/0BUlHucbivmmrYBUg7T3SBKA44N~1',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
  });

  return await response.text();
};
