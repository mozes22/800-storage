import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { USER_ENDPOINTS } from '../../constants/user/user-endpoints';
import { UserResponse } from '../../interfaces/user/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #api = inject(ApiService);

  getUserById(id: number): Observable<UserResponse> {
    return this.#api.get<UserResponse>(USER_ENDPOINTS.detail(id));
  }
}
