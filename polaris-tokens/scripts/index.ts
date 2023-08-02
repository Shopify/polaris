import {metadata} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';
import {toStyleSheetThemes} from './toStyleSheetThemes';

(async () => {
  await Promise.all([
    toTokenValues(metadata),
    toJSON(metadata),
    toMediaConditions(metadata.breakpoints),
    toStyleSheet(metadata),
    toStyleSheetThemes(),
  ]);
})();
