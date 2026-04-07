import { NextRequest, NextResponse } from 'next/server';
import { fetchVercelEventsStream } from '@/lib/vercel';

export async function GET(request: NextRequest) {
  const deploymentId = request.nextUrl.searchParams.get('deploymentId');
  if (!deploymentId) {
    return NextResponse.json({ error: 'deploymentId is required' }, { status: 400 });
  }

  const upstream = await fetchVercelEventsStream(deploymentId);
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Failed to read Vercel events stream' }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  });
}
