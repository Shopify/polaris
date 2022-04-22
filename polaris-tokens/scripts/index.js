const {osColorSchemes, tokens} = require('../dist/index');

const {toJSON} = require('./toJSON');
const {toStyleSheet} = require('./toStyleSheet');

(async () => {
  await Promise.all([toJSON(tokens), toStyleSheet(tokens, osColorSchemes)]);
})();
