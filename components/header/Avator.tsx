'use client';
import React from 'react';

import { useUser } from '../user-context';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './header.module.scss';

interface AvatorProps {
  className: string | string[];
}

export const Avator: React.FC<AvatorProps> = ({ className }) => {
  const { user } = useUser();

  const defaultUserImage = '/images/anonymous.svg';

  return (
    <div className={clsx(styles.avatarArea, className)}>
      <Image
        src={defaultUserImage}
        width={20}
        height={20}
        alt={user?.userName ?? ''}
      />
      <div>{user?.userName}</div>
    </div>
  );
};
