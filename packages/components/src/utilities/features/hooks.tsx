import {useContext} from 'react';

import {FeaturesContext} from './context';

export function useFeatures() {
  const features = useContext(FeaturesContext);

  if (!features) {
    throw new Error('No Features were provided.');
  }

  return features;
}
