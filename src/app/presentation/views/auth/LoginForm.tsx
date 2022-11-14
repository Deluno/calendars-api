import { Card, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Card title='Login'>
      <Form
        name='login-form'
        form={form}
        layout='vertical'
        onFinish={(values) => navigate('/dashboard')}
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
    </Card>
  );
};

export default LoginForm;
