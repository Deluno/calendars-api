import { useUnsubscribeFromCalendarMutation } from '@/app/data/source/api';
import { RootState } from '@/app/data/store';
import { toggleCalendar } from '@/app/data/store/calendarsSlice';
import { SavedCalendarMenuItemLabel } from '@/app/presentation/views/calendars/CalendarMenuItem/SavedCalendarMenuItem';
import { Calendar } from '@/types/calendars';
import { getItem, MenuItem } from '@/utils/menu-item';
import { CalendarFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

interface SavedCalendarsMenuProps {
  title: string;
  collapsed?: boolean;
}

export const SavedCalendarsMenu = ({
  title,
  collapsed,
}: SavedCalendarsMenuProps) => {
  const dispatch = useDispatch();
  const selectedCalendars = useSelector(
    (state: RootState) => state.calendarState.calendars,
    (prev, next) => _.isEqual(prev, next),
  );
  const [unsubscribe] = useUnsubscribeFromCalendarMutation();

  const handleRemoveSavedCalendar = (calendar: Calendar) => {
    unsubscribe(calendar.id!);
  };

  const savedCalendarsChildren = Array.from(Object.values(selectedCalendars))
    .filter((c) => c.saved)
    .map((calendar) =>
      getItem(
        <SavedCalendarMenuItemLabel
          calendar={calendar}
          checked={calendar.selected}
          collapsed={collapsed}
          onRemove={handleRemoveSavedCalendar}
          onSelectChange={(id) => {
            dispatch(toggleCalendar(id));
          }}
        />,
        calendar.id!,
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
