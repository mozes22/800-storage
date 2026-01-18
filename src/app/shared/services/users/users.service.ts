import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { CacheService } from '../cache/cache.service';
import { USERS_ENDPOINTS } from '../../constants/users/users-endpoints';
import { UsersResponse } from '../../interfaces/users/users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  readonly #api = inject(ApiService);
  readonly #cache = inject(CacheService);

  getUsers(page: number): Observable<UsersResponse> {
    const cacheKey = `users:page:${page}`;

    return this.#cache.get<UsersResponse>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          // Return cached data
          return of(cached);
        }

        // Fetch from API and cache the result
        return this.#api.get<UsersResponse>(USERS_ENDPOINTS.list(page)).pipe(
          tap((response) => {
            // Cache the response
            this.#cache.set(cacheKey, response).subscribe();
          })
        );
      })
    );
  }
}
