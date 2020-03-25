import React from 'react';

import {LinkLikeComponent} from './types';

export const LinkContext = React.createContext<LinkLikeComponent | undefined>(
  undefined,
);
