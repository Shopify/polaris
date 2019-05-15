import {AppProviderContextType} from './AppProvider';
import {ThemeProviderContextType} from './ThemeProvider';

export interface PolarisContext extends AppProviderContextType {
  theme: ThemeProviderContextType;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
