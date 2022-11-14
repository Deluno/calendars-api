import { Col } from 'antd';
import LoginForm from '../views/auth/LoginForm';

const LoginPage = () => {
  return (
    <Col
      style={{ marginTop: '3em' }}
      xs={{ span: 22, offset: 1 }}
      sm={{ span: 20, offset: 2 }}
      md={{ span: 12, offset: 6 }}
      lg={{ span: 10, offset: 7 }}
      xl={{ span: 8, offset: 8 }}
    >
      <LoginForm />
    </Col>
  );
};

export default LoginPage;
