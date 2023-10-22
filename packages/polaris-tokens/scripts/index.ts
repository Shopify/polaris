import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';
import {toValues} from './toValues';

(async () => {
  await Promise.all([toMediaConditions(), toStyleSheet(), toValues()]);
})();
