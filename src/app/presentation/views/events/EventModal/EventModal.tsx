import { CalendarEvent } from '@/types/events';
import { DatePicker, Form, Input, Modal, Row, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface EventModalProps {
  event?: CalendarEvent | null;
  isOpen?: boolean;
  onClose: () => void;
  onEventSave: (event: CalendarEvent) => void;
}

const EventModal = (props: EventModalProps) => {
  const { event, isOpen, onEventSave, onClose } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'event' | 'task'>('event');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState(moment());
  const [dateEnd, setDateEnd] = useState<moment.Moment>();

  const handleEventChange = (event: CalendarEvent) => {
    setTitle(event.title);
    setType(event.type);
    setDescription(event.description);
    setDateStart(moment(event.dateStart));
    setDateEnd(event.dateEnd ? moment(event.dateEnd) : undefined);
  };

  useEffect(() => {
    if (event) handleEventChange(event);
  }, [event]);

  const handleOk = () => {
    onEventSave({
      id: event?.id ?? '',
      title,
      type,
      description,
      dateStart: dateStart.toDate(),
      dateEnd: dateEnd?.toDate(),
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={event && (event.id ? `Edit ${event.type}` : `New ${event.type}`)}
      centered
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout='vertical'>
        <Form.Item label='Title'>
          <Input
            value={title}
            style={{ marginRight: '1rem' }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Date'>
          {dateEnd ? (
            <Row>
              <DatePicker
                value={moment(dateStart)}
                onChange={(date) => {
                  if (date) {
                    setDateStart((prev) =>
                      moment(
                        new Date(
                          date.year(),
                          date.month(),
                          date.date(),
                          prev.hour(),
                          prev.minute(),
                        ),
                      ),
                    );
                    setDateEnd((prev) =>
                      moment(
                        new Date(
                          date.year(),
                          date.month(),
                          date.date(),
                          prev?.hour() || 0,
                          prev?.minute() || 0,
                        ),
                      ),
                    );
                  }
                }}
              />
              <TimePicker.RangePicker
                value={[moment(dateStart), moment(dateEnd)]}
                onChange={(dates) => {
                  if (dates) {
                    const [dateStart, dateEnd] = dates;
                    setDateStart((prev) =>
                      moment(
                        new Date(
                          prev.year(),
                          prev.month(),
                          prev.date(),
                          dateStart?.hour(),
                          dateStart?.minute(),
                        ),
                      ),
                    );
                    setDateEnd((prev) =>
                      moment(
                        new Date(
                          prev?.year() || 0,
                          prev?.month() || 0,
                          prev?.date() || 0,
                          dateEnd?.hour(),
                          dateEnd?.minute(),
                        ),
                      ),
                    );
                  }
                }}
              />
            </Row>
          ) : (
            <DatePicker
              showTime
              value={moment(dateStart)}
              onChange={(date) => date && setDateStart(date)}
            />
          )}
        </Form.Item>
        <Form.Item label='Description'>
          <TextArea
            rows={4}
            value={description}
            style={{ resize: 'none' }}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='...'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventModal;
