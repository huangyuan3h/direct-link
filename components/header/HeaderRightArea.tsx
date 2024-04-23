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

  // if (!user) {
  //   return (
  //     <div className="flex gap-x-2">
  //       {/* <Button
  //         className="hidden md:block"
  //         variant="outline-primary"
  //         size="sm"
  //         onClick={handleClickLogin}
  //       >
  //         登陆
  //       </Button> */}

  //       <LoginModal show={showLoginModal} onHide={handleHideModal} />
  //     </div>
  //   );
  // }

  // return (
  //   <div className="flex gap-x-2">
  //     <IconList onMenuClick={onMenuClick} />
  //     <Avator className="hidden md:block" />
  //     <Offcanvas show={showMenuPanel} onHide={handleClose}>
  //       <Offcanvas.Header closeButton>
  //         <Offcanvas.Title>Offcanvas</Offcanvas.Title>
  //       </Offcanvas.Header>
  //       <Offcanvas.Body>
  //         Some text as placeholder. In real life you can have the elements you
  //         have chosen. Like, text, images, lists, etc.
  //       </Offcanvas.Body>
  //     </Offcanvas>
  //   </div>
  // );
};
