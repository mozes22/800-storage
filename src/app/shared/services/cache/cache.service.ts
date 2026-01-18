import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CacheEntry, CacheKey, CacheValue } from '../../interfaces/cache/cache.interface';

@Injectable({ providedIn: 'root' })
export class CacheService {
  // In-memory Map cache
  readonly #memoryCache = new Map<CacheKey, CacheEntry<CacheValue>>();

  // IndexedDB database
  readonly #dbName = '800-storage-cache';
  readonly #dbVersion = 1;
  readonly #storeName = 'api-cache';

  // 5 minutes
  readonly #cacheTTL = 5 * 60 * 1000;

  /**
   * Get cached data
   */
  get<T extends CacheValue>(key: CacheKey): Observable<T | null> {
    // First, check in-memory Map cache
    const memoryEntry = this.#memoryCache.get(key);
    if (memoryEntry && this.#isValid(memoryEntry)) {
      return of(memoryEntry.data as T);
    }

    // If not in memory, check IndexedDB
    return from(this.#getFromIndexedDB<T>(key)).pipe(
      tap((entry) => {
        // If found in IndexedDB, also store in memory cache for faster future access
        if (entry) {
          this.#memoryCache.set(key, entry);
        }
      }),
      map((entry) => (entry ? (entry.data as T) : null)),
      catchError(() => {
        // If IndexedDB fails, return null (will fetch from API)
        return of(null);
      })
    );
  }

  /**
   * Set cached data in both Map and IndexedDB
   */
  set<T extends CacheValue>(key: CacheKey, data: T): Observable<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };

    // Store in memory cache
    this.#memoryCache.set(key, entry as CacheEntry<CacheValue>);

    // Store in IndexedDB (fire and forget - don't block on this)
    return from(this.#setInIndexedDB(key, entry)).pipe(
      catchError(() => {
        // If IndexedDB fails, still return success (memory cache is set)
        return of(undefined);
      }),
      map(() => undefined)
    );
  }

  /**
   * Clear all caches (both Map and IndexedDB)
   */
  clear(): Observable<void> {
    this.#memoryCache.clear();
    return from(this.#clearIndexedDB()).pipe(
      catchError(() => of(undefined)),
      map(() => undefined)
    );
  }

  /**
   * Clear a specific cache entry
   */
  delete(key: CacheKey): Observable<void> {
    this.#memoryCache.delete(key);
    return from(this.#deleteFromIndexedDB(key)).pipe(
      catchError(() => of(undefined)),
      map(() => undefined)
    );
  }

  /**
   * Check if cache entry is still valid (not expired)
   */
  #isValid(entry: CacheEntry<CacheValue>): boolean {
    return Date.now() - entry.timestamp < this.#cacheTTL;
  }

  /**
   * Get data from IndexedDB
   */
  async #getFromIndexedDB<T extends CacheValue>(key: CacheKey): Promise<CacheEntry<T> | null> {
    try {
      const db = await this.#openDatabase();
      const transaction = db.transaction([this.#storeName], 'readonly');
      const store = transaction.objectStore(this.#storeName);
      const request = store.get(key);

      return new Promise<CacheEntry<T> | null>((resolve, reject) => {
        request.onsuccess = () => {
          const result = request.result as CacheEntry<T> | undefined;
          if (result && this.#isValid(result)) {
            resolve(result);
          } else {
            // Entry is expired or doesn't exist
            if (result) {
              // Delete the entry
              this.#deleteFromIndexedDB(key).catch(() => {
                // Ignore errors
              });
            }
            resolve(null);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting from IndexedDB:', error);
      return null;
    }
  }

  /**
   * Set data in IndexedDB
   */
  async #setInIndexedDB<T extends CacheValue>(key: CacheKey, entry: CacheEntry<T>): Promise<void> {
    try {
      const db = await this.#openDatabase();
      const transaction = db.transaction([this.#storeName], 'readwrite');
      const store = transaction.objectStore(this.#storeName);
      store.put(entry, key);

      return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error setting in IndexedDB:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Clear all data from IndexedDB
   */
  async #clearIndexedDB(): Promise<void> {
    try {
      const db = await this.#openDatabase();
      const transaction = db.transaction([this.#storeName], 'readwrite');
      const store = transaction.objectStore(this.#storeName);
      store.clear();

      return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Delete specific entry from IndexedDB
   */
  async #deleteFromIndexedDB(key: CacheKey): Promise<void> {
    try {
      const db = await this.#openDatabase();
      const transaction = db.transaction([this.#storeName], 'readwrite');
      const store = transaction.objectStore(this.#storeName);
      store.delete(key);

      return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error deleting from IndexedDB:', error);
      return Promise.reject(error);
    }
  }

  /**
   * Open IndexedDB database (create if doesn't exist)
   */
  async #openDatabase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.#dbName, this.#dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.#storeName)) {
          db.createObjectStore(this.#storeName);
        }
      };
    });
  }
}
