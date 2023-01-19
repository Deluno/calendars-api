import { Calendar } from '@/types/calendars';
import { red } from '@ant-design/colors';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface SavedCalendarMenuItemLabelProps {
  calendar: Calendar;
  checked?: boolean;
  collapsed?: boolean;
  onRemove?: (calendar: Calendar) => void;
  onSelectChange?: (id: number) => void;
}

export const SavedCalendarMenuItemLabel = ({
  calendar,
  checked,
  collapsed,
  onRemove = () => {},
  onSelectChange = () => {},
}: SavedCalendarMenuItemLabelProps) => {
  const handleRemoveClick = () => {
    onRemove(calendar);
  };
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    onSelectChange(calendar.id!);
  };

  return (
    <Row style={{ paddingLeft: '1rem' }}>
      <Col span={collapsed ? 18 : 20}>
        <Checkbox
          style={{ padding: '0.3rem 0' }}
          checked={checked}
          onChange={handleCheckboxChange}
        >
          {calendar.name}
        </Checkbox>
      </Col>
      <Col span={1} style={{ cursor: 'pointer' }}>
        <Popconfirm
          title='Are you sure you want to remove this calendar?'
          onConfirm={handleRemoveClick}
        >
          <Button type='link'>
            <CloseOutlined style={{ color: red.primary }} />
          </Button>
        </Popconfirm>
      </Col>
    </Row>
  );
};
