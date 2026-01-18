import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersService } from '../../shared/services/users/users.service';
import { ReqresUser } from '../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  readonly #usersService = inject(UsersService);
  readonly #destroyRef = inject(DestroyRef);

  readonly users = signal<ReqresUser[]>([]);
  readonly currentPage = signal(1);
  readonly totalUsers = signal(0);
  readonly pageSize = signal(6);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.#loadUsers(1);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.#loadUsers(event.pageIndex + 1);
  }

  #loadUsers(page: number): void {
    this.isLoading.set(true);

    this.#usersService
      .getUsers(page)
      .pipe(
        catchError(() => {
          this.users.set([]);
          this.currentPage.set(page);
          this.totalUsers.set(0);
          this.isLoading.set(false);
          return of(null);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((response) => {
        if (response) {
          this.users.set(response.data);
          this.currentPage.set(response.page);
          this.totalUsers.set(response.total);
          this.pageSize.set(response.per_page);
        }
        this.isLoading.set(false);
      });
  }
}
