import * as fs from 'fs';
import {content} from '@/content';
import satori from 'satori';
import sharp from 'sharp';
import {NextRequest, NextResponse} from 'next/server';

const WIDTH = 1200;
const HEIGHT = 630;

const interRegular = fs.readFileSync('./app/og.png/Inter-Regular.ttf');
const interSemiBold = fs.readFileSync('./app/og.png/Inter-SemiBold.ttf');

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get('id');
  const page = content.pages.find((page) => page.id === id);

  if (!page) {
    return NextResponse.error();
  }

  const logoDimensions = {width: 913, height: 1035};
  const logo = fs.readFileSync('./app/og.png/shopify_glyph_white.png');
  const logoSrc = `data:image/png;base64,${Buffer.from(logo).toString(
    'base64',
  )}`;

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 100,
        background: 'black',
        color: 'white',
        height: HEIGHT,
        width: WIDTH,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 10,
        }}
      >
        <img
          src={logoSrc}
          width={logoDimensions.width / 22}
          height={logoDimensions.height / 22}
          style={{top: -4}}
        />
        <div style={{fontSize: 30, letterSpacing: -1, fontWeight: 400}}>
          Polaris
        </div>
      </div>
      <div style={{fontSize: 88, letterSpacing: -3, fontWeight: 600}}>
        {page.title}
      </div>
      <div
        style={{
          fontSize: 30,
          lineHeight: 1.5,
          letterSpacing: -1,
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          color: '#767676',
        }}
      >
        <p style={{margin: 0}}>{page.excerpt}</p>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interSemiBold,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );

  const image = await sharp(Buffer.from(svg)).png().toBuffer();

  if (image) {
    const response = new Response(image);
    response.headers.set('Content-Type', 'image/png');
    return response;
  }

  return NextResponse.error();
}
