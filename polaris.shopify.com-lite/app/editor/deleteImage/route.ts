import fs from 'fs';
import {NextRequest, NextResponse} from 'next/server';

export type DeleteImageResponse =
  | {
      status: 'success';
    }
  | {status: 'error'; message: string};

export async function DELETE(req: NextRequest, res: NextResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.error();
  }
  const body = await req.json();
  if (body.fileName) {
    const filePath = `./public/uploads/${body.fileName}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({status: 'success'});
    }
  }
  return NextResponse.error();
}
