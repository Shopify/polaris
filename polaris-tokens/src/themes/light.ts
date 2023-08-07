import {color} from '../token-groups/color';

import {
  createMetadataThemeVariant,
  createMetadataThemePartial,
  withValueExperimental,
} from './utils';
import {metadataThemeBase} from './base';

// Note: This partial theme is separate from the complete variant theme below
// (as partials are inserted in a dedicated selector to avoid duplication)
export const metadataThemePartialLight = createMetadataThemePartial({
  color: withValueExperimental(color),
});

export const metadataThemeLight = createMetadataThemeVariant({
  ...metadataThemeBase,
  ...metadataThemePartialLight,
});

export type MetadataThemeLight = typeof metadataThemeLight;
