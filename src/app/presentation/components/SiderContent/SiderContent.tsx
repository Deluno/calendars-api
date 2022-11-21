import SiderCalendar from '@/app/presentation/views/calendars/SiderCalendar/SiderCalendar';
import EventModal from '@/app/presentation/views/events/EventModal/EventModal';
import { CalendarEvent } from '@/types/events';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Menu, MenuProps } from 'antd';
import { useState } from 'react';
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

enum MenuItemKey {
  ADD_EVENT = 'add-event',
  ADD_TASK = 'add-task',
}

const createMenuItems: MenuItem[] = [
  getItem('Create', 'create', <PlusOutlined />, [
    getItem('New event', MenuItemKey.ADD_EVENT),
    getItem('New task', MenuItemKey.ADD_TASK),
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
  const today = new Date();

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemKey>();
  const [initialEvent, setInitialEvent] = useState<CalendarEvent>({
    id: '',
    type: 'event',
    title: '',
    description: '',
    dateStart: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  });

  const handleAddEvent = () => {
    setInitialEvent((prev) => ({
      ...prev,
      type: 'event',
      dateEnd: new Date(prev.dateStart.getTime() + 3600000),
    }));
    setSelectedMenuItem(MenuItemKey.ADD_EVENT);
  };

  const handleAddTask = () => {
    setInitialEvent((prev) => ({
      ...prev,
      type: 'task',
      dateEnd: undefined,
    }));
    setSelectedMenuItem(MenuItemKey.ADD_TASK);
  };

  return (
    <>
      <Col className={classes.menu}>
        <Menu
          className={classes['menu-item']}
          mode='inline'
          items={createMenuItems}
          selectedKeys={['']}
          onSelect={(a) => {
            switch (a.key) {
              case MenuItemKey.ADD_EVENT:
                handleAddEvent();
                break;
              case MenuItemKey.ADD_TASK:
                handleAddTask();
                break;
            }
          }}
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
      <EventModal
        event={initialEvent}
        isOpen={!!selectedMenuItem}
        onClose={() => setSelectedMenuItem(undefined)}
        onEventSave={(event) => console.log(event)}
      />
    </>
  );
};

export default SiderContent;
