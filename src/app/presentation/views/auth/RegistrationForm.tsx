import { useRegisterMutation } from '@/app/data/source/api';
import { Card, Form, Input, Button, Skeleton, notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [notify, contextHolder] = notification.useNotification();
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegistration = async (values: any) => {
    const { username, email, password } = values;
    try {
      await register({ username, email, password }).unwrap();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const openNotification = useCallback(
    (level: keyof NotificationInstance, message?: string) => {
      notify[level]({
        message,
        placement: 'top',
      });
    },
    [notify],
  );

  const isErrors = (obj: any): obj is { errors: string[] } => {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'errors' in obj &&
      Array.isArray(obj.errors)
    );
  };

  useEffect(() => {
    if (error && 'data' in error && isErrors(error.data)) {
      error.data.errors.map((err) => openNotification('error', err));
    }
  }, [error, openNotification]);

  const formSkeleton = (
    <Form layout='vertical'>
      <Form.Item label={<Skeleton.Input size='small' active />}>
        <Skeleton.Input active block />
      </Form.Item>
      <Form.Item label={<Skeleton.Input size='small' active />}>
        <Skeleton.Input active block />
      </Form.Item>
      <Form.Item label={<Skeleton.Input size='small' active />}>
        <Skeleton.Input active block />
      </Form.Item>
      <Form.Item label={<Skeleton.Input size='small' active />}>
        <Skeleton.Input active block />
      </Form.Item>
      <Form.Item>
        <Skeleton.Button active />
        <Skeleton.Button active style={{ marginLeft: '1em' }} />
      </Form.Item>
    </Form>
  );

  const registrationForm = (
    <Form
      name='registration-form'
      form={form}
      layout='vertical'
      onFinish={(values) => handleRegistration(values)}
      onFinishFailed={(errorInfo) => console.log(errorInfo)}
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type='email' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters long' },
          {
            pattern: /[A-Z]/,
            message: 'Password must contain at least 1 uppercase letter',
          },
          {
            pattern: /[0-9]/,
            message: 'Password must contain at least 1 digit',
          },
          {
            pattern: /[!@#$%^&*]/,
            message: 'Password must contain at least 1 special character',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label='Confirm Password'
        name='confirmPassword'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two passwords that you entered do not match!',
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ marginTop: '3em' }}>
        <Button type='primary' htmlType='submit'>
          Sign Up
        </Button>
        <Button
          type='ghost'
          htmlType='button'
          style={{ marginLeft: '1em' }}
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      {contextHolder}
      <Card title='Registration'>
        {isLoading ? formSkeleton : registrationForm}
      </Card>
    </>
  );
};

export default RegistrationForm;
