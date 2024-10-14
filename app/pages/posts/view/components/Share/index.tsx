'use client';

import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
  LineShareButton,
  LineIcon,
  WeiboIcon,
  WeiboShareButton,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

import { usePathname } from 'next/navigation';
import styles from './Share.module.scss';

import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { breakpoints } from '@/utils/breakpoint';
import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import QrCode from '@/components/qr-code';

interface ShareProps {
  isMobile: boolean;
  subject: string;
  topics: string[];
  images: string[];
}

const Share: React.FC<ShareProps> = ({ isMobile, topics, subject, images }) => {
  const pathname = usePathname();
  const currentUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${pathname}`;
  const windowWidth = useWindowWidth();

  const initialized = useComponentInitialized();

  if (!initialized) {
    return <></>;
  }

  const Render = () => {
    return (
      <div className={styles.shareForm}>
        <p className={styles.shareTitle}>💡 分享出去，让更多人受益吧！</p>
        <QrCode className="hidden md:flex m-4" />
        <div className={styles.shareIcons}>
          <WhatsappShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            aria-label="Whatsapp"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <FacebookShareButton
            url={currentUrl}
            className={styles.shareIcon}
            hashtag={topics.join(',')}
            aria-label="Facebook"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            hashtags={topics}
            aria-label="Twitter"
          >
            <XIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            aria-label="Telegram"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <LineShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            aria-label="Line"
          >
            <LineIcon size={32} round />
          </LineShareButton>
          <WeiboShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            image={images[0]}
            aria-label="Weibo"
          >
            <WeiboIcon size={32} round />
          </WeiboShareButton>
          <RedditShareButton
            url={currentUrl}
            className={styles.shareIcon}
            title={subject}
            aria-label="Reddit"
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </div>
    );
  };

  if (isMobile && windowWidth < breakpoints.md) {
    return <Render />;
  }

  if (!isMobile && windowWidth >= breakpoints.md) {
    return <Render />;
  }

  return <></>;
};

export default Share;
