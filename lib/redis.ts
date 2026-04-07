import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { serverEnv } from '@/lib/env';

export const redis = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL(),
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN()
});

export const deployRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m')
});
