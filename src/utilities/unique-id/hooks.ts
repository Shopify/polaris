import {useContext, useRef} from 'react';
import {UniqueIdFactoryContext} from './context';

export function useUniqueId(prefix = '', override?: string) {
  const idFactory = useContext(UniqueIdFactoryContext);

  if (!idFactory) {
    throw new Error(
      'No UniqueIdFactory was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  }

  // Use a ref to ensure that the returned ID does not increment on every
  // rerendering of a component
  // The first time a component is rendered the ref will be empty.
  // In that case fill it with the next available ID
  // Only populating this on first render means we don't create a new Id on
  // every render
  const currentComponentIdRef = useRef<string | null>(null);

  if (!currentComponentIdRef.current) {
    // If an override was specified, then use that instead of incrementing the ID
    currentComponentIdRef.current = override || idFactory.nextId(prefix);
  }

  return currentComponentIdRef.current;
}
