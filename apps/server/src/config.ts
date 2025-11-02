type APIConfig = {
  // platform: string;
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
    PORT: Number(envOrThrow("PORT")),
  },
  DB: {
    URL: envOrThrow("DATABASE_URL"),
  },
  AUTH: {
    GITHUB_ALLOWED_USER: envOrThrow("GITHUB_ALLOWED_USER"),
  },
};
