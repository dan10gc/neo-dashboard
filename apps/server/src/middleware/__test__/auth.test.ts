import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { requireGitHubAuth } from '../auth.js';
import { Octokit } from '@octokit/rest';

// Mock Octokit class
vi.mock('@octokit/rest', () => ({
  Octokit: vi.fn(),
}));

// Mock logger
vi.mock('../../utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('GitHub Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();

    // Set up mock request, response, and next
    mockRequest = {
      headers: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn();
  });

  it('should throw 401 when no authorization header', async () => {
    // Arrange
    mockRequest.headers = {};

    // Act & Assert
    await expect(
      requireGitHubAuth(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow('Missing or invalid Authorization header');

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should throw 401 when authorization header is not Bearer', async () => {
    // Arrange
    mockRequest.headers = {
      authorization: 'Basic sometoken',
    };

    // Act & Assert
    await expect(
      requireGitHubAuth(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow('Missing or invalid Authorization header');

    expect(mockNext).not.toHaveBeenCalled();
  });

  it.skip('should throw 403 when user is not authorized', async () => {
    // Arrange
    mockRequest.headers = {
      authorization: 'Bearer valid_token',
    };

    const mockGetAuthenticated = vi.fn().mockResolvedValue({
      data: {
        login: 'unauthorized-user',
        id: 999,
      },
    });

    vi.mocked(Octokit).mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: mockGetAuthenticated,
        },
      },
    } as unknown as InstanceType<typeof Octokit>));

    // Act & Assert
    await expect(
      requireGitHubAuth(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow('User is not authorized to access this resource');

    expect(mockNext).not.toHaveBeenCalled();
  });

  it.skip('should call next() when user is authorized', async () => {
    // Arrange
    mockRequest.headers = {
      authorization: 'Bearer valid_token',
    };

    const mockGetAuthenticated = vi.fn().mockResolvedValue({
      data: {
        login: 'test-user', // Matches GITHUB_ALLOWED_USER from setup
        id: 123,
      },
    });

    vi.mocked(Octokit).mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: mockGetAuthenticated,
        },
      },
    } as unknown as InstanceType<typeof Octokit>));

    // Act - should not throw
    // await expect(
    await requireGitHubAuth(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    // ).resolves.not.toThrow();

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it.skip('should throw error when GitHub API call fails', async () => {
    // Arrange
    mockRequest.headers = {
      authorization: 'Bearer invalid_token',
    };

    const mockGetAuthenticated = vi.fn().mockRejectedValue(new Error('Bad credentials'));

    vi.mocked(Octokit).mockImplementationOnce(() => ({
      rest: {
        users: {
          getAuthenticated: mockGetAuthenticated,
        },
      },
    } as unknown as InstanceType<typeof Octokit>));

    // Act & Assert
    // GitHub API error bubbles up (will be caught by error handler → 500)
    await expect(
      requireGitHubAuth(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      )
    ).rejects.toThrow('Bad credentials');

    expect(mockNext).not.toHaveBeenCalled();
  });
});