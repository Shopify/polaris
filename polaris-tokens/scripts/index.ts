import {metadata} from '../src';
import {themes, themesPartials} from '../src/themes';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toTokenValues(metadata),
    toJSON(metadata),
    toMediaConditions(metadata.breakpoints),
    toStyleSheet(themes, themesPartials),
  ]);
})();
