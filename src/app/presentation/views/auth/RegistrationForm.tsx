import { Card, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Card title='Registration'>
      <Form
        name='registration-form'
        form={form}
        layout='vertical'
        onFinish={(values) => console.log(values)}
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
        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Please confirm your password!' }]}
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
    </Card>
  );
};

export default RegistrationForm;
