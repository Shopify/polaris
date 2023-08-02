import {color} from '../token-groups/color';

import {createMetadataThemeVariant, createMetadataThemePartial} from './utils';
import {metadataThemeBase} from './base';

// Note: This partial theme is separate from the complete variant theme below
// (as partials are inserted in a dedicated selector to avoid duplication)
export const metadataThemePartialHighContrast = createMetadataThemePartial({
  color,
});

export const metadataThemeHighContrast = createMetadataThemeVariant({
  ...metadataThemeBase,
  ...metadataThemePartialHighContrast,
});

export type MetadataThemeHighContrast = typeof metadataThemeHighContrast;
