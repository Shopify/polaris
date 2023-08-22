import {themeDefault} from './themes';
import type {Exact, MetadataBase} from './types';

export const metadata = themeDefault;

export type Metadata = typeof metadata;

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
export function createMetadata<T extends Exact<MetadataBase, T>>(metadata: T) {
  return metadata;
}
