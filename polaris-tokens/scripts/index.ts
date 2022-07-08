import {metaTokens} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toTokenValues(metaTokens),
    toJSON(metaTokens),
    toMediaConditions(metaTokens.breakpoints),
    toStyleSheet(metaTokens),
  ]);
})();
