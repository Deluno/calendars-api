import {
  useGetUsersWithCalendarsQuery,
  useSubscribeToCalendarMutation,
} from '@/app/data/source/api';
import { RootState } from '@/app/data/store';
import { CalendarFilled, SaveOutlined } from '@ant-design/icons';
import { Button, Cascader, Space } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const CalendarSearch = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.userState.user.sub,
  );
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const { data: users } = useGetUsersWithCalendarsQuery(searchedUser);
  const [subscribeToCalendar] = useSubscribeToCalendarMutation();

  const handleSaveCalendar = useCallback(
    (calendarId: number) => {
      subscribeToCalendar(calendarId);
    },
    [subscribeToCalendar],
  );

  useEffect(() => {
    setOptions(
      users
        ?.filter((user) => user.id !== +currentUserId!)
        ?.map((user) => ({
          value: user.userName,
          label: `User: ${user.userName}`,
          children: user.userCalendars.map((calendar) => ({
            value: calendar.id,
            label: (
              <>
                Calendar: {calendar.name}
                <Button
                  type='link'
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleSaveCalendar(calendar.id!);
                  }}
                >
                  <SaveOutlined />
                </Button>
              </>
            ),
          })),
        })) ?? [],
    );
  }, [currentUserId, handleSaveCalendar, users]);

  const handleSearch = (value: string) => {
    if (value.length >= 3) setSearchedUser(value);
    else setOptions([]);
  };

  return (
    <Cascader
      size='large'
      style={{ width: '100%', padding: '0.2rem 0.5rem' }}
      options={options}
      expandTrigger='hover'
      showSearch
      multiple
      maxTagCount={2}
      showCheckedStrategy='SHOW_PARENT'
      onSearch={handleSearch}
      placeholder={
        <Space>
          <CalendarFilled />
          Search for user calendars
        </Space>
      }
    />
  );
};
