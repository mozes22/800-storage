import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, switchMap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../shared/services/user/user.service';
import { ReqresUser } from '../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatOptionModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  readonly #userService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  searchControl = new FormControl('', { nonNullable: true });
  readonly searchState = signal<'idle' | 'loading' | 'found' | 'not-found' | 'invalid'>('idle');
  readonly searchResult = signal<ReqresUser | null>(null);
  readonly showSearch = signal(false);
  readonly navLinks = signal([
    { label: 'Users', path: '/users' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ]);

  constructor() {
    this.#router.events
      .pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((event) => {
        this.showSearch.set(event.url.startsWith('/users') && !event.url.startsWith('/users/'));

        if (!this.showSearch().valueOf()) {
          this.searchControl.setValue('', { emitEvent: false });
          this.#resetSearch();
        }
      });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((rawValue) => {
          const value = rawValue.trim();

          if (!value) {
            this.#resetSearch();
            return EMPTY;
          }

          if (!/^\d+$/.test(value)) {
            this.searchState.set('invalid');
            this.searchResult.set(null);
            return EMPTY;
          }

          this.searchState.set('loading');
          return this.#userService.getUserById(Number(value)).pipe(
            catchError(() => {
              this.searchResult.set(null);
              this.searchState.set('not-found');
              return EMPTY;
            })
          );
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((response) => {
        this.searchResult.set(response.data);
        this.searchState.set('found');
      });
  }

  #resetSearch(): void {
    this.searchState.set('idle');
    this.searchResult.set(null);
  }

  selectSearchResult(): void {
    const result = this.searchResult();
    if (!result) {
      return;
    }
    this.#router.navigate(['/users', result.id]);
  }
}
