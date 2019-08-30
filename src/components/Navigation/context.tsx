import React from 'react';

interface NavigationContextType {
  location: string;
  onNavigationDismiss?(): void;
  withinContentContainer?: boolean;
}

export const NavigationContext = React.createContext<NavigationContextType>({
  location: '',
});
