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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { Fingerprint, Envelope, CheckAll } from 'react-bootstrap-icons';

import styles from './index.module.scss';

export interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

const has1LowCase = /[a-z]+/;
const has1UpCase = /[A-Z]+/;
const has1Number = /[0-9]+/;

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blurState, setBlurState] = useState<BlurStateType>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { updateUser } = useUser();

  const handleClickSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const isEmailValid = () => {
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    if (password.length >= 20 || password.length < 6) {
      return false;
    }

    if (!has1LowCase.test(password)) {
      return false;
    }

    if (!has1UpCase.test(password)) {
      return false;
    }

    if (!has1Number.test(password)) {
      return false;
    }

    return true;
  };

  const isConfirmPasswordValid = () => {
    return password === confirmPassword;
  };

  const allCorrect = () => {
    if (isLogin) {
      return isEmailValid() && isPasswordValid();
    } else {
      return isEmailValid() && isPasswordValid() && isConfirmPasswordValid();
    }
  };

  useEffect(() => {
    if (!show) return;
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setBlurState({
      email: false,
      password: false,
      confirmPassword: false,
    });

    setIsLogin(true);
  }, [show]);

  const handleEmailBlur = () => {
    setBlurState({ ...blurState, email: true });
  };

  const handlePasswordBlur = () => {
    setBlurState({ ...blurState, password: true });
  };

  const handleConfirmPasswordBlur = () => {
    setBlurState({ ...blurState, confirmPassword: true });
  };

  const handleClickSumbit = async () => {
    const client = new APIClient();

    if (isLogin) {
      const response = await toast.promise(
        client.post('auth/login', { email, password }),
        {
          success: toastMessages.LOGIN_SUCCESS,
          pending: toastMessages.LOADING,
          error: toastMessages.REQUEST_ERROR,
        },
        {
          position: 'top-center',
        }
      );
      if (response.Authorization) {
        setCookie(null, 'Authorization', response.Authorization);
        updateUser(decodeJWT(response.Authorization));
        onHide();
      }
    } else {
      const response = await toast.promise(
        client.post('auth/create_account', { email, password }),
        {
          success: toastMessages.REGISTER_SUCCESS,
          pending: toastMessages.LOADING,
          error: toastMessages.REQUEST_ERROR,
        },
        {
          position: 'top-center',
        }
      );

      onHide();
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const client = new APIClient();
    const response = await toast.promise(
      client.post('auth/login/google', {
        credential: credentialResponse.credential,
      }),
      {
        success: toastMessages.LOGIN_SUCCESS,
        pending: toastMessages.LOADING,
        error: toastMessages.REQUEST_ERROR,
      },
      {
        position: 'top-center',
      }
    );
    debugger;
    if (response.Authorization) {
      setCookie(null, 'Authorization', response.Authorization);
      updateUser(decodeJWT(response.Authorization));
      onHide();
    }
  };

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <div className="mb-3 flex flex-row-reverse">
          <CloseButton onClick={onHide} />
        </div>
        <div className="flex justify-center mb-2">
          <GoogleOAuthProvider clientId="370355018861-c6ukhtuk0c9tstbi7k3ir5buhnk9lmvr.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error(toastMessages.REQUEST_ERROR)}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
        <div className={styles.divider}> OR </div>
        <Form className="mt-3">
          <InputGroup>
            <InputGroup.Text>
              <Envelope />
            </InputGroup.Text>
            <Form.Control
              type="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              isInvalid={email.length > 0 && blurState.email && !isEmailValid()}
              isValid={email.length > 0 && blurState.email && isEmailValid()}
              onBlur={handleEmailBlur}
              placeholder="Email address"
            />
          </InputGroup>
          {email.length > 0 && blurState.email && !isEmailValid() && (
            <small className="text-danger ml-4">邮箱格式存在问题</small>
          )}
          <InputGroup className="mt-3">
            <InputGroup.Text>
              <Fingerprint />
            </InputGroup.Text>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={
                password.length > 0 && blurState.password && !isPasswordValid()
              }
              isValid={
                password.length > 0 && blurState.password && isPasswordValid()
              }
              onBlur={handlePasswordBlur}
              placeholder="Password"
            />
          </InputGroup>
          {password.length > 0 && blurState.password && !isPasswordValid() && (
            <small className="text-danger mt-1">
              <ul>
                {!has1LowCase.test(password) && <li>密码需包含一个小写字母</li>}
                {!has1UpCase.test(password) && <li>密码需包含一个大写字母</li>}
                {!has1Number.test(password) && <li>密码需包含一个数字</li>}
              </ul>
            </small>
          )}
          {!isLogin && (
            <>
              <InputGroup className="mt-3">
                <InputGroup.Text>
                  <CheckAll />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  isInvalid={
                    confirmPassword.length > 0 &&
                    blurState.confirmPassword &&
                    !isConfirmPasswordValid()
                  }
                  isValid={
                    confirmPassword.length > 0 &&
                    blurState.confirmPassword &&
                    isConfirmPasswordValid()
                  }
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="Confirm Password"
                />
              </InputGroup>

              {confirmPassword.length > 0 &&
                blurState.confirmPassword &&
                !isConfirmPasswordValid() && (
                  <small className="text-danger ml-4 mt-1">
                    两次密码不一致
                  </small>
                )}
            </>
          )}

          <div className="flex gap-x-2 justify-between mt-3">
            <Button variant="link" onClick={handleClickSwitch}>
              {isLogin ? '注册一个账号' : '输入账号密码'}
            </Button>
            <Button
              variant="primary"
              disabled={!allCorrect()}
              onClick={handleClickSumbit}
            >
              {isLogin ? '登陆' : '注册'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
