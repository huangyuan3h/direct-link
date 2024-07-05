import Script from 'next/script';
import { useEffect, useState } from 'react';

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  const [shouldLoadGTM, setShouldLoadGTM] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldLoadGTM(true);
    }, 3000); // loading gtm after 3 seconds
  }, []);

  if (!shouldLoadGTM) {
    return <></>;
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="google-analytics-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
