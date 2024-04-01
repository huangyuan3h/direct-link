'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoginModal } from '../login-modal';

export interface ProfileProps {
  user: string | undefined; // placeholder
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClickLogin = () => {
    setShowLoginModal(true);
  };

  const handleHideModal = () => {
    setShowLoginModal(false);
  };

  if (!user) {
    return (
      <div>
        <Button variant="primary" onClick={handleClickLogin}>
          登陆
        </Button>
        <LoginModal show={showLoginModal} onHide={handleHideModal} />
      </div>
    );
  }
  return <div>logined</div>;
};
