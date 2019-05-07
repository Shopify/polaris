import {AppProviderContextType} from './AppProvider';
import {ThemeProviderContext} from './ThemeProvider';

export interface PolarisContext extends AppProviderContextType {
  theme: ThemeProviderContext;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
