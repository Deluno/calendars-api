import { CalendarEvent } from '@/types/events';
import { DatePicker, Form, Input, Modal } from 'antd';
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
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState<Date>();

  const handleEventChange = (event: CalendarEvent) => {
    setTitle(event.title);
    setDescription(event.description);
    setDateStart(event.dateStart);
    setDateEnd(event.dateEnd);
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
      dateStart,
      dateEnd,
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
            <DatePicker.RangePicker
              showTime
              value={[moment(dateStart), moment(dateEnd)]}
              onChange={(range) => {
                if (range) {
                  setDateStart(range[0]!.toDate());
                  setDateEnd(range[1]!.toDate());
                }
              }}
            />
          ) : (
            <DatePicker
              showTime
              value={moment(dateStart)}
              onChange={(date) => date && setDateStart(date.toDate())}
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
