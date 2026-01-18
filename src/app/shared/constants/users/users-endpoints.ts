import { environment } from '../../../../environments/environment';

const USERS = 'users';

export const USERS_ENDPOINTS = {
  list: (page: number) => `${environment.apiBaseUrl}/${USERS}?page=${page}`
} as const;
