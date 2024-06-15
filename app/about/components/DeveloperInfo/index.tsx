import React from 'react';
import styles from './DeveloperInfo.module.scss';

interface DeveloperInfoProps {
  name: string;
  role: string;
  bio: string;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ name, role, bio }) => (
  <div className={styles.developerInfoContainer}>
    <div className={styles.developerInfoContent}>
      <h3 className={styles.developerInfoName}>{name}</h3>
      <p className={styles.developerInfoRole}>{role}</p>
      <p className={styles.developerInfoBio}>{bio}</p>
    </div>
  </div>
);

export default DeveloperInfo;
