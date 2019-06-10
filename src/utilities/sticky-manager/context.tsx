import {createContext} from 'react';
import {StickyManager} from './sticky-manager';

export const StickyManagerContext = createContext<StickyManager | null>(null);
