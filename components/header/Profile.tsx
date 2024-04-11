'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoginModal } from '../login-modal';
import { useUser } from '../user-context';
import { Avator } from './Avator';
import { List } from 'react-bootstrap-icons';

export interface IconListProps {
  onMenuClick: () => void;
}

const IconList: React.FC<IconListProps> = ({ onMenuClick }) => {
  return (
    <List
      className="md:hidden cursor-pointer hover:text-blue-800 w-6 h-6"
      onClick={onMenuClick}
    />
  );
};

export interface ProfileProps extends IconListProps {}

export const Profile: React.FC<ProfileProps> = ({ onMenuClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useUser();
  const handleClickLogin = () => {
    setShowLoginModal(true);
  };

  const handleHideModal = () => {
    setShowLoginModal(false);
  };

  if (!user) {
    return (
      <div>
        <IconList onMenuClick={onMenuClick} />
        <Button
          className="hidden md:block"
          variant="outline-primary"
          size="sm"
          onClick={handleClickLogin}
        >
          登陆
        </Button>
        <LoginModal show={showLoginModal} onHide={handleHideModal} />
      </div>
    );
  }

  return (
    <div>
      <IconList onMenuClick={onMenuClick} />
      <Avator className="hidden md:block" />
    </div>
  );
};
