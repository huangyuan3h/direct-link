import React from 'react';
import styles from './team.module.scss';
import DeveloperInfo from '../DeveloperInfo';

const OurTeam: React.FC = () => {
  return (
    <section className={styles.ourMission}>
      <div className={styles.developers}>
        <h3 className={styles.developersTitle}>我们的团队</h3>
        <div className={styles.developersGrid}>
          <DeveloperInfo
            name="Yuan Huang"
            role="Fullstack Developer"
            bio="他是一位经验丰富的全栈软件工程师，拥有10年的行业经验，对技术充满热情。他精通Next.js和TypeScript等现代技术栈，并利用其专业知识主导开发了本站的大部分功能。他坚信技术的力量可以改善人们的生活，并致力于利用自己的技能和经验为用户创造一个便捷、高效、可靠的在线平台。"
          />
          <DeveloperInfo
            name="Susie Hu"
            role="Project manager"
            bio="她是一位经验丰富的项目经理，拥有5年的SAP经验。她负责本站的功能规划，并确保项目顺利进行。她善于沟通、协调资源，并致力于为用户打造一个满足其需求的优质平台。"
          />
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
