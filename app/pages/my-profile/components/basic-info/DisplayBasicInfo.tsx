import { Card } from 'react-bootstrap';
import styles from './index.module.scss';
import { PencilSquare } from 'react-bootstrap-icons';
import Image from 'next/image';
import clsx from 'clsx';
import { User } from '@/types/user';
import { defaultAvatarImage } from '@/config/avatar';

export interface DisplayBasicInfoProps {
  user: User;
  onEditClick: () => void;
}
export const DisplayBasicInfo: React.FC<DisplayBasicInfoProps> = ({
  user,
  onEditClick,
}: DisplayBasicInfoProps) => {
  const { avatar, userName, email, bio } = user;
  const displayUsername = userName || email;
  return (
    <Card className={styles.basicInfoArea}>
      <div className={styles.backgroundCover}></div>

      <div className={styles.avatarArea}>
        <Image
          className={clsx(styles.avatar, 'shadow')}
          src={avatar ?? defaultAvatarImage}
          alt={displayUsername}
          width={80}
          height={80}
        />
      </div>

      <h6 className={styles.userName}>{displayUsername}</h6>
      <div className={clsx(styles.displayBio, styles.widthOfInput)}>
        <p>{bio}</p>
      </div>

      <PencilSquare onClick={onEditClick} className={styles.editIcon} />
    </Card>
  );
};
