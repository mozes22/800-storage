# 800-storage

Frontend technical assignment for 800 Storage built with modern Angular.

The application displays a paginated list of users fetched from a public API, supports instant search by user ID, client-side caching to reduce network requests, and a detailed user view with navigation.

## Features

- ✅ Paginated users list with Material Design
- ✅ Instant search by user ID (debounced, no button required)
- ✅ User details page with back navigation
- ✅ Dual-layer caching (Map + IndexedDB) for optimal performance
- ✅ Loading indicators for network requests
- ✅ Responsive design with TailwindCSS
- ✅ Smooth animations and transitions

## Tech Stack

- **Angular** 19.2.0
- **TypeScript** 5.7.2
- **RxJS** 7.8.0
- **Angular Material** 19.2.19
- **TailwindCSS** 4.1.18

## Prerequisites

- Node.js 22.22.0 (see `.nvmrc` or `package.json` engines)
- npm 10.9.4

## Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

## API Endpoints

- **Paginated Users**: `https://reqres.in/api/users?page={page}`
- **Single User**: `https://reqres.in/api/users/{id}`

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Documentation

| Topic | Link |
|-----|-----|
| Angular Setup | [docs/ANGULAR.md](docs/ANGULAR.md) |
| Architecture & Implementation | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| What I'd Improve | [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) |
