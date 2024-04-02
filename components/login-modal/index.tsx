import APIClient from '@/utils/apiClient';
import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LoadingArea } from './LoadingArea';
import { toastMessages } from './toastMessage';
import cookie from 'cookiejs';
import { ToastContext, ToastContextType } from '../toast';
import { toast } from 'react-toastify';

export interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z])?\.)+[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z])?$/;

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
  const [loading, setLoading] = useState(false);
  const { setToastMessage } = useContext(ToastContext);

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

  const handleClickSumbit = () => {
    const client = new APIClient();
    setLoading(true);
    if (isLogin) {
      client.post('auth/login', { email, password }).then((response) => {
        if (response.Authorization) {
          cookie('Authorization', response.Authorization);
          setLoading(false);
          onHide();
          toast.success(toastMessages.LOGIN_SUCCESS, {
            position: 'top-center',
          });
        }
      });
    } else {
      client
        .post('auth/create_account', { email, password })
        .then((response) => {
          if (response.message === 'created') {
            setLoading(false);
            onHide();
            toast.success(toastMessages.REGISTER_SUCCESS, {
              position: 'top-center',
            });
          }
        });
    }
  };

  return (
    <Modal show={show} centered>
      <Modal.Header closeButton onHide={onHide}></Modal.Header>
      <Modal.Body>
        {loading ? (
          <LoadingArea />
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>邮箱:</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                isInvalid={
                  email.length > 0 && blurState.email && !isEmailValid()
                }
                isValid={email.length > 0 && blurState.email && isEmailValid()}
                onBlur={handleEmailBlur}
              />
              {email.length > 0 && blurState.email && !isEmailValid() && (
                <small className="text-danger mt-1">邮箱格式存在问题</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>密码：</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={
                  password.length > 0 &&
                  blurState.password &&
                  !isPasswordValid()
                }
                isValid={
                  password.length > 0 && blurState.password && isPasswordValid()
                }
                onBlur={handlePasswordBlur}
              />
              {password.length > 0 &&
                blurState.password &&
                !isPasswordValid() && (
                  <small className="text-danger mt-1">
                    <ul>
                      {!has1LowCase.test(password) && (
                        <li>密码需包含一个小写字母</li>
                      )}
                      {!has1UpCase.test(password) && (
                        <li>密码需包含一个大写字母</li>
                      )}
                      {!has1Number.test(password) && (
                        <li>密码需包含一个数字</li>
                      )}
                    </ul>
                  </small>
                )}
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>验证密码：</Form.Label>
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
                />
                {confirmPassword.length > 0 &&
                  blurState.confirmPassword &&
                  !isConfirmPasswordValid() && (
                    <small className="text-danger mt-1">两次密码不一致</small>
                  )}
              </Form.Group>
            )}

            <div className="flex gap-x-2 justify-between">
              <Button variant="secondary" onClick={handleClickSwitch}>
                {isLogin ? '注册一个账号' : '登陆到系统'}
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
        )}
      </Modal.Body>
    </Modal>
  );
};
