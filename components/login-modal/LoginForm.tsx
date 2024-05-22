import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Envelope, Fingerprint } from 'react-bootstrap-icons';
import {
  has1LowCase,
  has1Number,
  has1UpCase,
  isEmailValid,
  isPasswordValid,
} from './utils';
import APIClient from '@/utils/apiClient';
import { toastMessages } from '@/utils/toastMessage';
import { setCookie } from 'nookies';
import { decodeJWT } from '@/utils/auth';
import { toast } from 'react-toastify';
import { useUser } from '../user-context';

type BlurStateType = {
  email: boolean;
  password: boolean;
};

export interface LoginFormProps {
  onHide: () => void;
  onClickRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onHide,
  onClickRegister,
}) => {
  const { updateUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [blurState, setBlurState] = useState<BlurStateType>({
    email: false,
    password: false,
  });

  const handleEmailBlur = () => {
    setBlurState({ ...blurState, email: true });
  };

  const handlePasswordBlur = () => {
    setBlurState({ ...blurState, password: true });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const allCorrect = () => {
    return isEmailValid(email) && isPasswordValid(password);
  };

  const handleClickSumbit = async () => {
    const client = new APIClient();

    const response = await toast.promise(
      client.post('auth/login', { email, password }),
      {
        success: toastMessages.LOGIN_SUCCESS,
        pending: toastMessages.LOADING,
        error: toastMessages.LOGIN_ERROR,
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
  };

  return (
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
          isInvalid={
            email.length > 0 && blurState.email && !isEmailValid(email)
          }
          isValid={email.length > 0 && blurState.email && isEmailValid(email)}
          onBlur={handleEmailBlur}
          placeholder="Email address"
        />
      </InputGroup>
      {email.length > 0 && blurState.email && !isEmailValid(email) && (
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
            password.length > 0 &&
            blurState.password &&
            !isPasswordValid(password)
          }
          isValid={
            password.length > 0 &&
            blurState.password &&
            isPasswordValid(password)
          }
          onBlur={handlePasswordBlur}
          placeholder="Password"
        />
      </InputGroup>
      {password.length > 0 &&
        blurState.password &&
        !isPasswordValid(password) && (
          <small className="text-danger mt-1">
            <ul>
              {!has1LowCase.test(password) && <li>密码需包含一个小写字母</li>}
              {!has1UpCase.test(password) && <li>密码需包含一个大写字母</li>}
              {!has1Number.test(password) && <li>密码需包含一个数字</li>}
            </ul>
          </small>
        )}
      <div className="flex gap-x-2 justify-between mt-3">
        <Button variant="link" onClick={onClickRegister}>
          注册一个账号
        </Button>
        <Button
          variant="primary"
          disabled={!allCorrect()}
          onClick={handleClickSumbit}
        >
          登陆
        </Button>
      </div>
    </Form>
  );
};
