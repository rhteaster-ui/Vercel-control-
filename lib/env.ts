export function requireServerEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const serverEnv = {
  UPSTASH_REDIS_REST_URL: () => requireServerEnv('UPSTASH_REDIS_REST_URL'),
  UPSTASH_REDIS_REST_TOKEN: () => requireServerEnv('UPSTASH_REDIS_REST_TOKEN'),
  ADMIN_SECRET_KEY: () => requireServerEnv('ADMIN_SECRET_KEY'),
  VERCEL_API_TOKEN: () => requireServerEnv('VERCEL_API_TOKEN')
};
