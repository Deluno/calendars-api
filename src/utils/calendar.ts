import type { Moment } from 'moment';
import moment from 'moment';

export const getCalendar = (now: Moment) => {
  // get dates in 5 weeks with days from previous and next month
  const dates = [];
  const firstDay = moment(now.clone().startOf('month'));
  const lastDay = moment(now.clone().endOf('month'));
  const firstDayInWeek = firstDay.day();
  const lastDayInWeek = lastDay.day();

  // get dates in previous month
  const prevMonth = moment(now.clone().subtract(1, 'month'));
  const lastDayInPrevMonth = prevMonth.daysInMonth();
  for (let i = firstDayInWeek - 1; i >= 0; i--) {
    dates.push({
      date: moment(prevMonth.clone().date(lastDayInPrevMonth - i)),
      inMonth: false,
      isToday: false,
    });
  }

  // get dates in current month
  const lastDayInMonth = now.daysInMonth();
  for (let i = 1; i <= lastDayInMonth; i++) {
    const date = moment(now.clone().date(i));
    dates.push({
      date,
      inMonth: true,
      isToday: date.isSame(moment(), 'day'),
    });
  }

  // get dates in next month
  const nextMonth = moment(now.clone().add(1, 'month'));
  for (let i = 1; i <= 6 - lastDayInWeek; i++) {
    dates.push({
      date: moment(nextMonth.clone().date(i)),
      inMonth: false,
      isToday: false,
    });
  }

  return { dates: dates, weeks: Math.floor(dates.length / 7) };
};
