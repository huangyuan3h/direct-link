'use client';
import React, { useState } from 'react';

import { useUser } from '../user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './header.module.scss';
import { Button } from 'react-bootstrap';
import { LoginModal } from '../login-modal';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

interface AvatorProps {
  className?: string | string[];
}

export const Avator: React.FC<AvatorProps> = ({ className }) => {
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

  const defaultUserImage = '/images/anonymous.svg';

  return (
    <div className={clsx(styles.AvatorArea, className)}>
      <Image
        src={
          user?.avatar && user?.avatar.length > 0
            ? user?.avatar
            : defaultUserImage
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
