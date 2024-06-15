import React from 'react';
import styles from './OurMission.module.scss';
import Image from 'next/image';
import mission from './mission.jpg'; // 替换成你的图片路径

const OurMission: React.FC = () => {
  return (
    <section className={styles.ourMission}>
      <div className={styles.contentOuter}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.missionTitle}>我们的遭遇</h2>
          <p className={styles.missionText}>
            移民之路并非坦途，我们也曾落入过黑中介的陷阱。
            一家知名移民公司想让我们去曼尼托巴读College，
            毕业后工作移民。且不说方案耗时漫长，单就让我们两个硕士去读College就极其不合理。
            第二个“移民顾问”建议我走BCEE，妻子去UBC读硕博。
            但查询后发现，他的RCIC资格已被撤销，根本不是合法移民顾问！
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={mission}
            alt="Our Mission"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default OurMission;
