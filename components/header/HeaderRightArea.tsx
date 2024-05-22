'use client';

import { useState } from 'react';
import { List } from 'react-bootstrap-icons';

import styles from './header.module.scss';
import clsx from 'clsx';
import { MenuPanel } from './MenuPanel';

export interface IconListProps {
  onMenuClick: () => void;
}

const IconList: React.FC<IconListProps> = ({ onMenuClick }) => {
  return (
    <div className={clsx(styles.MenuIconArea)}>
      <List className={clsx(styles.MenuIcon)} onClick={onMenuClick} />
    </div>
  );
};

export interface HeaderRightAreaProps {}

export const HeaderRightArea: React.FC<HeaderRightAreaProps> = ({}) => {
  const [showMenuPanel, setMenuPanel] = useState(false);

  const onMenuClick = () => {
    setMenuPanel(true);
  };

  const handleMenuClose = () => {
    setMenuPanel(false);
  };

  return (
    <>
      <IconList onMenuClick={onMenuClick} />
      <MenuPanel showPanel={showMenuPanel} onMenuClose={handleMenuClose} />
    </>
  );
};
