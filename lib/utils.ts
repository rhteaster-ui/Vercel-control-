import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function sanitizePath(inputPath: string): string {
  const normalized = inputPath.replace(/\\/g, '/').replace(/^\/+/, '');

  const segments = normalized
    .split('/')
    .filter(Boolean)
    .filter((segment) => segment !== '.')
    .filter((segment) => segment !== '..');

  return segments.join('/');
}
