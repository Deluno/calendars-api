import { useLoginMutation } from '@/app/data/source/api';
import { setToken, setUser } from '@/app/data/store/userSlice';
import { LocalStorageKeys } from '@/types/common';
import { decodeToken } from '@/utils/token';
import { Card, Form, Input, Button, Skeleton, notification } from 'antd';
import { NotificationInstance } from 'antd/lib/notification';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [notify, contextHolder] = notification.useNotification();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    const { username, password } = values;
    try {
      const payload = await login({ username, password }).unwrap();
      dispatch(setToken(payload));
      const user = decodeToken(payload.token);
      dispatch(setUser(user));

      navigate('/dashboard');

      localStorage.setItem(LocalStorageKeys.Token, payload.token);
      localStorage.setItem(LocalStorageKeys.Expires, payload.expires);
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

  useEffect(() => {
    if (error) {
      openNotification('error', 'Invalid username or password');
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
      <Form.Item>
        <Skeleton.Button active />
        <Skeleton.Button active style={{ marginLeft: '1em' }} />
      </Form.Item>
    </Form>
  );

  const loginForm = (
    <Form
      name='login-form'
      form={form}
      layout='vertical'
      onFinish={(values) => handleLogin(values)}
      onFinishFailed={(errorInfo) => {}}
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ marginTop: '3em' }}>
        <Button type='primary' htmlType='submit'>
          Log In
        </Button>
        <Button
          type='ghost'
          htmlType='button'
          style={{ marginLeft: '1em' }}
          onClick={() => navigate('/register')}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      {contextHolder}
      <Card title='Login'>{isLoading ? formSkeleton : loginForm}</Card>
    </>
  );
};

export default LoginForm;
