import {createContext} from 'react';
import {ScrollLockManager} from './scroll-lock-manager';

export const ScrollLockManagerContext = createContext<ScrollLockManager | null>(
  null,
);
