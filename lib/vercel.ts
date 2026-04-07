import { serverEnv } from '@/lib/env';

const VERCEL_API_BASE = 'https://api.vercel.com';

export async function fetchVercelEventsStream(deploymentId: string): Promise<Response> {
  const params = new URLSearchParams({
    follow: '1'
  });

  return fetch(`${VERCEL_API_BASE}/v13/deployments/${deploymentId}/events?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${serverEnv.VERCEL_API_TOKEN()}`
    }
  });
}
