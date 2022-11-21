import { getCalendar } from '@/utils/calendar';
import { Card } from 'antd';
import { useState } from 'react';
import { CalendarEvent } from '@/types/events';
import { MonthCalendarDay } from '../MonthCalendarDay/MonthCalendarDay';
import EventModal from '../../events/EventModal/EventModal';
import classes from './MonthCalendar.module.css';

const events: CalendarEvent[] = [
  {
    id: '1',
    type: 'task',
    title: 'Task 1',
    description: 'Task 1 description',
    dateStart: new Date(2022, 10, 14),
  },
  {
    id: '2',
    type: 'event',
    title: 'Event 2',
    description: 'Event 2 description',
    dateStart: new Date(2022, 10, 14),
    dateEnd: new Date(2022, 10, 15),
  },
  {
    id: '3',
    type: 'task',
    title: 'Task 3',
    description: 'Task 3 description',
    dateStart: new Date(2022, 10, 15),
  },
];

export interface MonthCalendarDayProps {
  day: { date: Date; inMonth: boolean; isToday: boolean };
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const MonthCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>();

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
        {dates.map((item) => (
          <MonthCalendarDay
            key={item.date.toDateString()}
            day={item}
            events={events.filter(
              (event) =>
                event.dateStart.toISOString() === item.date.toISOString(),
            )}
            onEventClick={(event) => {
              setSelectedEvent(event);
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
