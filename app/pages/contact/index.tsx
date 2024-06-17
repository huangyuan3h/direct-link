'use client';

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styles from './contact.module.scss';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import APIClient from '@/utils/apiClient';
import { toastMessages } from '@/utils/toastMessage';
import { routes } from '@/config/routes';

type fieldNameType = 'subject' | 'content' | 'email';

const Contact: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key in fieldNameType]: string }>({
    subject: '',
    content: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    subject: '',
    content: '',
    email: '',
  });

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'subject':
        if (value.length < 6 || value.length > 50) {
          return '主题长度必须在 6 到 50 个字符之间';
        }
        break;
      case 'content':
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
      const { subject, content, email } = formData;

      const sendMessage = async () => {
        try {
          const client = new APIClient();

          const response = await client.post('message/send', {
            subject,
            content,
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  return (
    <section className={styles.contactSection}>
      <Container className={styles.contactContainer}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className={styles.contactTitle}>联系我们</h2>
            <p className={styles.contactDescription}>
              我们重视您的反馈！如果您有任何问题、建议或合作意向，请随时通过以下表格与我们联系。
              <br />
              <span className={styles.highlight}>
                我们期待倾听您的声音，并尽力在 24 小时内回复您。
              </span>
            </p>
            <Form onSubmit={handleSubmit} className={styles.contactForm}>
              <Form.Group controlId="formSubject" className="mt-2">
                <Form.Label>主题:</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="请输入主题"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleChange}
                  isInvalid={!!errors.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formContent" className="mt-2">
                <Form.Label>内容:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  placeholder="请输入内容"
                  value={formData.content}
                  onChange={handleChange}
                  onBlur={handleChange}
                  isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-2">
                <Form.Label>邮箱:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="请输入您的邮箱"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={clsx(styles.submitButton, 'mt-4')}
                disabled={!!Object.values(errors).filter(Boolean).length}
              >
                提交
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
