import {execa} from 'execa';
import path from 'path';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const genSiteMap = async () => {
  const outputFile = 'public/sitemap.xml';

  console.log(
    `👾 Starting a development server (to generate sitemap and screenshots)`,
  );

  const nextBin = path.join(process.cwd(), 'node_modules/.bin/next');
  const server = execa(nextBin, ['dev']);

  await sleep(3000);

  console.log(`👾 Generating sitemap...`);

  const {stdout} = await execa('npx', [
    'get-site-urls',
    'http://localhost:3000',
    `--output=${outputFile}`,
    '--alias=https://polaris.shopify.com',
  ]);
  console.log(stdout);

  await server.kill();
};

export default genSiteMap;
