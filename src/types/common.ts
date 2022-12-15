export interface CalendarServiceUserState {
  token: string;
  isAuthenticated: boolean;
  expires?: string;
}

export enum LocalStorageKeys {
  Token = 'token',
  Expires = 'expires',
}
