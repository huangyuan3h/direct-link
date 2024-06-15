import React from 'react';
import styles from './OurStory.module.scss';
import Image from 'next/image';
import businessImg from './business.jpg'; // 替换成你的图片路径

const OurStory: React.FC = () => {
  return (
    <section className={styles.ourStory}>
      <div className={styles.contentOuter}>
        <div className={styles.imageWrapper}>
          <Image
            src={businessImg}
            alt="Immigration Story"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw" // 图片响应式
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.storyTitle}>我们的故事</h2>
          <p className={styles.storyText}>
            2022年，我们决定移民加拿大，这并非一时兴起，而是源于对更广阔天空、更自由空气和更纯粹生活的渴望。加拿大，以其优质的教育资源、包容的社会环境和优美的自然风光，深深地吸引着我们，成为了我们心中理想的栖息地。
            然而，当我们真正踏上移民之路时，才发现这条路远比想象中更加崎岖。
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
