# NEO Dashboard 🌌

A real-time Near Earth Objects (NEO) tracking dashboard powered by NASA's API. Built with React, TypeScript, and modern web technologies.

![NASA API](https://img.shields.io/badge/NASA-API-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)

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

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- NASA API key (get one free at [NASA API Portal](https://api.nasa.gov/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/neo-dashboard.git
cd neo-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_NASA_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report

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

## Testing

The project includes comprehensive unit tests for data transformers and utilities.

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

Test fixtures are located in `src/test/fixtures/` for consistent and realistic mock data.

## License

MIT

## Acknowledgments

- NASA NeoWs API for providing asteroid data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
