import React from 'react';
import {Transformer} from '@napi-rs/image';

import fs from 'node:fs';
import path from 'node:path';
import {writeFile, mkdir, rm} from 'fs/promises';
import ora from 'ora';
import satori, {type SatoriOptions} from 'satori';
import typedSiteJSON from '../.cache/site';

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 60;
const LOGO_SCALE = 0.9;
// To maintain a 1:1 aspect ratio, we can't use regular CSS (we're using a
// limited set of yoga), so we calculate it manually here.
const IMG_SIZE = (HEIGHT - PADDING * 2) * LOGO_SCALE;

const interDir = path.join(
  path.dirname(require.resolve('inter-ui')),
  'Inter (web)',
);

const imgDir = path.join(process.cwd(), 'public/og-images');

const shopifyLogo = (
  <svg
    height="30"
    width="30"
    viewBox="0 0 109.5 124.5"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
  >
    <path
      d="M74.7,14.8c0,0-1.4,0.4-3.7,1.1c-0.4-1.3-1-2.8-1.8-4.4c-2.6-5-6.5-7.7-11.1-7.7c0,0,0,0,0,0
  c-0.3,0-0.6,0-1,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-2-2.2-4.6-3.2-7.7-3.1c-6,0.2-12,4.5-16.8,12.2c-3.4,5.4-6,12.2-6.7,17.5
  c-6.9,2.1-11.7,3.6-11.8,3.7c-3.5,1.1-3.6,1.2-4,4.5C9.1,40.7,0,111.2,0,111.2l75.6,13.1V14.6C75.2,14.7,74.9,14.7,74.7,14.8z
    M57.2,20.2c-4,1.2-8.4,2.6-12.7,3.9c1.2-4.7,3.6-9.4,6.4-12.5c1.1-1.1,2.6-2.4,4.3-3.2C56.9,12,57.3,16.9,57.2,20.2z M49.1,4.3
  c1.4,0,2.6,0.3,3.6,0.9c-1.6,0.8-3.2,2.1-4.7,3.6c-3.8,4.1-6.7,10.5-7.9,16.6c-3.6,1.1-7.2,2.2-10.5,3.2
  C31.7,19.1,39.8,4.6,49.1,4.3z M37.4,59.3c0.4,6.4,17.3,7.8,18.3,22.9c0.7,11.9-6.3,20-16.4,20.6c-12.2,0.8-18.9-6.4-18.9-6.4
  l2.6-11c0,0,6.7,5.1,12.1,4.7c3.5-0.2,4.8-3.1,4.7-5.1c-0.5-8.4-14.3-7.9-15.2-21.7C23.8,51.8,31.4,40.1,48.2,39
  c6.5-0.4,9.8,1.2,9.8,1.2l-3.8,14.4c0,0-4.3-2-9.4-1.6C37.4,53.5,37.3,58.2,37.4,59.3z M61.2,19c0-3-0.4-7.3-1.8-10.9
  c4.6,0.9,6.8,6,7.8,9.1C65.4,17.7,63.4,18.3,61.2,19z"
    />
    <path
      d="M78.1,123.9l31.4-7.8c0,0-13.5-91.3-13.6-91.9c-0.1-0.6-0.6-1-1.1-1c-0.5,0-9.3-0.2-9.3-0.2s-5.4-5.2-7.4-7.2
  V123.9z"
    />
  </svg>
);

const defaultImage = (
  <svg
    viewBox="0 0 99 99"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: IMG_SIZE,
      height: IMG_SIZE,
      opacity: 0.15,
      position: 'absolute',
      right: `${PADDING}px`,
      top: `${PADDING}px`,
    }}
  >
    <path
      d="M98.9999 49.5C98.9999 76.838 76.838 98.9999 49.5 98.9999C22.1619 98.9999 0 76.838 0 49.5C0 22.1619 22.1619 0 49.5 0C76.838 0 98.9999 22.1619 98.9999 49.5Z"
      fill="#fff"
    />
    <path
      d="M99.0001 49.6709C99.0001 76.9144 76.9149 98.9996 49.6714 98.9996C49.6714 71.7561 71.7566 49.6709 99.0001 49.6709Z"
      fill="#fff"
    />
    <path
      d="M49.5 0C49.5 27.3381 27.3381 49.5 0 49.5C27.3381 49.5 49.5 71.6618 49.5 98.9999C49.5 71.6618 71.6618 49.5 98.9999 49.5C71.6618 49.5 49.5 27.3381 49.5 0Z"
      fill="#000"
    />
  </svg>
);

const generateSvg = async (url, frontMatter, satoriConfig: SatoriOptions) => {
  const title = frontMatter.title;
  let logo = shopifyLogo;

  return satori(
    <div
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        padding: `${PADDING}px`,
        position: 'relative',
        display: 'flex',
        background: '#000',
        fontFamily: 'Inter',
        color: '#fff',
      }}
    >
      {defaultImage}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'auto',
          }}
        >
          <h1
            style={{
              flexGrow: '1',
              fontSize: '80px',
              fontWeight: '700',
              letterSpacing: '-0.01rem',
              margin: '0',
            }}
          >
            {title}
          </h1>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            opacity: '.5',
            fontSize: '24px',
            fontWeight: '500',
          }}
        >
          {logo} Polaris
        </div>
      </div>
    </div>,

    satoriConfig,
  );
};

const genOgImages = async () => {
  const spinner = ora(
    'Generating Open Graph images from .cache/site.ts',
  ).start();
  if (fs.existsSync(imgDir)) {
    await rm(imgDir, {recursive: true});
  }

  const interMedium = fs.readFileSync(path.join(interDir, 'Inter-Medium.woff'));
  const interBold = fs.readFileSync(path.join(interDir, 'Inter-Bold.woff'));

  const satoriConfig: SatoriOptions = {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: interMedium,
        weight: 500,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: interBold,
        weight: 700,
        style: 'normal',
      },
    ],
  };

  let completed = 0;
  return Promise.all(
    Object.entries({
      '/home': {
        frontMatter: {
          title: 'Polaris',
        },
      },
      ...typedSiteJSON,
    }).map(async ([url, {frontMatter}]) => {
      try {
        const imgPath =
          url === ''
            ? '/home'
            : new URL(url, 'https://polaris.shopify.com').pathname;
        const svg = await generateSvg(url, frontMatter, satoriConfig);

        const imgFile = `${imgDir}${imgPath}.png`;
        await mkdir(path.dirname(imgFile), {recursive: true});

        const pngData = await Transformer.fromSvg(svg)
          // svg comes in at 2x size for some reason.
          .crop(0, 0, WIDTH, HEIGHT)
          .png();
        await writeFile(imgFile, pngData);
        completed++;
      } catch (error) {
        spinner.fail(`Failed to generate Open Graph png for ${url}`);
        throw error;
      }
    }),
  ).then(() => {
    spinner.succeed(
      `Generated ${completed} Open Graph images from .cache/site.ts`,
    );
  });
};

export default genOgImages;
