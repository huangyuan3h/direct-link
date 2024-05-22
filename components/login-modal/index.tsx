import APIClient from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { CloseButton, Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toastMessages } from '../../utils/toastMessage';
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useUser } from '../user-context';
import { decodeJWT } from '@/utils/auth';

import { Fingerprint, Envelope, CheckAll } from 'react-bootstrap-icons';

import styles from './index.module.scss';
import { SocialLogin } from './SocialLogin';
import { isConfirmPasswordValid, isEmailValid, isPasswordValid } from './utils';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}

type BlurStateType = {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

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
