import type {NextApiResponse, NextApiRequest} from 'next';
import fs from 'fs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {icon} = req.query;
    const iconsvg = fs.readFileSync(
      `../polaris-icons/dist/svg/${icon}`,
      'utf-8',
    );
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
    );
    res.end(iconsvg);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    console.error(err);
  }
};

export default handler;
