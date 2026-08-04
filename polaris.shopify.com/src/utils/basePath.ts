/**
 * The path the site is served from. Next.js rewrites `next/link` hrefs and
 * `_next/*` asset URLs for us, but anything we hand to the browser ourselves
 * (raw `<img>`/`<video>`/`<iframe>` sources, `<link>` tags, `next/image` with
 * `unoptimized: true`, image paths that come out of markdown) has to be
 * prefixed by hand.
 *
 * The value is inlined at build time by `next.config.js`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prefix a site-absolute path with the base path. Absolute URLs, data URIs and
 * anchors are returned untouched.
 */
export function withBasePath(path: string): string;
export function withBasePath(path: undefined): undefined;
export function withBasePath(path?: string): string | undefined;
export function withBasePath(path?: string): string | undefined {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  return `${basePath}${path}`;
}
