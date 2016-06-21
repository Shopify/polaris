/* eslint no-console: "off" */

import path from 'path';
import open from 'open';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import {webpack as webpackConfig, host, port} from '../config';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  open(`http://${host}:${port}`);
  console.log(`Listening at http://${host}:${port}`);
});
