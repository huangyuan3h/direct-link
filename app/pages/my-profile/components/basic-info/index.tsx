import { User } from '@/types/user';
import React, { useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import { PencilSquare, CameraFill } from 'react-bootstrap-icons';
import clsx from 'clsx';
import { Button, Form } from 'react-bootstrap';

const anonymousUrl = '';
export interface BasicInfoProps {
  user: User;
  onChange: (u: User) => void;
}
export const BasicInfo: React.FC<BasicInfoProps> = ({
  user,
  onChange,
}: BasicInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onChange(editedUser);
    setIsEditing(false);
  };

  const handleChange = (field: keyof User, value: string) => {
    setEditedUser((prevUser: User) => ({ ...prevUser, [field]: value }));
  };

  return (
    <div className="container">
      {isEditing ? (
        <Card className={styles.basicInfoArea}>
          <div className={styles.backgroundCover}></div>
          <div className={styles.avatarArea}>
            <Image
              className={clsx(styles.avatar, 'shadow')}
              src={user.avatar ?? anonymousUrl}
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
          <div
            className={clsx(styles.widthOfInput, styles.submitButton, 'mt-3')}
          >
            <Button onClick={handleSaveClick}>保存</Button>
          </div>
        </Card>
      ) : (
        <Card className={styles.basicInfoArea}>
          <div className={styles.backgroundCover}></div>

          <div className={styles.avatarArea}>
            <Image
              className={clsx(styles.avatar, 'shadow')}
              src={user.avatar ?? anonymousUrl}
              alt={user.userName || user.email}
              width={80}
              height={80}
            />
          </div>

          <h6 className={styles.userName}>{user.userName || user.email}</h6>
          <p>{user.bio}</p>

          <PencilSquare onClick={handleEditClick} className={styles.editIcon} />
        </Card>
      )}
    </div>
  );
};
