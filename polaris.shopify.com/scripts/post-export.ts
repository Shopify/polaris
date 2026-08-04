import path from 'path';
import {existsSync, readdirSync, statSync} from 'fs';
import {mkdir, readFile, writeFile} from 'fs/promises';

import ora from 'ora';

import {basePath} from '../constants';
import redirects from '../redirects';

/**
 * Everything that has to happen to `out/` after `next build` for the export to
 * work on GitHub Pages:
 *
 * 1. Turn each entry in `redirects.js` into a meta-refresh HTML stub, because
 *    `output: 'export'` drops the `redirects()` config entirely.
 * 2. Write `.nojekyll` so Pages serves `_next/` (Jekyll ignores underscore
 *    directories).
 * 3. Add `noindex` to the Playroom HTML, which Playroom's own webpack build
 *    emits and so never passes through `pages/_app.tsx`.
 * 4. Repoint the placeholder images in the component examples at local copies,
 *    so viewing a page makes no requests to Shopify.
 */
const outDir = path.join(process.cwd(), 'out');

/**
 * Component examples illustrate `Avatar`, `EmptyState`, `MediaCard` and friends
 * with photos hosted on Shopify's asset CDNs. They're plain images rather than
 * beacons, but the archived site is supposed to call out to nobody, and
 * self-hosting them also means the examples survive if those URLs ever go away.
 *
 * The copies live in `public/images/examples/`. Rewriting here rather than in
 * `pages/examples/*.tsx` keeps the substitution in one place and gets the
 * rendered example, the source listing and the sandbox handoff in one pass —
 * they all read from the same exported bundles.
 */
const VENDORED_IMAGES: Record<string, string> = {
  'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg':
    '/images/examples/black-leather-choker-necklace.jpg',
  'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg':
    '/images/examples/black-orange-stripes.jpg',
  'https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850':
    '/images/examples/business-woman-smiling-in-office.jpg',
  'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746':
    '/images/examples/freelance-designer-working-on-laptop.jpg',
  'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg':
    '/images/examples/tucan-scarf.jpg',
  'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg':
    '/images/examples/settings-customizecart.svg',
  'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png':
    '/images/examples/emptystate-files.png',
  'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png':
    '/images/examples/shopify-secondary-inverted.png',
  'https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png':
    '/images/examples/emptystate-files-product.png',
};

interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

/** Every file under `dir` with one of `extensions`. */
const walkFiles = (dir: string, extensions: string[]): string[] => {
  const files: string[] = [];

  readdirSync(dir).forEach((entry) => {
    const entryPath = path.join(dir, entry);
    if (statSync(entryPath).isDirectory()) {
      files.push(...walkFiles(entryPath, extensions));
    } else if (extensions.includes(path.extname(entry))) {
      files.push(entryPath);
    }
  });

  return files;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const isExternal = (destination: string) => /^[a-z]+:\/\//i.test(destination);

/** Prefix site-internal destinations with the base path. */
const resolveDestination = (destination: string) =>
  isExternal(destination) ? destination : `${basePath}${destination}`;

const stubHtml = (destination: string) => {
  const target = resolveDestination(destination);
  const url = escapeHtml(target);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${url}" />
    <link rel="canonical" href="${url}" />
    <title>Redirecting&hellip;</title>
    <script>window.location.replace(${JSON.stringify(target).replace(
      /</g,
      '\\u003c',
    )});</script>
  </head>
  <body>
    <p>This page has moved to <a href="${url}">${url}</a>.</p>
  </body>
</html>
`;
};

/**
 * Whether something other than an exported page already answers this path.
 *
 * A stub deliberately overwrites an exported page (`<source>.html`): on the old
 * site `redirects()` ran ahead of rendering, so a legacy URL like `/tokens`
 * went to `/tokens/color` even though a `/tokens` page existed, and the
 * archived URLs should land where they always did.
 *
 * Files copied from `public/` are a different matter — `/playroom` is a real
 * directory of built Playroom assets, and clobbering it would break the
 * sandbox. With `trailingSlash: false` Next never emits `<page>/index.html`, so
 * a directory index here always came from `public/`.
 */
const isTaken = (routePath: string) => {
  const target = path.join(outDir, routePath);
  return (
    existsSync(path.join(target, 'index.html')) ||
    (existsSync(target) && statSync(target).isFile())
  );
};

/** Whether the export serves this path at all, exported page included. */
const isServed = (routePath: string) => {
  const [pathname] = routePath.split(/[#?]/);
  return isTaken(pathname) || existsSync(path.join(outDir, `${pathname}.html`));
};

/**
 * Expand a `:param` redirect against the pages that actually got exported.
 *
 * `{source: '/foundations/content/:slug', destination: '/content/:slug'}`
 * becomes one entry per exported page under `/content`.
 */
const expand = ({source, destination, ...rest}: Redirect): Redirect[] => {
  const match = destination.match(/^(.*?)\/:([A-Za-z]+)\*?$/);

  if (!match) return [{source, destination, ...rest}];

  const [, destinationPrefix, param] = match;
  const dir = path.join(outDir, destinationPrefix);

  if (!existsSync(dir)) return [];

  const slugs = new Set<string>();

  readdirSync(dir).forEach((entry) => {
    const entryPath = path.join(dir, entry);
    if (statSync(entryPath).isDirectory()) {
      if (existsSync(path.join(entryPath, 'index.html'))) slugs.add(entry);
    } else if (entry.endsWith('.html')) {
      slugs.add(entry.replace(/\.html$/, ''));
    }
  });

  return [...slugs].map((slug) => ({
    ...rest,
    source: source.replace(`:${param}`, slug),
    destination: destination.replace(`:${param}`, slug),
  }));
};

/**
 * Pick the destination for a source that several rules claim.
 *
 * Next used the first matching rule, full stop, which left a handful of legacy
 * URLs (`/components/card`, say) pointing at a page that had since been renamed
 * — a 404 on the live site. The archive prefers the first destination that
 * actually resolves and only falls back to first-match when none do, so those
 * URLs land somewhere useful instead of nowhere.
 */
const pickDestination = (destinations: string[]) =>
  destinations.find(
    (destination) => isExternal(destination) || isServed(destination),
  ) ?? destinations[0];

const genRedirectStubs = async () => {
  const spinner = ora('Writing redirect stubs into out/').start();

  const candidates = new Map<string, string[]>();
  let skipped = 0;

  for (const {source, destination} of (redirects as Redirect[]).flatMap(
    expand,
  )) {
    // `:param` sources we couldn't expand, plus anything already served from
    // `public/`.
    if (source.includes(':') || isTaken(source)) {
      skipped += 1;
      continue;
    }

    candidates.set(source, [...(candidates.get(source) ?? []), destination]);
  }

  const written = new Map<string, string>();

  for (const [source, destinations] of candidates) {
    const destination = pickDestination(destinations);
    const file = path.join(outDir, `${source}.html`);
    await mkdir(path.dirname(file), {recursive: true});
    await writeFile(file, stubHtml(destination), 'utf-8');
    written.set(source, destination);
  }

  spinner.succeed(
    `Wrote ${written.size} redirect stubs into out/ (${skipped} skipped)`,
  );

  // Checked once everything is on disk so a stub pointing at another stub
  // counts as resolved. Anything left over was already broken in the old
  // `redirects()` config; it's reported rather than silently shipped.
  const deadEnds = [...written]
    .filter(([, destination]) => !isExternal(destination))
    .filter(([, destination]) => !isServed(destination))
    .map(([source, destination]) => `${source} -> ${destination}`);

  if (deadEnds.length) {
    ora('').warn(
      `${
        deadEnds.length
      } redirects point at pages that don't exist:\n  ${deadEnds.join('\n  ')}`,
    );
  }
};

const genNoJekyll = async () => {
  await writeFile(path.join(outDir, '.nojekyll'), '', 'utf-8');
  ora('').succeed('Wrote out/.nojekyll');
};

const noindexPlayroom = async () => {
  const playroomDir = path.join(outDir, 'playroom');
  if (!existsSync(playroomDir)) return;

  const htmlFiles = walkFiles(playroomDir, ['.html']);

  await Promise.all(
    htmlFiles.map(async (file) => {
      const html = await readFile(file, 'utf-8');
      if (html.includes('name="robots"')) return;
      await writeFile(
        file,
        html.replace(/<head>/i, '<head><meta name="robots" content="noindex">'),
        'utf-8',
      );
    }),
  );

  ora('').succeed(`Added noindex to ${htmlFiles.length} Playroom pages`);
};

const localiseExampleImages = async () => {
  const spinner = ora('Repointing example images at local copies').start();

  const missing = Object.values(VENDORED_IMAGES).filter(
    (localPath) => !existsSync(path.join(outDir, localPath)),
  );

  if (missing.length) {
    spinner.fail(`Missing vendored images in out/: ${missing.join(', ')}`);
    throw new Error('Vendored example images are not in the export');
  }

  const files = walkFiles(outDir, ['.html', '.js', '.json']);
  let rewritten = 0;

  await Promise.all(
    files.map(async (file) => {
      const contents = await readFile(file, 'utf-8');
      let updated = contents;

      Object.entries(VENDORED_IMAGES).forEach(([remote, localPath]) => {
        updated = updated.split(remote).join(`${basePath}${localPath}`);
      });

      if (updated !== contents) {
        await writeFile(file, updated, 'utf-8');
        rewritten += 1;
      }
    }),
  );

  spinner.succeed(`Repointed example images in ${rewritten} files`);
};

(async function run() {
  if (!existsSync(outDir)) {
    throw new Error(
      `Expected an export in ${outDir}. Run \`next build\` first.`,
    );
  }

  await genRedirectStubs();
  await genNoJekyll();
  await noindexPlayroom();
  await localiseExampleImages();
})();
