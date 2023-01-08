import { RootState } from '@/app/data/store';
import { setDate } from '@/app/data/store/calendarsSlice';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';

interface HeaderContentProps {
  showControls: boolean;
}

const HeaderContent = ({ showControls = false }: HeaderContentProps) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.calendarState.selectedDate,
  );

  const controls = showControls && (
    <Space
      direction='horizontal'
      style={{ paddingLeft: '3rem', justifyContent: 'center' }}
    >
      <Button
        style={{ marginTop: '0.3rem', paddingTop: '0.1rem' }}
        size='middle'
        onClick={() => {
          dispatch(setDate(moment().toISOString()));
        }}
      >
        Today
      </Button>
      <Button
        style={{ marginTop: '0.3rem', paddingTop: '0.1rem' }}
        type='text'
        onClick={() => {
          dispatch(
            setDate(moment(selectedDate).subtract(1, 'month').toISOString()),
          );
        }}
      >
        <CaretLeftFilled />
      </Button>
      <Button
        style={{ marginTop: '0.3rem', paddingTop: '0.1rem' }}
        type='text'
        onClick={() => {
          dispatch(setDate(moment(selectedDate).add(1, 'month').toISOString()));
        }}
      >
        <CaretRightFilled />
      </Button>
      <Title level={4} style={{ margin: 0 }}>
        {moment(selectedDate).format('MMMM YYYY')}
      </Title>
    </Space>
  );

  return (
    <>
      <Logo />
      {controls}
    </>
  );
};

export default HeaderContent;
