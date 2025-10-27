# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ummgoban Web View is a pnpm monorepo containing React web applications that integrate with a React Native mobile app. The web views are embedded in the mobile app and communicate via a custom message passing system.

**Key Architecture:**
- **Client App** (`apps/client`): Customer-facing web view for browsing markets, managing cart/bucket, and placing orders
- **Admin App** (`apps/admin`): Admin interface (minimal implementation currently)
- **UI Package** (`packages/ui`): Shared React component library with Storybook, built with shadcn/ui and Tailwind CSS
- **Shared Package** (`packages/shared`): Common utilities, types, and React Native bridge communication logic

## Development Commands

### Running Applications

```bash
# Client app (customer web view)
pnpm dev:client        # Standard dev server
pnpm dev:client-all    # Run client + watch UI and shared packages concurrently

# Admin app
pnpm dev:admin

# Individual packages in watch mode
pnpm dev:ui
pnpm dev:shared
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific apps (automatically runs prebuild for packages)
pnpm build:client
pnpm build:admin

# Build specific packages
pnpm build:ui
pnpm build:shared
```

### Testing and Linting

```bash
# Run tests (uses vitest workspace)
pnpm --filter @packages/shared test              # Run tests once
pnpm --filter @packages/shared test:watch        # Watch mode
pnpm --filter @packages/shared test:coverage     # With coverage

# Linting (runs across all workspaces)
pnpm lint

# Code formatting
pnpm prettier
```

### Preview Builds

```bash
pnpm preview:client    # Preview client build on port 8080
pnpm preview:admin     # Preview admin build
```

## Architecture

### React Native Bridge Communication

The client app communicates with the React Native mobile app through a custom event-based messaging system:

1. **App → Web Messages** (`@packages/shared/message/types/app-to-web.type.ts`):
   - `INIT`: Platform info and timestamp
   - `SAFE_AREA_INSETS`: Device safe area insets for UI layout
   - `WEB_NAVIGATION`: Navigation commands from native app
   - `NATIVE_HISTORY`: Native navigation history
   - `AUTHORIZATION`: Session/auth tokens passed from native

2. **Web → App Messages** (`@packages/shared/message/types/web-to-app.type.ts`):
   - Message types sent from web to native using `postToApp()` utility

3. **Implementation**:
   - `useRNMessage()` hook (`apps/client/src/hooks/use-RN-message.ts`) listens for `APP_MESSAGE` events
   - Updates Zustand stores for safe area, navigation state, and session
   - Uses `window.addEventListener('APP_MESSAGE')` and dispatches `APP_MESSAGE_LISTENER_READY`

### State Management

Uses Zustand for global state (`apps/client/src/store/`):
- `native-message.store.ts`: React Native connection state, navigation, and platform info
- `profile.store.ts`: User session and authentication
- `safearea.store.ts`: Device safe area insets for layout

### API Layer

The client app uses a singleton `ApiClient` class (`apps/client/src/api/ApiClient.ts`):
- Axios-based HTTP client with automatic token refresh
- Handles 401 errors by attempting to refresh access token using refresh token
- Environment-based base URLs (`__DEV__`, `__PROD__`, `__LOCAL_DEV__`, `__LOCAL_PROD__`)
- Stores session in storage using utilities from `@packages/shared`
- API modules organized by domain: `auth/`, `buckets/`, `markets/`
- Each module exports:
  - `client.ts`: API request functions
  - `model.ts`: Request/response type definitions
  - `query.ts`: React Query hooks (uses `@tanstack/react-query`)

### Routing and Domain Structure

The client uses React Router v7 (`react-router`) with a domain-based organization:
- Routes are organized in `apps/client/src/domain/` by feature area
- Each domain exports page components (e.g., `cart/`, `detail/`, `not-found/`)
- Shared components are in `apps/client/src/component/`
- Uses `react-router` for routing (not react-router-dom)

### Build System

**Packages** (`ui` and `shared`):
- Built with Rollup, outputting both ESM (`.mjs`) and CJS (`.cjs`) formats
- Watch mode available for development (`pnpm dev:ui`, `pnpm dev:shared`)
- Must be built before apps can use them in production builds

**Apps** (`client` and `admin`):
- Built with Vite and TypeScript
- TypeScript compilation (`tsc -b`) runs before Vite build
- Environment variables defined via Vite `define` (e.g., `__DEV__`, `__PROD__`)

### Environment Handling

The client app supports multiple environments:
- `NODE_ENV='local-dev'`: Local development with proxy to dev API (`/api-dev` → `https://dev.ummgoban.com/v1`)
- `NODE_ENV='local-prod'`: Local development with proxy to prod API (`/api-prod` → `https://api.ummgoban.com/v1`)
- `NODE_ENV='development'`: Deployed development environment
- `NODE_ENV='production'`: Deployed production environment

Vite config uses proxy in local modes and direct API calls in deployed environments.

### TypeScript Configuration

- Each app and package has its own `tsconfig.json`
- Apps use `tsconfig.app.json` for source code and `tsconfig.node.json` for build configs
- Packages use `tsconfig.build.json` for build output
- Path aliases: Client app uses `@/` for `src/` directory

### Styling

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component primitives in UI package
- **Radix UI** for accessible components
- Prettier config: 120 char width, 2 space indent, double quotes

## Component Development

The UI package uses Storybook for component development:

```bash
cd packages/ui
pnpm storybook              # Run Storybook on port 6006
pnpm build:storybook        # Build static Storybook
```

Components are organized in `packages/ui/src/components/`:
- `ui/`: Base components (buttons, cards, etc.)
- `layout/`: Layout components
- `feedback/`: User feedback components (modals, alerts)
- `utility/`: Utility components

## Important Patterns

1. **Session Management**: Sessions are stored using `getStorage`/`setStorage` from `@packages/shared` and automatically refreshed by ApiClient interceptor on 401 errors.

2. **Error Handling**: Use `CustomError` class (`apps/client/src/api/CustomError.ts`) for API errors.

3. **React Query**: API calls should use React Query hooks (defined in `query.ts` files) for caching and state management.

4. **Cross-platform Support**: The client app must work both in React Native WebView and standalone browser. Check `platform` from native message store to conditionally handle features.

5. **Build Dependencies**: When modifying `packages/ui` or `packages/shared`, either run watch mode or rebuild before testing changes in apps.
