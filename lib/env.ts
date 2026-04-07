const required = [
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'ADMIN_SECRET_KEY',
  'VERCEL_TOKEN',
  'VERCEL_TEAM_ID'
] as const;

type RequiredKey = (typeof required)[number];

export function getEnv(key: RequiredKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
