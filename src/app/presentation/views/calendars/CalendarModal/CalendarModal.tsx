import { Calendar } from '@/types/calendars';
import { Checkbox, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

interface CalendarModalProps {
  calendar?: Calendar | null;
  isOpen?: boolean;
  onClose: () => void;
  onCalendarSave: (calendar: Calendar) => void;
}

export const CalendarModal = ({
  calendar,
  isOpen,
  onCalendarSave,
  onClose,
}: CalendarModalProps) => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleCalendarChange = (calendar: Calendar) => {
    setName(calendar.name);
    setIsPublic(calendar.isPublic);
  };

  useEffect(() => {
    if (calendar) handleCalendarChange(calendar);
  }, [calendar]);

  const handleOk = () => {
    onCalendarSave({
      id: calendar?.id,
      name,
      isPublic,
      ownerId: calendar?.ownerId,
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={calendar && (calendar.id ? 'Edit calendar' : 'New calendar')}
      centered
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout='inline'>
        <Form.Item label='Name'>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label='Public'>
          <Checkbox
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
