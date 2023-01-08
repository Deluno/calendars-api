import { Calendar } from '@/types/calendars';
import { red } from '@ant-design/colors';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Popconfirm, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CalendarMenuItemLabelProps {
  calendar: Calendar;
  checked?: boolean;
  collapsed?: boolean;
  onEdit?: (calendar: Calendar) => void;
  onDelete?: (calendar: Calendar) => void;
  onSelectChange?: (id: number) => void;
}

export const CalendarMenuItemLabel = ({
  calendar,
  checked,
  collapsed,
  onEdit = () => {},
  onDelete = () => {},
  onSelectChange = () => {},
}: CalendarMenuItemLabelProps) => {
  const handleEditClick = () => {
    onEdit(calendar);
  };
  const handleDeleteClick = () => {
    onDelete(calendar);
  };
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    onSelectChange(calendar.id!);
  };

  return (
    <Row style={{ paddingLeft: '1rem' }}>
      <Col span={collapsed ? 14 : 16}>
        <Checkbox
          style={{ padding: '0.3rem 0' }}
          checked={checked}
          onChange={handleCheckboxChange}
        >
          {calendar.name}
        </Checkbox>
      </Col>
      <Col span={4} style={{ cursor: 'pointer' }} onClick={handleEditClick}>
        <Button type='link'>
          <EditOutlined />
        </Button>
      </Col>
      <Col span={1} style={{ cursor: 'pointer' }}>
        <Popconfirm
          title='Are you sure you want to delete this calendar?'
          onConfirm={handleDeleteClick}
        >
          <Button type='link'>
            <DeleteOutlined style={{ color: red.primary }} />
          </Button>
        </Popconfirm>
      </Col>
    </Row>
  );
};
