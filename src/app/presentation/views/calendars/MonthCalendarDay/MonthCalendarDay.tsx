import useElementSize from '@/hooks/use-element-size';
import { CalendarEvent } from '@/types/events';
import { Button, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import classes from './MonthCalendarDay.module.css';

export interface MonthCalendarDayProps {
  day: { date: Date; inMonth: boolean; isToday: boolean };
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDayClick?: (day: Date) => void;
}

export const MonthCalendarDay = (props: MonthCalendarDayProps) => {
  const { day, events, onEventClick = () => {}, onDayClick = () => {} } = props;
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
    <Card
      onClick={onDayClick.bind(null, date)}
      ref={dayCardRef}
      key={date.toDateString()}
      className={classes.day}
    >
      <div className={classes['day-number']}>{date.getDate()}</div>
      <div className={classes['day-events']}>
        {eventsPerDay > 0 &&
          events.slice(0, eventsPerDay).map((event) => (
            <Button
              type='ghost'
              ref={eventDivRef}
              key={event.id}
              className={classes.event}
              onClick={onEventClick.bind(null, event)}
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
