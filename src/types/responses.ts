import { Calendar } from '@/types/calendars';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expires: string;
}

export interface UserResponse {
  id: number;
  userName: string;
  email: string;
}

export interface CalendarEntityResponse {
  id: number;
  title: string;
  type: 'event' | 'task';
  description: string;
  startDate: string;
  endDate?: string;
  calendarId: number;
}

export interface UserWithCalendarsResponse extends UserResponse {
  userCalendars: Calendar[];
}
