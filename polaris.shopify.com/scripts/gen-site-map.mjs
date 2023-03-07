import {execa} from 'execa';
import path from 'path';

const genSiteMap = async () => {
  const outputFile = 'public/sitemap.xml';

  console.log('⚙️  Generating sitemap.xml...');
  console.log('⚙️  Starting dev server using next dev...');
  const nextBin = path.join(process.cwd(), 'node_modules/.bin/next');
  const server = execa(nextBin, ['dev']);

  server.stdout.pipe(process.stdout);

  console.log('wait 5 seconds');
  await sleep(10000);
  console.log('wait done');

  const {stdout} = await execa('npx', [
    'get-site-urls',
    'http://localhost:3000',
    `--output=${outputFile}`,
    '--alias=https://polaris.shopify.com',
  ]);
  console.log(stdout);

  await server.kill();
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default genSiteMap;
