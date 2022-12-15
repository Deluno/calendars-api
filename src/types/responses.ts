export interface LoginResponse {
  token: string;
  refreshToken: string;
  expires: string;
}

export interface CalendarEventResponse {
  type: 'event' | 'task';
  title: string;
  description: string;
  dateStart: Date;
  dateEnd?: Date;
}

export type CalendarEventsResponse = { [id: string]: CalendarEventResponse };
