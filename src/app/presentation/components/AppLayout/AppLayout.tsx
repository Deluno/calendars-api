import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from 'antd';
import FooterContent from '../FooterContent';
import HeaderContent from '../HeaderContent';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';
import SiderContent from '../SiderContent/SiderContent';

import classes from './AppLayout.module.css';

const { Header, Footer, Content, Sider } = Layout;

const AppLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isLoginPage = location.pathname === '/login';
  const isRegistrationPage = location.pathname === '/register';

  const toggle = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <>
      {(isLoginPage || isRegistrationPage) && <AnimatedBackground />}
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={classes['app-header']}>
          <HeaderContent />
        </Header>
        <Layout>
          {isLoginPage || isRegistrationPage || (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={toggle}
              width={300}
            >
              <SiderContent collapsed={collapsed} />
            </Sider>
          )}
          <Content>
            <Outlet />
          </Content>
        </Layout>
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
