import { RootState } from '@/app/data/store';
import { setSavedCalendars } from '@/app/data/store/calendarsSlice';
import { SavedCalendarMenuItemLabel } from '@/app/presentation/views/calendars/CalendarMenuItem/SavedCalendarMenuItem';
import { Calendar } from '@/types/calendars';
import { getItem, MenuItem } from '@/utils/menu-item';
import { CalendarFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SavedCalendarsMenuProps {
  title: string;
  defaultChecked?: boolean;
  calendars?: Calendar[];
  collapsed?: boolean;
}

export const SavedCalendarsMenu = ({
  title,
  calendars,
  defaultChecked = false,
  collapsed,
}: SavedCalendarsMenuProps) => {
  const dispatch = useDispatch();
  const selectedSavedCalendars = useSelector(
    (state: RootState) => state.calendarState.savedCalendars,
    (prev, next) => _.isEqual(prev, next),
  );

  useEffect(() => {
    if (calendars) {
      dispatch(
        setSavedCalendars({ calendars: calendars, checked: defaultChecked }),
      );
    }
    console.log('selectedSavedCalendars', selectedSavedCalendars);
  }, [calendars, defaultChecked, dispatch, selectedSavedCalendars]);

  const savedCalendarsChildren = Object.entries(selectedSavedCalendars)?.map(
    ([id, calendar]) =>
      getItem(
        <SavedCalendarMenuItemLabel
          calendar={calendar}
          checked={calendar.selected}
          collapsed={collapsed}
          onRemove={() => {}}
          onSelectChange={(id) => {}}
        />,
        id,
        undefined,
        undefined,
        'group',
      ),
  );

  const savedCalendarsMenuItems: MenuItem[] = [
    getItem(
      title,
      _.kebabCase(title),
      <CalendarFilled />,
      savedCalendarsChildren.length > 0
        ? savedCalendarsChildren
        : [getItem('No calendars', 'no-calendars')],
    ),
  ];

  return (
    <>
      <Menu
        style={{ borderStyle: 'none' }}
        defaultOpenKeys={['saved-calendars']}
        mode='inline'
        items={savedCalendarsMenuItems}
        selectedKeys={[]}
      />
    </>
  );
};
