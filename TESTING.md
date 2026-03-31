# TESTING

This document explains how to run the test suites for the TurnoYa backend, the TurnoYa mobile frontend, and how to trigger the CI pipeline.

---

## Backend Tests (NestJS)

### Prerequisites

- Node.js ≥ 20
- npm

### Install dependencies

```bash
cd backend
npm install
```

### Run all tests

```bash
cd backend
npm test
```

### Run tests with coverage

```bash
cd backend
npm run test:cov
```

Coverage output is written to `backend/coverage/`.

### Run tests in watch mode (during development)

```bash
cd backend
npm run test:watch
```

### What is tested

| File | What it covers |
|------|---------------|
| `src/modules/queue/queue.service.spec.ts` | `QueueService` — `getQueue`, `getQueueMock`, `addToQueue` (defaults, positions, status, IDs), `updateQueueItem`, `removeFromQueue`, `nextInQueue`, `completeQueueItem` |
| `src/modules/queue/queue.controller.spec.ts` | `QueueController` — verifies every endpoint delegates to the service with the correct arguments |
| `src/modules/users/user.service.spec.ts` | `UserService` — `getUser`, `createUser`, `updateUser`, `getUserSettings` (shape and types) |
| `src/modules/users/user.controller.spec.ts` | `UserController` — verifies every endpoint delegates to the service with the correct arguments |
| `src/modules/notifications/notif.service.spec.ts` | `NotificationService` — `sendNotification`, `notifyQueueUpdate` |

---

## Frontend Tests (React Native)

### Prerequisites

- Node.js ≥ 20
- npm

### Install dependencies

```bash
cd mobile
npm install
```

### Run all tests

```bash
cd mobile
npm test
```

### Run tests with coverage

```bash
cd mobile
npm test -- --coverage --watchAll=false
```

Coverage output is written to `mobile/coverage/`.

### Run a specific test file

```bash
cd mobile
npm test -- --watchAll=false --testPathPattern="HomeScreen"
```

### What is tested

| File | What it covers |
|------|---------------|
| `__tests__/App.test.tsx` | Root `App` component renders without crashing (pre-existing test) |
| `__tests__/HomeScreen.test.tsx` | Title, subtitle, navigation buttons render and trigger the correct `navigate()` calls |
| `__tests__/QueueScreen.test.tsx` | Loading indicator, client names, total count, empty state, "Siguiente Turno" button calls `api.queue.next` |
| `__tests__/AddClientScreen.test.tsx` | Form validation (empty name / phone), successful create call, error handling |
| `__tests__/SettingsScreen.test.tsx` | All setting labels and values render correctly |
| `__tests__/api.test.ts` | `api.queue` module — URL construction, HTTP methods, headers, JSON body serialisation |
| `__tests__/useQueue.test.tsx` | `useQueue` hook — initial state, data loading, error state, `addToQueue`, `nextInQueue` |

---

## CI Pipeline (GitHub Actions)

The CI workflow is defined in `.github/workflows/ci.yml`. It runs automatically on:

- **Push** to `main`, `develop`, `feature/**`, or `copilot/**` branches
- **Pull requests** targeting `main` or `develop`

### What the pipeline does

| Job | Steps |
|-----|-------|
| `backend-tests` | Checks out code → sets up Node 20 → `npm ci` → ESLint → `npm run test:cov` → uploads coverage artefact |
| `frontend-tests` | Checks out code → sets up Node 20 → `npm ci` → ESLint → `npm test -- --coverage --watchAll=false` → uploads coverage artefact |

### Trigger CI manually

1. Open the repository on GitHub.
2. Navigate to **Actions → CI**.
3. Click **Run workflow**, choose a branch, and click the green **Run workflow** button.

### View CI results

- Open a pull request to see inline status checks.
- Go to **Actions** in the repository to browse full run logs and download coverage artefacts.
