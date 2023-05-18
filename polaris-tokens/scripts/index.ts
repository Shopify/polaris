import type {Metadata} from '../src';
import {metadata, metadataUplift} from '../src';

import {toTokenValues} from './toTokenValues';
import {toJSON} from './toJSON';
import {toMediaConditions} from './toMediaConditions';
import {toStyleSheet} from './toStyleSheet';

(async () => {
  await Promise.all([
    toTokenValues({...metadata, ...metadataUplift} as Metadata),
    toJSON(metadata),
    toMediaConditions(metadata.breakpoints),
    toStyleSheet(metadata),
  ]);
})();
