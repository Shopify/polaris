import {execa} from 'execa';
import terminate from 'terminate/promise.js';

const genSiteMap = async () => {
  const outputFile = 'public/sitemap.xml';

  await execa('yarn', ['next', 'build'], {stdio: 'inherit'});
  const server = execa('yarn', ['next', 'start'], {stdio: 'inherit'});

  try {
    await execa('npx', [
      'get-site-urls',
      'http://localhost:3000',
      `--output=${outputFile}`,
      '--alias=https://polaris.shopify.com',
    ]);
  } finally {
    if (server) {
      // Kill the yarn command _and_ the child process running node
      await terminate(server.pid, 'SIGKILL');
    }
  }
};

export default genSiteMap;
