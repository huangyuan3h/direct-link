import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './messageForm.module.scss';
import { toast } from 'react-toastify';
import { toastMessages } from '@/utils/toastMessage';
import APIClient from '@/utils/apiClient';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

interface MessageFormProps {
  //   onSubmit: (formData: {
  //     name: string;
  //     email: string;
  //     message: string;
  //   }) => void;
}

type fieldNameType = 'name' | 'message' | 'email';

const MessageForm: React.FC<MessageFormProps> = ({}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const router = useRouter();

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'name':
        if (value.length < 2 || value.length > 50) {
          return '姓名长度必须在 2 到 50 个字符之间';
        }
        break;
      case 'message':
        if (value.length < 6 || value.length > 500) {
          return '内容长度必须在 6 到 500 个字符之间';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '请输入有效的邮箱地址';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };
    for (const field in formData) {
      const error = validateField(field, formData[field as fieldNameType]);
      newErrors[field as fieldNameType] = error;
      if (error) {
        isValid = false;
      }
    }
    setErrors(newErrors);

    if (isValid) {
      const { name, message, email } = formData;

      const sendMessage = async () => {
        try {
          const client = new APIClient();

          const response = await client.post('message/send', {
            subject: '',
            conten: message,
            fromEmail: email,
          });

          if (response.message) {
            router.push(routes.home);
            return '信息发送成功！';
          } else {
            console.error('发送失败');
            throw new Error('发送失败');
          }
        } catch (error) {
          console.error('发送出错：', error);
          throw error;
        }
      };

      await toast.promise(
        sendMessage(),
        {
          success: toastMessages.SEND_MESSAGE_SUCCESS,
          pending: toastMessages.SEND_MESSAGE_LOADING,
          error: toastMessages.SEND_MESSAGE_ERROR,
        },
        { position: 'top-center' }
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.messageForm}>
      <p className={styles.formDescription}>(๑˃̵ᴗ˂̵)و 有想法？可以联系作者！</p>

      <Form.Group controlId="formName">
        <Form.Control
          type="text"
          name="name"
          placeholder="您的姓名"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleChange}
          isInvalid={!!errors.name}
          className={styles.formInput}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Control
          type="email"
          name="email"
          placeholder="您的邮箱"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleChange}
          isInvalid={!!errors.email}
          className={styles.formInput}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Control
          as="textarea"
          name="message"
          placeholder="留言内容"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleChange}
          isInvalid={!!errors.message}
          className={styles.textArea}
        />
        <Form.Control.Feedback type="invalid">
          {errors.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className={styles.submitButton}
        disabled={!!Object.values(errors).filter(Boolean).length}
      >
        提交
      </Button>
    </Form>
  );
};

export default MessageForm;
