import {metaTokens} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toTokenValues(metaTokens),
    toJSON(metaTokens),
    toStyleSheet(metaTokens),
  ]);
})();
