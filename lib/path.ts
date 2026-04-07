const BLOCKED_SEGMENTS = new Set(['..', '.', '']);

export function sanitizePath(inputPath: string): string {
  const normalized = inputPath.replace(/\\/g, '/').trim();
  const safeParts = normalized
    .split('/')
    .filter((part) => !BLOCKED_SEGMENTS.has(part))
    .map((part) => part.replace(/[^a-zA-Z0-9._-]/g, ''))
    .filter(Boolean);

  return safeParts.join('/');
}
