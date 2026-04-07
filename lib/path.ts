export function sanitizePath(inputPath: string): string {
  const normalized = inputPath.replace(/\\/g, '/').trim();
  const withoutLeadingSlash = normalized.replace(/^\/+/, '');

  if (!withoutLeadingSlash || withoutLeadingSlash.includes('..')) {
    throw new Error('Invalid path.');
  }

  const safe = withoutLeadingSlash
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(/[^a-zA-Z0-9._-]/g, ''))
    .join('/');

  if (!safe || safe.includes('..')) {
    throw new Error('Path traversal detected.');
  }

  return safe;
}
