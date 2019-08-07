const withCSS = require('@zeit/next-css');

const options = {distDir: 'build'};

module.exports = withCSS(options);
