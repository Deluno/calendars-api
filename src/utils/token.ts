import { TokenPayload } from '@/types/token';

export const decodeToken = (token: string): TokenPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
