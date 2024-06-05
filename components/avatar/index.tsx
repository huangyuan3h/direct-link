'use client';
import React, { useState } from 'react';

import { useUser } from '../user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './avatar.module.scss';
import { Button } from 'react-bootstrap';
import { LoginModal } from '../login-modal';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { defaultAvatarImage } from '@/config/avatar';

interface AvatarProps {
  className?: string | string[];
}

export const Avatar: React.FC<AvatarProps> = ({ className }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleClickLogin = () => {
    setShowLoginModal(true);
  };

  const handleHideModal = () => {
    setShowLoginModal(false);
  };

  const handleClickImage = () => {
    if (!user) {
      handleClickLogin();
      return;
    }
    router.push(routes.myProfile);
  };

  return (
    <div className={clsx(styles.AvatarArea, className)}>
      <Image
        src={
          user?.avatar && user?.avatar.length > 0
            ? user?.avatar
            : defaultAvatarImage
        }
        width={32}
        height={32}
        className={styles.avatar}
        alt={user?.userName ?? ''}
        onClick={handleClickImage}
      />
      <div>{user?.userName ?? '用户'}</div>
      {!user && (
        <Button variant="outline-primary" size="sm" onClick={handleClickLogin}>
          登陆
        </Button>
      )}

      <LoginModal show={showLoginModal} onHide={handleHideModal} />
    </div>
  );
};
