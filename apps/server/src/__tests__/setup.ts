import { vi } from 'vitest';

// Mock process.loadEnvFile before any imports that use it
process.loadEnvFile = vi.fn();

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.GITHUB_ALLOWED_USER = 'test-user';

// Mock the logger to avoid console spam during tests
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));