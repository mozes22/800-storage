import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCardModule, MatCardSubtitle } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../shared/services/user/user.service';
import { ReqresUser } from '../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #userService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #location = inject(Location);

  readonly user = signal<ReqresUser | null>(null);
  readonly isLoading = signal(false);
  readonly notFound = signal(false);

  ngOnInit(): void {
    this.#route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.user.set(null);
          this.notFound.set(false);

          if (Number.isNaN(id)) {
            this.notFound.set(true);
            this.isLoading.set(false);
            return EMPTY;
          }

          this.isLoading.set(true);
          return this.#userService.getUserById(id).pipe(
            catchError(() => {
              this.notFound.set(true);
              this.user.set(null);
              this.isLoading.set(false);
              return EMPTY;
            })
          );
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((response) => {
        if (response) {
          this.user.set(response.data);
          this.notFound.set(false);
        }
        this.isLoading.set(false);
      });
  }

  goBack(): void {
    this.#location.back();
  }
}
