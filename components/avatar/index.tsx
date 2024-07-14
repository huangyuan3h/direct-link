'use client';
import React, { useState } from 'react';

import { useUser } from '../user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './avatar.module.scss';
import { Button } from 'react-bootstrap';

import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { defaultAvatarImage } from '@/config/avatar';
import dynamic from 'next/dynamic';

const LoginModal = dynamic(
  () => import('../login-modal').then((mod) => mod.LoginModal),
  {
    ssr: false,
  }
);

interface AvatarProps {
  className?: string | string[];
  withName?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  withName,
}: AvatarProps) => {
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
        loading="lazy"
        className={styles.avatar}
        alt={user?.userName ?? ''}
        onClick={handleClickImage}
      />
      {withName && (
        <>
          <div>{user?.userName ?? '用户'}</div>
          {!user && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleClickLogin}
            >
              登陆
            </Button>
          )}
        </>
      )}

      <LoginModal show={showLoginModal} onHide={handleHideModal} />
    </div>
  );
};
