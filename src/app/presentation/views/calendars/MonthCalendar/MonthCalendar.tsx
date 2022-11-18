import useElementSize from '@/hooks/use-element-size';
import { getCalendar } from '@/utils/calendar';
import { Button, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import classes from './MonthCalendar.module.css';

const events = [
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    title: 'Event 1',
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    title: 'Event 4',
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    title: 'Event 5',
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    title: 'Event 6',
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
    title: 'Event 2',
  },
  {
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
    title: 'Event 3',
  },
];

interface MonthCalendarDayProps {
  day: { date: Date; inMonth: boolean; isToday: boolean };
  events: { date: Date; title: string }[];
}

const MonthCalendarDay = (props: MonthCalendarDayProps) => {
  const { day, events } = props;
  const { date } = day;

  const dayCardRef = useRef<HTMLDivElement>(null);
  const eventDivRef = useRef<HTMLDivElement>(null);
  const [eventsPerDay, setEventsPerDay] = useState(1);
  const { height: dayCardHeight } = useElementSize(dayCardRef);
  const { height: eventDivHeight } = useElementSize(eventDivRef);

  useEffect(() => {
    if (dayCardHeight <= 0 || eventDivHeight <= 0) return;
    const eventsInDiv = Math.floor(dayCardHeight / eventDivHeight);
    setEventsPerDay(
      events.length >= eventsInDiv ? eventsInDiv - 2 : events.length,
    );
  }, [dayCardHeight, eventDivHeight, events.length]);

  return (
    <Card ref={dayCardRef} key={date.toDateString()} className={classes.day}>
      <div className={classes['day-number']}>{date.getDate()}</div>
      <div className={classes['day-events']}>
        {eventsPerDay > 0 &&
          events.slice(0, eventsPerDay).map((event) => (
            <Button
              type='ghost'
              ref={eventDivRef}
              key={event.title}
              className={classes.event}
            >
              {event.title}
            </Button>
          ))}
        {events.length > eventsPerDay && eventsPerDay >= 0 && (
          <Button type='link'>+{events.length - eventsPerDay} more</Button>
        )}
      </div>
    </Card>
  );
};

const MonthCalendar = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const dates = getCalendar(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
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
            (event) => event.date.toISOString() === item.date.toISOString(),
          )}
        />
      ))}
    </div>
  );
};

export default MonthCalendar;
