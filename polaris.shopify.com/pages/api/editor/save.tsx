import type {NextApiResponse, NextApiRequest} from 'next';
import {Content} from '../../../src/components/Editor/types';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === 'development' && req.method === 'POST') {
    const {content} = req.body;
    const tsFileContent = createTsFileContent(content);
    fs.writeFileSync('./src/content.ts', tsFileContent);
    res.status(200).send({message: 'Content saved'});
  } else {
    res.status(500).send({message: 'Not allowed'});
  }
};

function createTsFileContent(content: Content): string {
  return `import { Content } from './components/Editor/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages : Content['pages'] = ${JSON.stringify(content.pages, null, 2)};

const images : Content['images'] = ${JSON.stringify(content.images, null, 2)};

export const content : Content = { pages, images };
`;
}

export default handler;
