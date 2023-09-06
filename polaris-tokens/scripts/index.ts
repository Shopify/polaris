import {themes, themesPartials} from '../src/themes';

import {toValues} from './toValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toValues(themes),
    toJSON(themes),
    toMediaConditions(themes.light.breakpoints),
    toStyleSheet(themes, themesPartials),
  ]);
})();
