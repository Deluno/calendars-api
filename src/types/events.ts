import type { Moment } from 'moment';

export interface CalendarEntity {
  id?: number;
  type: 'event' | 'task';
  title: string;
  description: string;
  startDate: Moment;
  endDate?: Moment;
  calendarId?: number;
}
