import { getCalendar } from '@/utils/calendar';
import { Card } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { CalendarEntity } from '@/types/events';
import { MonthCalendarDay } from '../MonthCalendarDay/MonthCalendarDay';
import CalendarEntityModal from '../../events/CalendarEntity/CalendarEntityModal';
import classes from './MonthCalendar.module.css';
import {
  useDeleteEventMutation,
  useDeleteTaskMutation,
  useGetEventsQuery,
  useGetTasksQuery,
  usePostEventMutation,
  usePostTaskMutation,
  usePutEventMutation,
  usePutTaskMutation,
} from '@/app/data/source/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/data/store';
import type { Moment } from 'moment';
import moment from 'moment';
import { CalendarDayDetailsModal } from '@/app/presentation/views/calendars/CalendarDayDetailsModal/CalendarDayDetailsModal';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthCalendar = () => {
  const selectedCalendars = useSelector(
    (state: RootState) => state.calendarState.calendars,
  );
  const globalDate = useSelector(
    (state: RootState) => state.calendarState.selectedDate,
    (prev, next) => moment(prev).isSame(next, 'day'),
  );
  const [selectedEntity, setSelectedEntity] = useState<CalendarEntity>();
  const [selectedDay, setSelectedDay] = useState<Moment>();
  const { data: events } = useGetEventsQuery();
  const { data: tasks } = useGetTasksQuery();

  const [postEvent] = usePostEventMutation();
  const [putEvent] = usePutEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [postTask] = usePostTaskMutation();
  const [putTask] = usePutTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { dates, weeks } = useMemo(
    () => getCalendar(moment(globalDate).local()),
    [globalDate],
  );

  const signedUserCalendarsIds = useMemo(
    () =>
      Object.entries(selectedCalendars)
        .filter(([, calendar]) => !calendar.saved)
        .reduce((acc, [id]) => [...acc, +id], [] as number[]),
    [selectedCalendars],
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
    if (entity.type === 'event') {
      const { type, id, ...event } = entity;
      const body = {
        ...event,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate!.toISOString(),
      };
      if (id) {
        putEvent({ id, ...body });
      } else {
        postEvent(body);
      }
    } else {
      const { type, id, ...task } = entity;
      const body = {
        ...task,
        startDate: task.startDate.toISOString(),
      };
      if (id) {
        putTask({ id, ...body });
      } else {
        postTask(body);
      }
    }
  };

  const handleEntityDelete = (entity: CalendarEntity) => {
    if (entity.type === 'event') {
      deleteEvent(entity.id!);
    } else {
      deleteTask(entity.id!);
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
            onMoreClick={(date) => {
              setSelectedDay(date);
            }}
          />
        ))}
      </div>
      <CalendarDayDetailsModal
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(undefined)}
        date={selectedDay!}
        entities={entitiesFilter(selectedDay!)}
        onEntityClick={(entity) => {
          setSelectedEntity(entity);
        }}
      />
      <CalendarEntityModal
        entity={selectedEntity}
        isOpen={!!selectedEntity}
        onClose={() => setSelectedEntity(undefined)}
        onSave={(entity) => {
          setSelectedEntity(undefined);
          handleEntitySave(entity);
        }}
        onDelete={(entity) => {
          setSelectedEntity(undefined);
          handleEntityDelete(entity);
        }}
        showDelete={
          !!selectedEntity?.id &&
          selectedEntity.calendarId !== undefined &&
          signedUserCalendarsIds.find(
            (id) => id === selectedEntity.calendarId,
          ) !== undefined
        }
      />
    </>
  );
};

export default MonthCalendar;
