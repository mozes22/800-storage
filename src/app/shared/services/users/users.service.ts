import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { USERS_ENDPOINTS } from '../../constants/users/users-endpoints';
import { UsersResponse } from '../../interfaces/users/users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  readonly #api = inject(ApiService);

  getUsers(page: number): Observable<UsersResponse> {
    return this.#api.get<UsersResponse>(USERS_ENDPOINTS.list(page));
  }

}
