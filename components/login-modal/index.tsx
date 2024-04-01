import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z])?\.)+[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z])?$/;

const has1LowCase = /[a-z]+/;
const has1UpCase = /[A-Z]+/;
const has1Number = /[0-9]+/;

export const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onHide,
}: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <Modal size="lg" show={show} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{isLogin ? '登陆' : '注册'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>邮箱:</Form.Label>
            <Form.Control
              type="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              isInvalid={email.length > 0 && !isEmailValid()}
              isValid={email.length > 0 && isEmailValid()}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>密码：</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={password.length > 0 && !isPasswordValid()}
              isValid={password.length > 0 && isPasswordValid()}
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>验证密码：</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={
                  confirmPassword.length > 0 && !isConfirmPasswordValid()
                }
                isValid={confirmPassword.length > 0 && isConfirmPasswordValid()}
              />
            </Form.Group>
          )}
          {!allCorrect() && email.length > 0 && (
            <div className="container">
              <small className="text-danger">
                <ul>
                  {!isEmailValid() && <li>邮箱存在问题</li>}
                  {!has1LowCase.test(password) && (
                    <li>密码需包含一个小写字母</li>
                  )}
                  {!has1UpCase.test(password) && (
                    <li>密码需包含一个大写字母</li>
                  )}
                  {!has1Number.test(password) && <li>密码需包含一个数字</li>}
                  {!isConfirmPasswordValid() && !isLogin && (
                    <li>两次密码不一致</li>
                  )}
                </ul>
              </small>
            </div>
          )}

          <div className="flex gap-x-2 justify-between">
            <Button variant="secondary" onClick={handleClickSwitch}>
              {isLogin ? '注册一个账号' : '登陆到系统'}
            </Button>
            <Button variant="primary" disabled={!allCorrect()}>
              {isLogin ? '登陆' : '注册'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
