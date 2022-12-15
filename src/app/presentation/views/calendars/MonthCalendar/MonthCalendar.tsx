import { getCalendar } from '@/utils/calendar';
import { Card } from 'antd';
import { useState } from 'react';
import { CalendarEvent } from '@/types/events';
import { MonthCalendarDay } from '../MonthCalendarDay/MonthCalendarDay';
import EventModal from '../../events/EventModal/EventModal';
import classes from './MonthCalendar.module.css';
import { useGetEventsQuery } from '@/app/data/source/api';
import moment from 'moment';

const MonthCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>();
  const { data: events } = useGetEventsQuery();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const dates = getCalendar(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <>
      <div className={classes.grid}>
        {weekDays.map((weekDay) => (
          <Card key={weekDay} className={classes['week-day']}>
            <div>{weekDay}</div>
          </Card>
        ))}
        {dates.map((day) => (
          <MonthCalendarDay
            key={day.date.toDateString()}
            day={day}
            events={
              events?.filter((event) =>
                moment(event.dateStart).isSame(day.date, 'day'),
              ) ?? []
            }
            onEventClick={(event) => {
              setSelectedEvent(event);
            }}
            onDayClick={(date) => {
              setSelectedEvent({
                id: '',
                title: '',
                type: 'event',
                dateStart: date,
                dateEnd: moment(date).add(1, 'hour').toDate(),
                description: '',
              } as CalendarEvent);
            }}
          />
        ))}
      </div>
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEventSave={() => setSelectedEvent(null)}
      />
    </>
  );
};

export default MonthCalendar;
