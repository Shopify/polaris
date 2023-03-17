import type {NextApiResponse, NextApiRequest} from 'next';
import fs from 'fs';

export type DeleteImageResponse =
  | {
      status: 'success';
    }
  | {status: 'error'; message: string};

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(500).end();
  }
  switch (req.method) {
    case 'DELETE':
      const filePath = `./public/uploads/${req.body.fileName}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.status(200).json({status: 'success'});
      } else {
        return res.status(500).json({
          status: 'error',
          message: `File ${filePath} does not exist`,
        });
      }

    default:
      return res.status(500).json({
        status: 'error',
        message: `Method ${req.method} not allowed`,
      });
  }
};

export default handler;
