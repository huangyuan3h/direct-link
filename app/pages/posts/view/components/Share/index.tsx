'use client'; // 使用app directory 需要加这个

import React, { useEffect, useState } from 'react';
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
  //   LinkedinIcon,
  //   LinkedinShareButton,
  WeiboIcon,
  WeiboShareButton,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

import { usePathname } from 'next/navigation';
import styles from './Share.module.scss';
import { Container, Navbar } from 'react-bootstrap';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { breakpoints } from '@/utils/breakpoint';
import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';

interface ShareProps {
  isMobile: boolean;
}

const Share: React.FC<ShareProps> = ({ isMobile }) => {
  const pathname = usePathname();
  const currentUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${pathname}`;
  const windowWidth = useWindowWidth();

  const initialized = useComponentInitialized();

  if (!initialized) {
    return <></>;
  }

  if (isMobile && windowWidth < breakpoints.md) {
    return (
      <Navbar className={styles.shareContainer}>
        <Container>
          <div className={styles.shareIcons}>
            <WhatsappShareButton url={currentUrl} className={styles.shareIcon}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={currentUrl} className={styles.shareIcon}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl} className={styles.shareIcon}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={currentUrl} className={styles.shareIcon}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <LineShareButton url={currentUrl} className={styles.shareIcon}>
              <LineIcon size={32} round />
            </LineShareButton>
            {/* <LinkedinShareButton url={currentUrl} className={styles.shareIcon}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton> */}
            <WeiboShareButton url={currentUrl} className={styles.shareIcon}>
              <WeiboIcon size={32} round />
            </WeiboShareButton>
            <RedditShareButton url={currentUrl} className={styles.shareIcon}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
        </Container>
      </Navbar>
    );
  }

  return <></>;
};

export default Share;
