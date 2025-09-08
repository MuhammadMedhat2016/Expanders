declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    SQL_HOST: string;
    SQL_USER: string;
    SQL_PASS: string;
    SQL_DATABASE_NAME: string;
    MONGO_HOST: string;
    MONGO_PORT: string;
    GMAIL_USER: string;
    GMAIL_APP_PASSWORD: string;
    JWT_SECRET: string;

  }
}
