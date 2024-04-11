'use client';
import React from 'react';

import { useUser } from '../user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './header.module.scss';

interface AvatorProps {
  className?: string | string[];
}

export const Avator: React.FC<AvatorProps> = ({ className }) => {
  const { user } = useUser();

  const defaultUserImage = '/images/anonymous.svg';

  return (
    <div className={clsx(className)}>
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
      />
    </div>
  );
};
