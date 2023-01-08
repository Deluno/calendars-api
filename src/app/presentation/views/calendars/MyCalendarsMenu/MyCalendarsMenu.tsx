import _ from 'lodash';
import {
  useDeleteCalendarMutation,
  usePostCalendarMutation,
} from '@/app/data/source/api';
import { RootState } from '@/app/data/store';
import { CalendarMenuItemLabel } from '@/app/presentation/views/calendars/CalendarMenuItem/CalendarMenuItem';
import { CalendarModal } from '@/app/presentation/views/calendars/CalendarModal/CalendarModal';
import type { Calendar } from '@/types/calendars';
import { getItem, MenuItem } from '@/utils/menu-item';
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendars, toggleCalendar } from '@/app/data/store/calendarsSlice';

enum MenuItemKey {
  ADD_CALENDAR = 'add-calendar',
  EDIT_CALENDAR = 'edit-calendar',
}

interface MyCalendarsMenuProps {
  title: string;
  defaultChecked?: boolean;
  calendars?: Calendar[];
  collapsed?: boolean;
}

export const MyCalendarsMenu = ({
  title,
  calendars,
  defaultChecked = false,
  collapsed,
}: MyCalendarsMenuProps) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userState.user.sub);
  const selectedCalendars = useSelector(
    (state: RootState) => state.calendarState.calendars,
    (prev, next) => _.isEqual(prev, next),
  );

  const [postCalendar] = usePostCalendarMutation();
  const [deleteCalendar] = useDeleteCalendarMutation();

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemKey>();
  const [initialCalendar, setInitialCalendar] = useState<Calendar>({
    id: undefined,
    name: '',
    isPublic: false,
  });

  useEffect(() => {
    if (calendars) {
      dispatch(setCalendars({ calendars: calendars, checked: defaultChecked }));
    }
  }, [calendars, defaultChecked, dispatch]);

  const handleAddCalendar = () => {
    setInitialCalendar({
      id: undefined,
      name: '',
      isPublic: false,
    });
    setSelectedMenuItem(MenuItemKey.ADD_CALENDAR);
  };

  const handleEditCalendar = (calendar: Calendar) => {
    setInitialCalendar(calendar);
    setSelectedMenuItem(MenuItemKey.EDIT_CALENDAR);
  };

  const handleCalendarDelete = (calendar: Calendar) => {
    deleteCalendar(calendar.id!);
  };

  const handleCalendarSave = (calendar: Calendar) => {
    if (!calendar.id) {
      postCalendar({ ...calendar, ownerId: userId });
    }
    setSelectedMenuItem(undefined);
  };

  const myCalendarsMenuItems: MenuItem[] = [
    getItem(title, _.kebabCase(title), <CalendarOutlined />, [
      getItem(
        <Button block onClick={handleAddCalendar} type='text'>
          Create new calendar
        </Button>,
        MenuItemKey.ADD_CALENDAR,
        undefined,
        undefined,
        'group',
      ),
      ...(Object.entries(selectedCalendars ?? [])?.map(([id, calendar]) =>
        getItem(
          <CalendarMenuItemLabel
            calendar={calendar}
            checked={calendar.selected}
            collapsed={collapsed}
            onEdit={handleEditCalendar}
            onDelete={handleCalendarDelete}
            onSelectChange={(id) => {
              dispatch(toggleCalendar(id));
            }}
          />,
          id,
          undefined,
          undefined,
          'group',
        ),
      ) ?? []),
    ]),
  ];

  return (
    <>
      <Menu
        style={{ borderStyle: 'none' }}
        defaultOpenKeys={['my-calendars']}
        mode='inline'
        items={myCalendarsMenuItems}
        selectedKeys={['']}
      />
      <CalendarModal
        calendar={initialCalendar}
        isOpen={
          selectedMenuItem === MenuItemKey.ADD_CALENDAR ||
          selectedMenuItem === MenuItemKey.EDIT_CALENDAR
        }
        onClose={() => setSelectedMenuItem(undefined)}
        onCalendarSave={(calendar) => handleCalendarSave(calendar)}
      />
    </>
  );
};
