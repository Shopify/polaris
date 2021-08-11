import {useContext} from 'react';

import {SectionContext} from './context';

export function useSection() {
  const context = useContext(SectionContext);
  return context;
}
