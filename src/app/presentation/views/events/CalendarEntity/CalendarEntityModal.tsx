import { useGetCalendarsQuery } from '@/app/data/source/api';
import { Option } from '@/types/common';
import { CalendarEntity } from '@/types/events';
import {
  Alert,
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Space,
  TimePicker,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useMemo } from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';

interface CalendarEntityModalProps {
  entity?: CalendarEntity;
  isOpen?: boolean;
  onClose: () => void;
  onSave: (entity: CalendarEntity) => void;
  onDelete?: (entity: CalendarEntity) => void;
  showDelete?: boolean;
}

interface CalendarEntityFormValues {
  timeRange: Moment[];
  startDate: Moment;
  calendarId: [any];
  type: any;
  title: any;
  description: any;
}

const CalendarEntityModal = ({
  entity,
  isOpen,
  onSave,
  onClose,
  onDelete = () => {},
  showDelete = false,
}: CalendarEntityModalProps) => {
  const [form] = Form.useForm();
  const { data: calendars } = useGetCalendarsQuery({});

  const calendarOptions = useMemo(
    () =>
      calendars?.map<Option>((calendar) => ({
        value: calendar.id!,
        label: calendar.name,
      })) ?? [],
    [calendars],
  );
  const typeOptions = [
    { label: 'Event', value: 'event' },
    { label: 'Task', value: 'task' },
  ];
  const calendarId = entity?.calendarId ?? calendarOptions[0]?.value;

  const handleOk = () => {
    form
      .validateFields()
      .then((values: CalendarEntityFormValues) => {
        form.resetFields([
          'title',
          'description',
          'startDate',
          'timeRange',
          'calendarId',
        ]);

        console.log('Received values of form: ', values);

        const entity =
          values.type === 'event'
            ? getEventValues(values)
            : getTaskValues(values);
        onSave(entity);
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info);
      });
  };

  const getTaskValues = (values: CalendarEntityFormValues): CalendarEntity => {
    const [calendarId] = values.calendarId;
    return {
      id: entity?.id,
      type: values.type,
      title: values.title,
      description: values.description,
      startDate: moment(values.startDate),
      calendarId,
    };
  };

  const getEventValues = (values: CalendarEntityFormValues): CalendarEntity => {
    const startTime = moment(values.timeRange[0]);
    const endTime = moment(values.timeRange[1]);
    const startDate = moment(values.startDate)
      .add(startTime.hour(), 'hour')
      .add(startTime.minute(), 'minute')
      .add(startTime.second(), 'second');
    const endDate = moment(values.startDate)
      .add(endTime.hour(), 'hour')
      .add(endTime.minute(), 'minute')
      .add(endTime.second(), 'second');
    const [calendarId] = values.calendarId;
    return {
      id: entity?.id,
      type: values.type,
      title: values.title,
      description: values.description,
      startDate,
      endDate,
      calendarId,
    };
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete(entity!);
  };

  const modalTitleText =
    entity && (entity.id ? `Edit ${entity.type}` : `New ${entity.type}`);

  const modalTitle = (
    <Row justify='space-between'>
      <Col>{modalTitleText}</Col>
      {showDelete && (
        <Col style={{ paddingRight: '1.5rem' }}>
          <Popconfirm
            title={`Are you sure you want to delete this ${entity?.type}?`}
            onConfirm={handleDelete}
          >
            <Button type='text' size='small'>
              <DeleteOutlined style={{ color: red.primary }} />
            </Button>
          </Popconfirm>
        </Col>
      )}
    </Row>
  );

  return (
    <Modal
      style={{ zIndex: 1000 }}
      title={modalTitle}
      centered
      onOk={handleOk}
      open={isOpen}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        fields={[
          { name: 'type', value: entity?.type },
          { name: 'title', value: entity?.title },
          { name: 'description', value: entity?.description },
          {
            name: 'startDate',
            value:
              entity?.type === 'event'
                ? entity?.startDate
                    .clone()
                    .set('hour', 0)
                    .set('minute', 0)
                    .set('second', 0)
                    .set('millisecond', 0)
                : entity?.startDate,
          },
          {
            name: 'timeRange',
            value: entity?.id && [entity?.startDate, entity?.endDate],
          },
          {
            name: 'calendarId',
            value: calendarId ? [calendarId] : undefined,
          },
          { name: 'hiddenCalendarId', value: calendarId },
        ]}
        layout='vertical'
        name='calendar-entity-modal-form'
      >
        <Form.Item name='hiddenCalendarId' hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item name='type'>
          <Radio.Group
            options={typeOptions}
            buttonStyle='solid'
            optionType='button'
          />
        </Form.Item>
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input style={{ marginRight: '1rem' }} placeholder='Title' />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('type') === 'event' ? (
              <Space>
                <Form.Item
                  name='startDate'
                  rules={[{ required: true, message: 'Please enter a date' }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name='timeRange'
                  rules={[
                    { required: true, message: 'Please select a time range' },
                  ]}
                >
                  <TimePicker.RangePicker />
                </Form.Item>
              </Space>
            ) : (
              <Form.Item
                name='startDate'
                rules={[{ required: true, message: 'Please enter a date' }]}
              >
                <DatePicker showTime />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item name='description'>
          <TextArea
            rows={4}
            style={{ resize: 'none' }}
            placeholder='Description'
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.calendarId !== currentValues.calendarId
          }
        >
          {({ getFieldValue }) =>
            calendars?.find(
              (c) => c.id === getFieldValue('hiddenCalendarId'),
            ) && (
              <Form.Item
                name='calendarId'
                rules={[
                  { required: true, message: 'Please select a calendar' },
                ]}
              >
                {calendarOptions.length === 0 ? (
                  <Alert message='No calendars found!' type='warning' />
                ) : (
                  <Cascader options={calendarOptions} placeholder='Calendar' />
                )}
              </Form.Item>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CalendarEntityModal;
