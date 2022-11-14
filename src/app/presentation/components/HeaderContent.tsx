import { Col } from 'antd';
import Logo from './Logo';

const HeaderContent = () => {
  return (
    <Col span={18} offset={3}>
      <Logo />
    </Col>
  );
};

export default HeaderContent;
