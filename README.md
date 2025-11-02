# NEO Monitor Monorepo 🌌

A Turborepo monorepo containing the NEO Monitor web application and API server for tracking Near Earth Objects using NASA's API.

![NASA API](https://img.shields.io/badge/NASA-API-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Turborepo](https://img.shields.io/badge/Turborepo-2.3-purple)

## 🚀 [Live Demo](https://neo.danielgc.design/)

## What's inside?

This Turborepo includes the following apps and packages:

### Apps

- **[web](./apps/web)**: React 19 + Vite web application for NEO tracking
- **[server](./apps/server)**: Express API server for backend services

### Packages

- **[@neo-monitor/typescript-config](./packages/typescript-config)**: Shared TypeScript configurations
- **[@neo-monitor/eslint-config](./packages/eslint-config)**: Shared ESLint configurations

## Features

- 📊 **Real-time asteroid tracking** - Monitor Near Earth Objects
- 🚨 **Hazard detection** - Identify potentially hazardous asteroids
- 📈 **Interactive data visualization** - Charts and tables
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI
- ⚡ **Fast builds** - Turborepo caching for instant rebuilds
- 🔄 **Monorepo architecture** - Shared code and configs
- ✅ **Fully tested** - Unit tests with Vitest

## Tech Stack

### Web App
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI
- **Testing**: Vitest + React Testing Library
- **Storybook**: Component development

### API Server
- **Framework**: Express 5
- **Language**: TypeScript
- **Runtime**: Node.js

### Monorepo
- **Build System**: Turborepo 2.3
- **Package Manager**: npm workspaces

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A free NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dan10gc/neo-dashboard.git
cd neo-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables for the web app:

```bash
cp apps/web/.env.example apps/web/.env
```

4. Add your NASA API key to `apps/web/.env`:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

5. (Optional) Set up server environment:

```bash
cp apps/server/.env.example apps/server/.env
```

### Development

Run all apps in development mode:

```bash
npm run dev
```

Or run individual apps:

```bash
# Web app only (http://localhost:5173)
npm run dev:web

# Server only (http://localhost:3001)
npm run dev:server
```

### Build

Build all apps for production:

```bash
npm run build
```

Or build individual apps:

```bash
# Build web app
npm run build:web

# Build server
npm run build:server
```

### Other Commands

```bash
# Run tests across all apps
npm run test

# Run linting
npm run lint

# Preview web app production build
npm run preview

# Run Storybook
npm run storybook
```

## Project Structure

```text
neo-dashboard/
├── apps/
│   ├── web/                    # React web application
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── features/      # Feature modules
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── lib/           # Utilities and helpers
│   │   │   └── types/         # TypeScript types
│   │   ├── public/
│   │   └── package.json
│   └── server/                 # Express API server
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── packages/
│   ├── typescript-config/      # Shared TS configs
│   └── eslint-config/          # Shared ESLint configs
├── package.json                # Root workspace config
├── turbo.json                  # Turborepo configuration
└── render.yaml                 # Render deployment config
```

## Deployment

### Render

This project is configured for deployment on Render using the included [render.yaml](./render.yaml) file.

**Web App (Static Site)**:

- Build Command: `npm install && npm run build:web`
- Publish Directory: `apps/web/dist`
- Environment Variable: `VITE_NASA_API_KEY`

**API Server (Web Service)**:

- Build Command: `npm install && npm run build:server`
- Start Command: `npm run start --filter=server`
- Environment Variables: `NODE_ENV`, `PORT`

You can deploy using:

1. Render Dashboard - Connect your repo and Render will auto-detect the render.yaml
2. Render Blueprint - Use the render.yaml directly

## Benefits of Turborepo

- **⚡ Lightning fast builds**: Intelligent caching system
- **📦 Shared dependencies**: Install once, use everywhere
- **🔄 Parallel execution**: Run tasks across apps simultaneously
- **🎯 Task pipelines**: Define task dependencies and order
- **🚀 Optimized CI/CD**: Only build what changed

## Test Coverage

The project emphasizes comprehensive testing of business-critical code, with strategic test coverage across the application.

| Component             | Coverage                         |
| --------------------- | -------------------------------- |
| **Core Transformers** | 🟢 100% statements, 96% branches |
| **React Components**  | 🟡 Partial coverage (expanding)  |
| **Overall Project**   | 22% (actively improving)         |

**Key Testing Highlights:**

- ✅ 100% coverage on business-critical data transformation logic
- ✅ Comprehensive unit tests for column definitions, stats cards, and footer
- ✅ Test fixtures with realistic NASA API data
- ✅ Mock Service Worker (MSW) for API testing
- 🔄 Integration and E2E tests in progress

```bash
# Run tests
npm test

# Generate coverage report
npm run test:coverage
```

Test fixtures are located in `src/test/fixtures/` for consistent and realistic mock data.

## License

MIT

## Acknowledgments

- NASA NeoWs API for providing asteroid data
- [Turborepo](https://turbo.build/) for monorepo tooling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
