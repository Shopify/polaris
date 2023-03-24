import {prettyExeca, startLocalServer} from './util.mjs';

const genSiteMap = async () => {
  const outputFile = 'public/sitemap.xml';

  const server = startLocalServer('dev');
  server.catch((err) => {
    if (!server.killed) {
      console.error(err.stderr);
      process.exit(-1);
    }
  });

  try {
    await prettyExeca(
      'npx',
      [
        'get-site-urls',
        'http://localhost:3000',
        `--output=${outputFile}`,
        '--alias=https://polaris.shopify.com',
      ],
      {
        stdout: 'inherit',
        stderr: 'inherit',
        pretty: {
          text: 'Generating sitemap',
          successText: 'Sitemap generated',
          failText: 'Unable to generate sitemap',
        },
      },
    );
  } finally {
    if (server) {
      // Kill the yarn command _and_ the child process running node
      await server.kill();
    }
  }
};

export default genSiteMap;
