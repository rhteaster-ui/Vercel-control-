import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const deploymentId = request.nextUrl.searchParams.get('deploymentId');
  if (!deploymentId) {
    return NextResponse.json({ error: 'deploymentId is required' }, { status: 400 });
  }

  const eventUrl = new URL(`https://api.vercel.com/v2/deployments/${deploymentId}/events`);
  eventUrl.searchParams.set('follow', '1');

  const upstream = await fetch(eventUrl, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`
    }
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  });
}
