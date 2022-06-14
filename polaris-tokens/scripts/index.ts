import {tokens} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([toTokenValues(), toJSON(tokens), toStyleSheet(tokens)]);
})();
