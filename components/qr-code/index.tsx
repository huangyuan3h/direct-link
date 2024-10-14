'use client';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import clsx from 'clsx';

export interface QrCodeProps {
  className?: string;
}

const QrCode: React.FC<QrCodeProps> = ({ className }: QrCodeProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className={clsx('flex justify-center items-center', className)}>
      {url && (
        <QRCodeSVG
          value={url}
          size={100}
          imageSettings={{
            src: '/android-chrome-192x192.png',
            width: 25,
            height: 25,
            excavate: true,
          }}
        />
      )}
    </div>
  );
};

export default QrCode;
