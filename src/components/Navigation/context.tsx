import * as React from 'react';

export interface NavigationContextType {
  location: string;
  onNavigationDismiss?(): void;
  withinContentContainer?: boolean;
}

const NavigationContext = React.createContext<NavigationContextType>({
  location: '',
});

export default NavigationContext;
