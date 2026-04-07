import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

import { getEnv } from '@/lib/env';

export const redis = new Redis({
  url: getEnv('UPSTASH_REDIS_REST_URL'),
  token: getEnv('UPSTASH_REDIS_REST_TOKEN')
});

export const deployRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'ratelimit:deploy'
});
