import { SelectableCalendar } from '@/types/calendars';
import { TokenPayload } from '@/types/token';

export interface CalendarServiceUserState {
  token: string;
  expires: string;
  user: TokenPayload;
}

export interface CalendarServiceSelectedCalendarsState {
  calendars: { [id: number]: SelectableCalendar };
  savedCalendars: { [id: number]: SelectableCalendar };
  selectedDate: string;
}

export enum LocalStorageKeys {
  Token = 'token',
  Expires = 'expires',
}

export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disabled?: boolean;
}
