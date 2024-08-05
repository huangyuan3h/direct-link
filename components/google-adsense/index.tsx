'use client';
import Script from 'next/script';

interface GoogleAdSenseProps {
  id: string;
}

const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({ id }) => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`}
        crossOrigin="anonymous"
      ></Script>
    </>
  );
};

export default GoogleAdSense;
