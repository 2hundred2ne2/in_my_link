export const ENV = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
} as const;
