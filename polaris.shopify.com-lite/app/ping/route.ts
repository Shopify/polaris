import type {NextApiResponse, NextApiRequest} from 'next';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('OK');
};

export default handler;
