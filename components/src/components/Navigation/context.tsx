import {createContext} from 'react';

interface NavigationContextType {
  location: string;
  onNavigationDismiss?(): void;
  withinContentContainer?: boolean;
}

export const NavigationContext = createContext<NavigationContextType>({
  location: '',
});
