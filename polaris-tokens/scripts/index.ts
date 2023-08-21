import {themeDefault, themes, themesPartials} from '../src/themes';

import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';
import {toValues} from './toValues';

(async () => {
  await Promise.all([
    toJSON(themeDefault, themes),
    toMediaConditions(themeDefault.breakpoints),
    toStyleSheet(themeDefault, themesPartials),
    toValues(themeDefault, themes),
  ]);
})();
