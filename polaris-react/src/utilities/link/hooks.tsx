import {useContext} from 'react';

import {LinkContext} from './context';

export function useLink() {
  return useContext(LinkContext);
}
