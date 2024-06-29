import React from 'react';
import styles from './OurMission.module.scss';
import Image from 'next/image';
import mission from './mission.jpg'; // 替换成你的图片路径

const OurMission: React.FC = () => {
  return (
    <section className={styles.ourMission}>
      <div className={styles.contentOuter}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.missionTitle}>我们的使命</h2>
          <p className={styles.missionText}>
            我们深知移民路上的荆棘与陷阱，所以创办了“北径移民资讯”，致力于利用科技的力量，打造一个透明、公正、可靠的移民信息平台。
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
