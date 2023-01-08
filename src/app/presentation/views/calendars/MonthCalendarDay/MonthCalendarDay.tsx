import { CalendarEntity } from '@/types/events';
import { blue } from '@ant-design/colors';
import { Button, Card } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import classes from './MonthCalendarDay.module.css';

export interface MonthCalendarDayProps {
  day: { date: Moment; inMonth: boolean; isToday: boolean };
  entities: CalendarEntity[];
  onEntityClick?: (event: CalendarEntity) => void;
  onDayClick?: (day: Moment) => void;
}

export const MonthCalendarDay = (props: MonthCalendarDayProps) => {
  const {
    day,
    entities,
    onEntityClick = () => {},
    onDayClick = () => {},
  } = props;
  const { date } = day;

  const { height: dayCardHeight, ref: dayCardRef } = useResizeDetector();
  const [eventsPerDay, setEventsPerDay] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const eventDivHeight = 25;

  useEffect(() => {
    if (!dayCardHeight) return;
    const eventsInDiv = Math.floor(dayCardHeight / (eventDivHeight + 4));
    const epd =
      entities.length >= eventsInDiv ? eventsInDiv - 2 : entities.length;
    setEventsPerDay(epd);
    setShowMore(entities.length > epd && epd >= 0);
  }, [dayCardHeight, entities.length]);

  // const handleMoreClick = () => {};

  return (
    <Card
      onClick={onDayClick.bind(null, date)}
      ref={dayCardRef}
      key={date.toISOString()}
      className={classes.day}
    >
      <div className={classes['day-number-container']}>
        <div
          className={classes['day-number']}
          style={{
            color: day.inMonth ? '' : 'gray',
            backgroundColor: day.isToday ? blue.primary : '',
          }}
        >
          {date.format('D')}
        </div>
      </div>
      <div className={classes['day-events']}>
        {eventsPerDay > 0 &&
          entities.slice(0, eventsPerDay).map((event) => (
            <Button
              type='ghost'
              key={event.id}
              className={classes.event}
              style={{ height: eventDivHeight }}
              onClick={(e) => {
                e.stopPropagation();
                onEntityClick(event);
              }}
            >
              {event.title}
            </Button>
          ))}
        {showMore && (
          <Button type='link' onClick={() => {}}>
            +{entities.length - eventsPerDay} more
          </Button>
        )}
      </div>
    </Card>
  );
};
