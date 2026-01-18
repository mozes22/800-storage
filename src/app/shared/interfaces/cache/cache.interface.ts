import { UserResponse } from '../user/user.interface';
import { UsersResponse } from '../users/users.interface';

export type CacheKey = string;
export type CacheValue = UserResponse | UsersResponse;

export interface CacheEntry<T extends CacheValue> {
  data: T;
  timestamp: number;
}
