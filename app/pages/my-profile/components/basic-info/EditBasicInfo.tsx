import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import { CameraFill } from 'react-bootstrap-icons';
import clsx from 'clsx';
import { Button, Form } from 'react-bootstrap';
import { User } from '@/types/user';
import { defaultAvatarImage } from '@/config/avatar';
import { useState } from 'react';

export interface EditBasicInfoProps {
  user: User;
  onChange: (u: User) => void;
}

export const EditBasicInfo: React.FC<EditBasicInfoProps> = ({
  user,
  onChange,
}: EditBasicInfoProps) => {
  const [editedUser, setEditedUser] = useState<User>(user);
  const handleChange = (field: keyof User, value: string) => {
    setEditedUser((prevUser: User) => ({ ...prevUser, [field]: value }));
  };

  const handleSaveClick = () => {
    onChange(editedUser);
  };

  return (
    <Card className={styles.basicInfoArea}>
      <div className={styles.backgroundCover}></div>
      <div className={styles.avatarArea}>
        <Image
          className={clsx(styles.avatar, 'shadow')}
          src={user.avatar ?? defaultAvatarImage}
          alt={user.userName || user.email}
          width={80}
          height={80}
        />
        <div className={styles.avatarCover}>
          <CameraFill />
        </div>
      </div>
      <div className={clsx(styles.widthOfInput)}>
        <Form.Control
          type="text"
          placeholder="用户名"
          value={editedUser.userName || ''}
          onChange={(e) => handleChange('userName', e.target.value)}
        />
      </div>
      <div className={clsx(styles.widthOfInput, 'mt-3')}>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="个人简介"
          value={editedUser.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
        />
      </div>
      <div className={clsx(styles.widthOfInput, styles.submitButton, 'mt-3')}>
        <Button onClick={handleSaveClick}>保存</Button>
      </div>
    </Card>
  );
};
