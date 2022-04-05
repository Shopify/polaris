import type {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('content-type', 'text/html');
  res.send('Token API coming soon.');
};

export default handler;
