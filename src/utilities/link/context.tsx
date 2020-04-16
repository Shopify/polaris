import React from 'react';

import type {LinkLikeComponent} from './types';

export const LinkContext = React.createContext<LinkLikeComponent | undefined>(
  undefined,
);
