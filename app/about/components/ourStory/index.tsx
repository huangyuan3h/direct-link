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
            2022年，我们决定移民加拿大，在移民的整个过程中遭遇了许多黑中介的欺骗。
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
