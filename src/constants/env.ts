export const ENV = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  //이메일 인증 보내는 메일주소
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  //로그인 보안 토큰
  jwtSecret: process.env.JWT_SECRET || "default-jwt-secret",
  //aws s3  연결
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
} as const;
