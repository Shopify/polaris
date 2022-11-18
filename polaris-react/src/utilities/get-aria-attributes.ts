import type React from 'react';

export function getAriaAttributes<T extends React.AriaAttributes>(props: T) {
  return Object.fromEntries(
    Object.entries(props).filter(([prop]) => prop.startsWith('aria-')),
  );
}
