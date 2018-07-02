/* eslint-disable no-console */
require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['transform-react-jsx', 'babel-plugin-transform-object-rest-spread'],
});
const webpack = require('webpack');
const express = require('express');

const config = require('./webpack.config.js');
const render = require('./render.tsx').default;
const readMarkDownFiles = require('./parseMarkdown.js').default;

const compiler = webpack(config);
const app = express();

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

const buildPromise = new Promise((resolve) => {
  compiler.watch({}, (err) => {
    if (err) {
      console.log(err);
    }
    resolve();
  });
}).then(() => {
  console.log('Done building!');
});

app.use((req, res, next) => buildPromise.then(next, next));

app.use(
  '/assets/',
  express.static(`${__dirname}/../visual-regression-testing-build/assets/`, {
    maxAge: '365d',
  }),
);

app.use('*', appMiddleware);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
