export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CalendarEventPostRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  calendarId?: number;
}

export interface CalendarEventPutRequest {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  calendarId?: number;
}

export interface CalendarTaskPostRequest {
  title: string;
  description: string;
  startDate: string;
  calendarId?: number;
}
