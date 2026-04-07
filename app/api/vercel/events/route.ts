import { NextRequest, NextResponse } from 'next/server';

import { getEnv } from '@/lib/env';

export async function GET(request: NextRequest) {
  const deploymentId = request.nextUrl.searchParams.get('deploymentId');
  if (!deploymentId) {
    return NextResponse.json({ error: 'deploymentId is required' }, { status: 400 });
  }

  const url = new URL(`https://api.vercel.com/v3/deployments/${deploymentId}/events`);
  url.searchParams.set('follow', '1');
  url.searchParams.set('teamId', getEnv('VERCEL_TEAM_ID'));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getEnv('VERCEL_TOKEN')}`
    }
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  });
}
