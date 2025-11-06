import { vi } from 'vitest';

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DB_URL = 'postgresql://test:test@localhost:5432/test';
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