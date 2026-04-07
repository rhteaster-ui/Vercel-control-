import { NextRequest, NextResponse } from 'next/server';
import { sanitizePath } from '@/lib/path';

interface DeployFile {
  file: string;
  data: string;
}

interface DeployPayload {
  name: string;
  files: DeployFile[];
}

function getAdminSecretFromRequest(request: NextRequest): string | null {
  return request.headers.get('x-admin-secret');
}

export async function POST(request: NextRequest) {
  const adminSecret = getAdminSecretFromRequest(request);
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as DeployPayload;
  const safeFiles = body.files
    .map((entry) => ({ file: sanitizePath(entry.file), data: entry.data }))
    .filter((entry) => entry.file.length > 0);

  const vercelResponse = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: body.name,
      target: 'production',
      files: safeFiles,
      project: process.env.VERCEL_PROJECT_ID
    })
  });

  const json = await vercelResponse.json();
  return NextResponse.json(json, { status: vercelResponse.status });
}
