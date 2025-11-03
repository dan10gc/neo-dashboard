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

interface Config {
  API: APIConfig;
  DB: DBConfig;
  AUTH: AUTHConfig;
  // JWT: JWTConfig;
}

process.loadEnvFile(".env");

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
};
