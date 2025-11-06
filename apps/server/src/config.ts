type APIConfig = {
  // platform: string;
  CLIENT_URL?: string;
  PORT: number;
};

type DBConfig = {
  URL: string;
  // migrationConfig: MigrationConfig;
};

type AUTHConfig = {
  GITHUB_ALLOWED_USER: string;
};

type SentryConfig = {
  DSN: string;
  ENVIRONMENT?: string;
  TRACES_SAMPLE_RATE?: number;
  PROFILES_SAMPLE_RATE?: number;
};

interface Config {
  API: APIConfig;
  DB: DBConfig;
  AUTH: AUTHConfig;
  SENTRY: SentryConfig;
  // JWT: JWTConfig;
}

// Try to load .env file if it exists (development), ignore if not found (production)
try {
  process.loadEnvFile(".env");
} catch {
  // No .env file - using platform environment variables
}

function envOrThrow(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return value;
}

export const env: Config = {
  API: {
    CLIENT_URL: envOrThrow("CLIENT_URL"),
    PORT: Number(envOrThrow("PORT")),
  },
  DB: {
    URL: envOrThrow("DATABASE_URL"),
  },
  AUTH: {
    GITHUB_ALLOWED_USER: envOrThrow("GITHUB_ALLOWED_USER"),
  },
  SENTRY: {
    DSN: process.env.SENTRY_DSN || "",
    ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE
      ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
      : 1.0,
    PROFILES_SAMPLE_RATE: process.env.SENTRY_PROFILES_SAMPLE_RATE
      ? parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE)
      : 1.0,
  },
};
