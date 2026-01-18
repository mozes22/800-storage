import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly #snackBar = inject(MatSnackBar);

  showError(message: string, duration = 5000): void {
    this.#snackBar.open(message, 'Dismiss', { duration });
  }

  getMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return 'You appear to be offline. Check your connection.';
      }

      if (typeof error.error === 'string' && error.error.trim()) {
        return error.error;
      }

      if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        const message = String(error.error.message).trim();
        if (message) {
          return message;
        }
      }

      if (error.status === 0) {
        return 'Network error. Please try again.';
      }

      return `Request failed (${error.status}). Please try again.`;
    }

    return 'Something went wrong. Please try again.';
  }
}
