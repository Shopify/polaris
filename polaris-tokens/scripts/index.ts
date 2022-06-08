import {tokens} from '../src';

import {toJSON} from './toJSON';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([toJSON(tokens), toStyleSheet(tokens)]);
})();
