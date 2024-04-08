'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoginModal } from '../login-modal';
import { useUser } from '../user-context';

export interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
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
        <Button variant="outline-primary" onClick={handleClickLogin}>
          登陆
        </Button>
        <LoginModal show={showLoginModal} onHide={handleHideModal} />
      </div>
    );
  }
  return <div>logined</div>;
};
