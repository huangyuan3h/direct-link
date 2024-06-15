import React from 'react';
import styles from './AboutIntro.module.scss';
import Image from 'next/image';
import about from './about.jpg';

const AboutIntro: React.FC = () => {
  return (
    <section className={styles.aboutIntro}>
      <div className={styles.contentOuter}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.introTitle}>关于 North Path</h2>
          <p className={styles.introText}>
            自古以来，人类仰望星空，对未知领域充满好奇，对自由的向往更是根植于心。
            跨越山海，探索更广阔的天地，是根植于人类基因中的冒险精神的体现。
            North Path
            网站的建立，正是为了帮助那些怀揣梦想，渴望在新的土地上扎根、成长的人们。
            我们致力于收集和分享有关移民和留学的全面信息，为您的探索之旅提供可靠的指南和支持，帮助您在异国他乡顺利开启新的篇章。
          </p>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={about}
          alt="about"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 50vw" // 图片响应式
        />
      </div>
    </section>
  );
};

export default AboutIntro;
