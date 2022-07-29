import {osColorSchemes, tokens} from '../src';

import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toJSON(tokens),
    toMediaConditions(tokens.breakpoints),
    toStyleSheet(tokens, osColorSchemes),
  ]);
})();
