import { RootState } from '@/app/data/store';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, Calendar, Col, Row } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './SiderCalendar.module.css';
import type { Moment } from 'moment';
import moment from 'moment';

const renderCustomCalendarHeader = (
  value: Moment,
  type: CalendarMode,
  onChange: (date: Moment) => void,
  onTypeChange: (type: CalendarMode) => void,
) => {
  return (
    <div className={classes['calendar-header-wrapper']}>
      <Row gutter={8}>
        <Col className={classes['calendar-header-title']}>
          {value.format('MMMM YYYY')}
        </Col>
        <Col>
          <Button
            onClick={() => {
              onChange(value.clone().subtract(1, 'month'));
            }}
          >
            <CaretLeftFilled />
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              onChange(value.clone().add(1, 'month'));
            }}
          >
            <CaretRightFilled />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const SiderCalendar = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendarState.selectedDate,
  );
  const [date, setDate] = useState(moment());

  useEffect(() => {
    setDate(moment(selectedDate).local());
  }, [selectedDate]);

  return (
    <Calendar
      className={classes.calendar}
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) =>
        renderCustomCalendarHeader(value, type, onChange, onTypeChange)
      }
      value={date}
      onChange={(date) => setDate(date)}
    />
  );
};

export default SiderCalendar;
