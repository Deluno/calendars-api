export interface CalendarEvent {
  id: string;
  type: 'event' | 'task';
  title: string;
  description: string;
  dateStart: Date;
  dateEnd?: Date;
}
