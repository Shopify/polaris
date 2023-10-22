import {createContext} from 'react';

import type {LinkLikeComponent} from './types';

export const LinkContext = createContext<LinkLikeComponent | undefined>(
  undefined,
);
