import SiderCalendar from '@/app/presentation/views/calendars/SiderCalendar/SiderCalendar';
import CalendarEntityModal from '@/app/presentation/views/events/CalendarEntity/CalendarEntityModal';
import { CalendarEntity } from '@/types/events';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Menu } from 'antd';
import { useState } from 'react';
import {
  useGetCalendarsQuery,
  usePostEventMutation,
  usePostTaskMutation,
} from '@/app/data/source/api';
import classes from './SiderContent.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/data/store';
import { getItem, MenuItem } from '@/utils/menu-item';
import { MyCalendarsMenu } from '@/app/presentation/views/calendars/MyCalendarsMenu/MyCalendarsMenu';
import moment from 'moment';
import { CalendarSearch } from '@/app/presentation/views/calendars/CalendarSearch/CalendarSearch';
import { SavedCalendarsMenu } from '@/app/presentation/views/calendars/SavedCalendarsMenu/SavedCalendarsMenu';

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

interface SiderContentProps {
  collapsed: boolean;
}

const SiderContent = ({ collapsed }: SiderContentProps) => {
  const today = moment();
  const username = useSelector(
    (state: RootState) => state.userState.user.unique_name,
  );

  const { data: appUserCalendars } = useGetCalendarsQuery({ username });
  const { data: savedCalendars } = useGetCalendarsQuery({
    username,
    saved: true,
  });
  const [postEvent] = usePostEventMutation();
  const [postTask] = usePostTaskMutation();

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemKey>();
  const [initialEvent, setInitialEvent] = useState<CalendarEntity>({
    id: undefined,
    type: 'event',
    title: '',
    description: '',
    startDate: moment(today, 'YYYY-MM-DD'),
  });

  const handleAddEvent = () => {
    setInitialEvent((prev) => ({
      ...prev,
      type: 'event',
      endDate: moment(today, 'YYYY-MM-DD').add(1, 'hour'),
    }));
    setSelectedMenuItem(MenuItemKey.ADD_EVENT);
  };

  const handleAddTask = () => {
    setInitialEvent((prev) => ({
      ...prev,
      type: 'task',
      endDate: undefined,
    }));
    setSelectedMenuItem(MenuItemKey.ADD_TASK);
  };

  const handleEntitySave = (entity: CalendarEntity) => {
    if (entity.type === 'event') {
      const { type, id, ...event } = entity;
      postEvent({
        ...event,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate!.toISOString(),
      });
    }
    if (entity.type === 'task') {
      const { type, id, ...task } = entity;
      postTask({
        ...task,
        startDate: task.startDate.toISOString(),
      });
    }
    setSelectedMenuItem(undefined);
  };

  return (
    <>
      <Col className={classes.menu}>
        <Menu
          style={{ borderStyle: 'none' }}
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
        {collapsed || <CalendarSearch />}
        <MyCalendarsMenu
          title='My calendars'
          calendars={appUserCalendars}
          collapsed={collapsed}
          defaultChecked
        />
        <SavedCalendarsMenu
          title='Saved calendars'
          calendars={savedCalendars}
          collapsed={collapsed}
          defaultChecked={false}
        />
      </Col>
      <CalendarEntityModal
        entity={initialEvent}
        isOpen={
          selectedMenuItem === MenuItemKey.ADD_EVENT ||
          selectedMenuItem === MenuItemKey.ADD_TASK
        }
        onClose={() => setSelectedMenuItem(undefined)}
        onSave={(entity) => handleEntitySave(entity)}
      />
    </>
  );
};

export default SiderContent;
