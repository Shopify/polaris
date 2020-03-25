import React from 'react';

import {LinkContext} from './context';

export function useLink() {
  return React.useContext(LinkContext);
}
