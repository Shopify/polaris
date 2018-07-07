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

const codeExampleTuples = readMarkDownFiles();
const codeExamples = {};
codeExampleTuples.forEach((tuple) => {
  codeExamples[tuple[0]] = tuple[1];
});

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
    console.log('✅ Component examples build complete');
  });

  app.use((req, res, next) => buildPromise.then(next, next));
}

app.use(
  '/assets/',
  express.static(`${__dirname}/../visual-regression-testing-build/assets/`, {
    maxAge: '365d',
  }),
);

app.use('*', appMiddleware);

app.listen(port, () => {
  console.log('Example app running on http://localhost:3000');
  if (argv.watch) {
    console.log('⏳ Building code examples from component README files…');
  }
});
