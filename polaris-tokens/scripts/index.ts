import {experimentalMetaData, metadata} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toTokenValues({...metadata, ...experimentalMetaData}),
    toJSON({...metadata, ...experimentalMetaData}),
    toMediaConditions(metadata.breakpoints),
    toStyleSheet(metadata, experimentalMetaData),
  ]);
})();
