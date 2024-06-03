import { useState } from 'react';
import { CloseButton } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';

import styles from './index.module.scss';
import { SocialLogin } from './SocialLogin';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onHide,
}: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleClickRegister = () => {
    setIsLogin(false);
  };

  const handleClickLogin = () => {
    setIsLogin(true);
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <div className="mb-3 flex flex-row-reverse">
          <CloseButton onClick={onHide} />
        </div>
        <div className="flex justify-center mb-2">
          <SocialLogin onHide={onHide} />
        </div>
        <div className={styles.divider}> OR </div>

        {isLogin ? (
          <LoginForm onHide={onHide} onClickRegister={handleClickRegister} />
        ) : (
          <RegisterForm onHide={onHide} onClickLogin={handleClickLogin} />
        )}
      </Modal.Body>
    </Modal>
  );
};
