import { getCalendar } from '@/utils/calendar';
import { Card } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { CalendarEntity } from '@/types/events';
import { MonthCalendarDay } from '../MonthCalendarDay/MonthCalendarDay';
import CalendarEntityModal from '../../events/CalendarEntity/CalendarEntityModal';
import classes from './MonthCalendar.module.css';
import {
  useGetEventsQuery,
  useGetTasksQuery,
  usePostEventMutation,
  usePostTaskMutation,
} from '@/app/data/source/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/data/store';
import type { Moment } from 'moment';
import moment from 'moment';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthCalendar = () => {
  const selectedCalendars = useSelector(
    (state: RootState) => state.calendarState.calendars,
  );
  const selectedDate = useSelector(
    (state: RootState) => state.calendarState.selectedDate,
    (prev, next) => moment(prev).isSame(next, 'day'),
  );
  const [selectedEntity, setSelectedEntity] = useState<CalendarEntity>();
  const { data: events } = useGetEventsQuery();
  const { data: tasks } = useGetTasksQuery();
  const [postEvent] = usePostEventMutation();
  const [postTask] = usePostTaskMutation();

  const { dates, weeks } = useMemo(
    () => getCalendar(moment(selectedDate).local()),
    [selectedDate],
  );

  const entitiesFilter = useCallback(
    (day: Moment) =>
      [...(events ?? []), ...(tasks ?? [])]
        ?.map((event) => ({
          ...event,
          startDate: moment.utc(event.startDate).local(),
          endDate: moment.utc(event.endDate).local(),
        }))
        .filter((event) => {
          const calendar = selectedCalendars[event.calendarId];
          return calendar?.selected ?? false;
        })
        .filter((event) => moment(event.startDate).isSame(day, 'day')) ?? [],
    [events, selectedCalendars, tasks],
  );

  const handleEntitySave = (entity: CalendarEntity) => {
    setSelectedEntity(undefined);
    if (entity.type === 'event') {
      const { type, id, ...event } = entity;
      postEvent({
        ...event,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate!.toISOString(),
      });
    } else {
      const { type, id, ...task } = entity;
      postTask({
        ...task,
        startDate: task.startDate.toISOString(),
      });
    }
  };

  return (
    <>
      <div
        style={{ gridTemplateRows: `2.5rem repeat(${weeks}, 1fr)` }}
        className={classes.grid}
      >
        {weekDays.map((weekDay) => (
          <Card key={weekDay} className={classes['week-day']}>
            <div>{weekDay}</div>
          </Card>
        ))}
        {dates.map((day) => (
          <MonthCalendarDay
            key={day.date.toISOString()}
            day={day}
            entities={entitiesFilter(day.date)}
            onEntityClick={(entity) => {
              setSelectedEntity(entity);
            }}
            onDayClick={(date) => {
              setSelectedEntity({
                id: undefined,
                title: '',
                type: 'event',
                startDate: moment(date),
                endDate: moment(date).add(1, 'hour'),
                description: '',
              } as CalendarEntity);
            }}
          />
        ))}
      </div>
      <CalendarEntityModal
        entity={selectedEntity}
        isOpen={!!selectedEntity}
        onClose={() => setSelectedEntity(undefined)}
        onSave={(entity) => handleEntitySave(entity)}
      />
    </>
  );
};

export default MonthCalendar;
