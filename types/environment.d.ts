export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      API_URL: string;
      SMTP_SERVER: string;
      SMTP_NAME: string;
      SMTP_USER_ID: string;
      SMTP_PASSWORD: string;
      SMTP_TLS_PORT: string;
      SMTP_SSL_PORT: string;
      JWT_SECRET: string;
    }
  }
}
