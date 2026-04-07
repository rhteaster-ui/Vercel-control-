import { NextRequest, NextResponse } from 'next/server';

import { getEnv } from '@/lib/env';
import { deployRateLimit } from '@/lib/redis';
import { sanitizePath } from '@/lib/utils';

type DeployBody = {
  projectName: string;
  files: Array<{ file: string; content: string }>;
};

export async function POST(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== getEnv('ADMIN_SECRET_KEY')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await deployRateLimit.limit(String(ip));
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const body = (await request.json()) as DeployBody;

  const fileData = body.files.map((entry) => {
    const sanitized = sanitizePath(entry.file);
    if (!sanitized) {
      throw new Error('Invalid file path detected');
    }

    return {
      file: sanitized,
      data: entry.content
    };
  });

  const response = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('VERCEL_TOKEN')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: body.projectName,
      target: 'production',
      projectSettings: {
        framework: null
      },
      files: fileData,
      teamId: getEnv('VERCEL_TEAM_ID')
    })
  });

  const result = await response.json();
  return NextResponse.json(result, { status: response.status });
}
