import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { CheckAll, Envelope, Fingerprint } from 'react-bootstrap-icons';
import {
  has1LowCase,
  has1Number,
  has1UpCase,
  isConfirmPasswordValid,
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
  confirmPassword: boolean;
};

export interface RegisterFormProps {
  onHide: () => void;
  onClickLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onHide,
  onClickLogin,
}) => {
  const { updateUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blurState, setBlurState] = useState<BlurStateType>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleEmailBlur = () => {
    setBlurState({ ...blurState, email: true });
  };

  const handlePasswordBlur = () => {
    setBlurState({ ...blurState, password: true });
  };

  const handleConfirmPasswordBlur = () => {
    setBlurState({ ...blurState, confirmPassword: true });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const allCorrect = () => {
    return (
      isEmailValid(email) &&
      isPasswordValid(password) &&
      isConfirmPasswordValid(password, confirmPassword)
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleClickSumbit = async () => {
    const client = new APIClient();

    await toast.promise(
      client.post('auth/create_account', { email, password }),
      {
        success: toastMessages.REGISTER_SUCCESS,
        pending: toastMessages.REGISTER_LOADING,
        error: toastMessages.REGISTER_ERROR,
      },
      {
        position: 'top-center',
      }
    );

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
            !isConfirmPasswordValid(password, confirmPassword)
          }
          isValid={
            confirmPassword.length > 0 &&
            blurState.confirmPassword &&
            isConfirmPasswordValid(password, confirmPassword)
          }
          onBlur={handleConfirmPasswordBlur}
          placeholder="Confirm Password"
        />
      </InputGroup>

      {confirmPassword.length > 0 &&
        blurState.confirmPassword &&
        !isConfirmPasswordValid(password, confirmPassword) && (
          <small className="text-danger ml-4 mt-1">两次密码不一致</small>
        )}
      <div className="flex gap-x-2 justify-between mt-3">
        <Button variant="link" onClick={onClickLogin}>
          使用已有账号密码
        </Button>
        <Button
          variant="primary"
          disabled={!allCorrect()}
          onClick={handleClickSumbit}
        >
          注册
        </Button>
      </div>
    </Form>
  );
};
