# NEO Dashboard 🌌

A real-time Near Earth Objects (NEO) tracking dashboard powered by NASA's API. Built with React, TypeScript, and modern web technologies.

![NASA API](https://img.shields.io/badge/NASA-API-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)

## 🚀 [Live Demo](YOUR_LIVE_URL_HERE)

![NEO Dashboard Screenshot](path/to/screenshot.png)

<!-- Add your screenshot here -->

## Features

- 📊 **Real-time asteroid tracking** - Monitor Near Earth Objects from the past 7 days
- 🚨 **Hazard detection** - Identify potentially hazardous asteroids
- 📈 **Interactive data table** - Sort and filter asteroid data
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI
- ⚡ **Fast performance** - Powered by React Query for efficient data fetching
- ✅ **Fully tested** - Unit tests with Vitest and React Testing Library

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Data Fetching:** TanStack Query (React Query)
- **UI Components:** Radix UI
- **Table:** TanStack Table
- **Testing:** Vitest + React Testing Library
- **API:** NASA NeoWs (Near Earth Object Web Service)

## Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # Reusable UI components (shadcn)
│   ├── asteroid-table.tsx
│   └── stats-card.tsx
├── hooks/            # Custom React hooks
│   └── useNeoNasaQuery.ts
├── lib/              # Utilities and helpers
│   ├── transformers/ # Data transformation functions
│   └── utils.ts
├── test/             # Test configuration
│   ├── fixtures/     # Mock data for testing
│   └── setup.ts
├── types/            # TypeScript type definitions
│   └── neo.ts
└── App.tsx           # Main application component
```

## API Reference

This project uses the [NASA NeoWs API](https://api.nasa.gov/) to fetch Near Earth Object data.

**Endpoint:** `https://api.nasa.gov/neo/rest/v1/feed`

**Parameters:**

- `start_date` - Starting date for asteroid search (YYYY-MM-DD)
- `end_date` - Ending date for asteroid search (YYYY-MM-DD)
- `api_key` - Your NASA API key

## Test Coverage

The project includes unit tests for core business logic, with ongoing expansion of test coverage.

| Component                     | Coverage                      |
| ----------------------------- | ----------------------------- |
| **Transformers** (Core Logic) | 100% statements, 96% branches |
| **Overall Project**           | 22% (actively improving)      |

Core data transformation functions have comprehensive test coverage. Additional component and integration tests are being added incrementally.

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
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
