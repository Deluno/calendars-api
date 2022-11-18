import SiderCalendar from '@/app/presentation/views/calendars/SiderCalendar/SiderCalendar';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Menu, MenuProps } from 'antd';
import classes from './SiderContent.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const createMenuItems: MenuItem[] = [
  getItem('Create', 'create', <PlusOutlined />, [
    getItem('New event', 'add-event'),
    getItem('New task', 'add-task'),
  ]),
];

const myCalendarsMenuItems: MenuItem[] = [
  getItem('My calendars', 'my-calendars', <CalendarOutlined />, [
    getItem(
      <Checkbox>Calendar 1</Checkbox>,
      'calendar-1',
      undefined,
      undefined,
      'group',
    ),
    getItem(
      <Checkbox>Calendar 2</Checkbox>,
      'calendar-2',
      undefined,
      undefined,
      'group',
    ),
    getItem(
      <Checkbox>Calendar 3</Checkbox>,
      'calendar-3',
      undefined,
      undefined,
      'group',
    ),
  ]),
];

interface SiderContentProps {
  collapsed: boolean;
}

const SiderContent = (props: SiderContentProps) => {
  const { collapsed } = props;

  return (
    <Col className={classes.menu}>
      <Menu
        className={classes['menu-item']}
        mode='inline'
        items={createMenuItems}
        selectedKeys={['']}
      />
      {collapsed || <SiderCalendar />}
      <Menu
        className={classes['menu-item']}
        defaultOpenKeys={['my-calendars']}
        mode='inline'
        items={myCalendarsMenuItems}
        selectedKeys={['']}
      />
    </Col>
  );
};

export default SiderContent;
