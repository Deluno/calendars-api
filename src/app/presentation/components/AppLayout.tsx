import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import FooterContent from './FooterContent';
import HeaderContent from './HeaderContent';
import AnimatedBackground from './AnimatedBackground';

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegistrationPage = location.pathname === '/register';

  return (
    <>
      {(isLoginPage || isRegistrationPage) && <AnimatedBackground />}
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <HeaderContent />
        </Header>
        <Content>
          <Outlet />
        </Content>
        {(isLoginPage || isRegistrationPage) && (
          <Footer>
            <FooterContent />
          </Footer>
        )}
      </Layout>
    </>
  );
};

export default AppLayout;
