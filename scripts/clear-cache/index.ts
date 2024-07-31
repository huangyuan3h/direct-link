import dotenv from 'dotenv';

dotenv.config({ path: './.env.prod' });

const clearCloudflareCache = async () => {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUD_FLARE_ZONE_ID}/purge_cache`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUD_FLARE_ACCOUNT}`,
        },
        body: JSON.stringify({ purge_everything: true }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Cache cleared:', data);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// 部署成功后调用此函数
clearCloudflareCache();
