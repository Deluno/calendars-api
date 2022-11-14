import { Calendar, Card, Col } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';

const CalendarPage = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <Col span={22} offset={1} style={{ paddingTop: '2rem' }}>
      <Card>
        <Calendar headerRender={() => <></>} onPanelChange={onPanelChange} />
      </Card>
    </Col>
  );
};

export default CalendarPage;
