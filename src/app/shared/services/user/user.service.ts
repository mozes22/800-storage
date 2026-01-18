import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { CacheService } from '../cache/cache.service';
import { USER_ENDPOINTS } from '../../constants/user/user-endpoints';
import { UserResponse } from '../../interfaces/user/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #api = inject(ApiService);
  readonly #cache = inject(CacheService);

  getUserById(id: number): Observable<UserResponse> {
    const cacheKey = `user:id:${id}`;

    return this.#cache.get<UserResponse>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          // Return cached data
          return of(cached);
        }

        // Fetch from API and cache the result
        return this.#api.get<UserResponse>(USER_ENDPOINTS.detail(id)).pipe(
          tap((response) => {
            // Cache the response
            this.#cache.set(cacheKey, response).pipe(take(1)).subscribe();
          })
        );
      })
    );
  }
}
