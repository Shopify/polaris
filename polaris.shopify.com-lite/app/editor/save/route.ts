import {NextRequest, NextResponse} from 'next/server';

import {Content} from '@/types';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    const body = await req.json();
    const tsFileContent = createTsFileContent(body.content);
    fs.writeFileSync('./content.ts', tsFileContent);
    return NextResponse.json({message: 'Content saved'});
  } else {
    return NextResponse.json({message: 'Not allowed'});
  }
}

function stringify(obj: Object): string {
  return (
    JSON.stringify(obj, null, 2)
      // .replace(`},\n  {`, `},\n\n  {`)
      .replace(/"([a-z]+)":/gi, '$1:')
  );
}

function createTsFileContent(content: Content): string {
  return `import { Content } from '@/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages: Content['pages'] = ${stringify(content.pages)};

const blocks: Content['blocks'] = ${stringify(content.blocks)};

const images: Content['images'] = ${stringify(content.images)};

export const content: Content = { pages, blocks, images };
`;
}
