export const getCalendar = (now: Date) => {
  // get dates in 5 weeks with days from previous and next month
  const dates = [];
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const firstDayInWeek = firstDay.getDay();
  const lastDayInWeek = lastDay.getDay();

  // get dates in previous month
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayInPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
  ).getDate();
  for (let i = firstDayInWeek - 1; i >= 0; i--) {
    dates.push({
      date: new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        lastDayInPrevMonth - i,
      ),
      inMonth: false,
      isToday: false,
    });
  }

  // get dates in current month
  const lastDayInMonth = lastDay.getDate();
  for (let i = 1; i <= lastDayInMonth; i++) {
    dates.push({
      date: new Date(now.getFullYear(), now.getMonth(), i),
      inMonth: true,
      isToday: now.getDate() === i,
    });
  }

  // get dates in next month
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  for (let i = 1; i <= 6 - lastDayInWeek; i++) {
    dates.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
      inMonth: false,
      isToday: false,
    });
  }

  return dates;
};
