← [Back to main README](../README.md)

# Architecture & Implementation Details

## Project Structure

```
src/app/
├── core/              # Core services and interceptors
│   ├── interceptors/  # HTTP interceptors (auth, error, loading)
│   └── services/      # Core services (loading, error)
├── layout/            # Layout components (header, footer, shell)
├── pages/             # Page components (users, user-details, etc.)
└── shared/            # Shared utilities
    ├── constants/     # API endpoints
    ├── interfaces/    # TypeScript interfaces
    └── services/      # Feature services (users, user, cache, api)
```

## Caching Strategy

The application implements a dual-layer caching system:

1. **Map Cache** (In-Memory): Fast access for current session
2. **IndexedDB** (Persistent): Survives page refreshes

**Cache Flow**: Map → IndexedDB → API

- Cache TTL: 5 minutes
- Automatic expiration and cleanup
- Graceful fallback if IndexedDB unavailable

### How It Works

When a request is made:
1. First checks the in-memory Map cache (instant)
2. If not found, checks IndexedDB (persistent storage)
3. If still not found, fetches from API
4. Stores response in both Map and IndexedDB for future requests

## Development Notes

- Uses Angular standalone components
- Implements proper error handling with interceptors
- Follows Angular best practices and project conventions
- No `.spec` test files (as per project requirements)
