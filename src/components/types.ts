import {Context as AppProviderContext} from './AppProvider';
import {Context as ThemeProviderContext} from './ThemeProvider';

export interface PolarisContext
  extends AppProviderContext,
    ThemeProviderContext {}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
