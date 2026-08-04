import http from 'http';
import path from 'path';
import {createReadStream, existsSync, statSync} from 'fs';

import {basePath} from '../constants';

/**
 * Serves `out/` the way GitHub Pages does, so the export can be checked
 * locally before it's published:
 *
 * - everything is mounted under the base path (`/polaris-react`)
 * - `/foo` falls back to `foo/index.html`, then `foo.html`
 * - unknown paths get `404.html` with a 404 status
 *
 * Usage: `pnpm build && pnpm serve` then open http://localhost:3000/polaris-react
 */
const outDir = path.join(process.cwd(), 'out');
const port = Number(process.env.POLARIS_WEBSITE_PORT ?? 3000);

const MIME_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

const isFile = (candidate: string) =>
  existsSync(candidate) && statSync(candidate).isFile();

/** GitHub Pages' resolution order for a request path. */
const resolve = (routePath: string) => {
  const candidates = [
    routePath,
    path.join(routePath, 'index.html'),
    `${routePath}.html`,
  ];
  return candidates.find(isFile);
};

const send = (
  res: http.ServerResponse,
  status: number,
  file: string | undefined,
) => {
  if (!file) {
    res.writeHead(status, {'content-type': 'text/plain; charset=utf-8'});
    res.end('Not found');
    return;
  }

  res.writeHead(status, {
    'content-type':
      MIME_TYPES[path.extname(file).toLowerCase()] ??
      'application/octet-stream',
  });
  createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    const {pathname} = new URL(req.url ?? '/', 'http://localhost');
    const decoded = decodeURIComponent(pathname);

    if (basePath && !decoded.startsWith(basePath)) {
      res.writeHead(302, {
        location: basePath + (decoded === '/' ? '' : decoded),
      });
      res.end();
      return;
    }

    const relative = decoded.slice(basePath.length) || '/';
    // Keep the request inside `out/`.
    const routePath = path.join(outDir, path.normalize(relative));
    if (!routePath.startsWith(outDir)) {
      send(res, 403, undefined);
      return;
    }

    const file = resolve(routePath);

    if (file) {
      send(res, 200, file);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`404 ${decoded}`);
      send(res, 404, resolve(path.join(outDir, '404')));
    }
  })
  .listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Serving ./out on http://localhost:${port}${basePath}`);
  });
