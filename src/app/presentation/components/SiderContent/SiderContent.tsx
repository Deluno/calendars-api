import SiderCalendar from '@/app/presentation/views/calendars/SiderCalendar/SiderCalendar';
import CalendarEntityModal from '@/app/presentation/views/events/CalendarEntity/CalendarEntityModal';
import { CalendarEntity } from '@/types/events';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Menu } from 'antd';
import { useEffect, useState } from 'react';
import {
  useGetCalendarsQuery,
  usePostEventMutation,
  usePostTaskMutation,
} from '@/app/data/source/api';
import classes from './SiderContent.module.css';
import { getItem, MenuItem } from '@/utils/menu-item';
import { MyCalendarsMenu } from '@/app/presentation/views/calendars/MyCalendarsMenu/MyCalendarsMenu';
import moment from 'moment';
import { CalendarSearch } from '@/app/presentation/views/calendars/CalendarSearch/CalendarSearch';
import { SavedCalendarsMenu } from '@/app/presentation/views/calendars/SavedCalendarsMenu/SavedCalendarsMenu';
import {
  resetCalendars,
  setCalendars,
  setSavedCalendars,
} from '@/app/data/store/calendarsSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const { data: appUserCalendars } = useGetCalendarsQuery({});
  const { data: savedCalendars } = useGetCalendarsQuery({ saved: true });
  const [postEvent] = usePostEventMutation();
  const [postTask] = usePostTaskMutation();

  useEffect(() => {
    dispatch(resetCalendars());
    if (appUserCalendars) {
      dispatch(setCalendars({ calendars: appUserCalendars, checked: true }));
    }
    if (savedCalendars) {
      dispatch(
        setSavedCalendars({ calendars: savedCalendars, checked: false }),
      );
    }
  }, [appUserCalendars, savedCalendars, dispatch]);

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
        <MyCalendarsMenu title='My calendars' collapsed={collapsed} />
        <SavedCalendarsMenu title='Saved calendars' collapsed={collapsed} />
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
