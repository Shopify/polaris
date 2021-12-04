const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, '../../../tsconfig.json'),
});

const {customPropertiesAllowedListPlugin} = require('./custom-properties-allowed-list');

module.exports = customPropertiesAllowedListPlugin;
