import { CalendarFilled } from '@ant-design/icons';
import { Row, Space } from 'antd';

const Logo = () => {
  return (
    <Space direction='horizontal' size='large'>
      <CalendarFilled style={{ fontSize: '2.5rem', padding: '1rem 0' }} />
      <h1>Calendar</h1>
    </Space>
  );
};

export default Logo;
