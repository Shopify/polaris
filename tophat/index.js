/* eslint-disable no-console */
require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['transform-react-jsx', 'babel-plugin-transform-object-rest-spread'],
});
const webpack = require('webpack');
const express = require('express');
const argv = require('yargs').argv;

const config = require('./webpack.config.js');
const render = require('./render.tsx').default;
const readMarkDownFiles = require('./parseMarkdown.js').default;

const app = express();
const port = process.env.PORT || 3000;

const codeExamples = readMarkDownFiles();

function appMiddleware(req, res, next) {
  const html = render([{path: '/assets/main.js'}], {codeExamples});

  res.send(html);
  next();
}

if (argv.watch) {
  const buildPromise = new Promise((resolve) => {
    webpack(config).watch({}, (err) => {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  }).then(() => {
    console.log('✅ Build complete.');
  });

  app.use((req, res, next) => buildPromise.then(next, next));
}

app.use(
  '/assets/',
  express.static(`${__dirname}/../tophat/build/assets/`, {
    maxAge: '365d',
  }),
);

app.use('*', appMiddleware);

app.listen(port, () => {
  console.log();
  console.log(
    `⚡️ Example app running on http://localhost:${port} ← cmd + click to open`,
  );
  if (argv.watch) {
    console.log('⏳ Building the app…');
  }
});
