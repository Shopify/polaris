/* eslint-disable no-console */

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/favicon.ico', (req, res) => {
  res.status(404).end();
});

app.use(
  '/assets/',
  express.static(`${__dirname}/build/assets/`, {
    maxAge: '365d',
  }),
);

app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
  console.log(
    `⚡️ Example app running on http://localhost:${port} ← cmd + click to open`,
  );
});
