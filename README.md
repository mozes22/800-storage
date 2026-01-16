# 800-storage
Frontend technical assignment for 800 Storage built with modern Angular.

The application displays a paginated list of users fetched from a public API,
supports instant search by user ID, client-side caching to reduce network
requests, and a detailed user view with navigation.

## Tech Stack
- TypeScript
- Angular
- RxJS
- Angular Material

## API Endpoints
- Cards Data: https://reqres.in/api/users?page={page}
- Single User: https://reqres.in/api/users/{id}

## Documentation

| Topic | Link |
|-----|-----|
| Angular Setup | [docs/ANGULAR.md](docs/ANGULAR.md) |
| Project Setup | [docs/SETUP.md](docs/SETUP.md) |
| Implementation Notes | [docs/IMPLEMENTATION_NOTES.md](docs/IMPLEMENTATION_NOTES.md) |

## Setup & Run
```bash
npm install
npm start
