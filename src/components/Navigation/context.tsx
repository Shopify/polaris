import * as React from 'react';

export interface NavigationContextType {
  location: string;
  onNavigationDismiss?(): void;
}

const NavigationContext = React.createContext<NavigationContextType>({
  location: '',
});

export default NavigationContext;
