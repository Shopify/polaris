import {useContext} from 'react';

import {FeaturesContext} from './context';
import type {FeaturesConfig} from './types';

export function useFeatures() {
  const features = useContext(FeaturesContext);

  if (!features) {
    throw new Error('No Features were provided.');
  }

  return features;
}

/**
 * Temp child render prop for accessing features in class components.
 */
export function UseFeatures(props: {
  children: (featuresConfig: FeaturesConfig) => JSX.Element;
}) {
  const features = useFeatures();

  return props.children(features);
}
