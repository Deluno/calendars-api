import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, Calendar, Col, Row } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import classes from './SiderCalendar.module.css';

const renderCustomCalendarHeader = (
  value: moment.Moment,
  type: CalendarMode,
  onChange: (date: moment.Moment) => void,
  onTypeChange: (type: CalendarMode) => void,
) => {
  return (
    <div className={classes['calendar-header-wrapper']}>
      <Row gutter={8}>
        <Col className={classes['calendar-header-title']}>
          {value.format('MMMM YYYY')}
        </Col>
        <Col>
          <Button>
            <CaretLeftFilled />
          </Button>
        </Col>
        <Col>
          <Button>
            <CaretRightFilled />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const SiderCalendar = () => {
  return (
    <Calendar
      className={classes.calendar}
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        return renderCustomCalendarHeader(value, type, onChange, onTypeChange);
      }}
    />
  );
};

export default SiderCalendar;
