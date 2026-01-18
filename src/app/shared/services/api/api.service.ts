import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpOptions } from '../../interfaces/http-options/http-options.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly #http = inject(HttpClient);

  public get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.#http.get<T>(url, options);
  }

  public post<B, T>(url: string, body?: B, options?: HttpOptions): Observable<T> {
    return this.#http.post<T>(url, body, options);
  }

  public put<B, T>(url: string, body: B, options?: HttpOptions): Observable<T> {
    return this.#http.put<T>(url, body, options);
  }

  public delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.#http.delete<T>(url, options);
  }

  public patch<B, T>(url: string, body: B, options?: HttpOptions): Observable<T> {
    return this.#http.patch<T>(url, body, options);
  }

  public head<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.#http.head<T>(url, options);
  }
}
