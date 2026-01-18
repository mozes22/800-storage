import { environment } from '../../../../environments/environment';

const USERS = 'users';

export const USER_ENDPOINTS = {
  detail: (id: number) => `${environment.apiBaseUrl}/${USERS}/${id}`
} as const;
