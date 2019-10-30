import {useContext} from 'react';
import {SectionContext} from '../context/section';

export function useSection() {
  const section = useContext(SectionContext);
  return section;
}
