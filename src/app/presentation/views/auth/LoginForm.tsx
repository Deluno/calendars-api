import { useLoginMutation } from '@/app/data/source/api';
import { setUser } from '@/app/data/store/userSlice';
import { LocalStorageKeys } from '@/types/common';
import { Card, Form, Input, Button, Skeleton } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    const { username, password } = values;
    try {
      const payload = await login({ username, password }).unwrap();
      dispatch(setUser(payload));
      navigate('/dashboard');

      localStorage.setItem(LocalStorageKeys.Token, payload.token);
      localStorage.setItem(LocalStorageKeys.Expires, payload.expires);
    } catch (error) {
      console.log(error);
    }
  };

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

  return <Card title='Login'>{isLoading ? formSkeleton : loginForm}</Card>;
};

export default LoginForm;
