import {execa} from 'execa';
import path from 'path';

const genSiteMap = async () => {
  const outputFile = 'public/sitemap.xml';

  const nextBin = path.join(process.cwd(), 'node_modules/.bin/next');
  const server = execa(nextBin, ['dev']);

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
