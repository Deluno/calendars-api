import { CalendarEntity } from '@/types/events';
import { Button, Modal } from 'antd';
import moment from 'moment';
import classes from './CalendarDayDetailsModal.module.css';
import type { Moment } from 'moment';

interface CalendarDayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEntityClick: (entity: CalendarEntity) => void;
  date: Moment;
  entities: CalendarEntity[];
}

export const CalendarDayDetailsModal = ({
  isOpen,
  onClose,
  onEntityClick,
  date,
  entities,
}: CalendarDayDetailsModalProps) => {
  return (
    <Modal
      centered
      width={300}
      title={moment(date).format('dddd, MMMM Do YYYY')}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      mask={false}
    >
      {entities.map((entity) => (
        <Button
          type='ghost'
          key={entity.id}
          className={classes.event}
          style={{ height: 25 }}
          onClick={(e) => {
            e.stopPropagation();
            onEntityClick(entity);
          }}
        >
          {entity.title}
        </Button>
      ))}
    </Modal>
  );
};
