import { ReqresUser } from '../user/user.interface';

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
}
