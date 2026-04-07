import { NextRequest, NextResponse } from 'next/server';
import { deployRateLimit } from '@/lib/redis';
import { sanitizePath } from '@/lib/path';
import { serverEnv } from '@/lib/env';

export async function POST(request: NextRequest) {
  const adminSecret = request.headers.get('x-admin-secret');
  if (adminSecret !== serverEnv.ADMIN_SECRET_KEY()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = request.headers.get('x-forwarded-for') ?? 'local';
  const rate = await deployRateLimit.limit(`deploy:${ip}`);
  if (!rate.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = (await request.json()) as {
    projectName: string;
    files: Array<{ path: string; content: string }>;
  };

  const safeFiles = body.files.map((file) => ({
    ...file,
    path: sanitizePath(file.path)
  }));

  return NextResponse.json({
    success: true,
    projectName: body.projectName,
    sanitizedFiles: safeFiles.length
  });
}
