import {useContext} from 'react';

import type {FeaturesConfig} from './types';
import {FeaturesContext} from './context';

export function useFeatures() {
  const features = useContext(FeaturesContext);

  if (!features) {
    throw new Error('No Features were provided.');
  }

  return features;
}

/**
 * Temporary child render prop for accessing features in class components.
 */
export function UseFeatures(props: {
  children: (featuresConfig: FeaturesConfig) => JSX.Element;
}) {
  const features = useFeatures();

  return props.children(features);
}
