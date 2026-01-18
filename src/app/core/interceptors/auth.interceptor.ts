import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = environment.apiBaseUrl?.trim();
  if (!apiBaseUrl) {
    return next(req);
  }

  if (!req.url.startsWith(apiBaseUrl)) {
    return next(req);
  }

  const apiKey = environment.apiKey?.trim();
  if (req.headers.has('x-api-key') || !apiKey) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'x-api-key': apiKey
      }
    })
  );
};
