import {useContext, useRef} from 'react';
import {UniqueIdFactoryContext} from './context';

/**
 * Returns a unique id that remains consistent across multiple rerenders of the
 * same hook
 * @param prefix Defines a prefix for the ID. You probably want to set this to
 *   the name of the component you're calling `useUniqueId` in.
 * @param overrideId Defines a fixed value to use instead of generating a unique
 *   ID. Useful for components that allow consumers to specify a fixed ID.
 */
export function useUniqueId(prefix = '', overrideId = '') {
  const idFactory = useContext(UniqueIdFactoryContext);

  // By using a ref to store the uniqueId for each incovation of the hook and
  // checking that it is not already populated we ensure that we don't generate
  // a new ID on ever rerender of a component.
  const uniqueIdRef = useRef<string | null>(null);

  if (!idFactory) {
    throw new Error(
      'No UniqueIdFactory was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  }

  // If an override was specified, then use that instead of using a unique ID
  // Hooks can't be called conditionally so this has to go after all use* calls
  if (overrideId) {
    return overrideId;
  }

  // If a unique id has not yet been generated, then get a new one
  if (!uniqueIdRef.current) {
    uniqueIdRef.current = idFactory.nextId(prefix);
  }

  return uniqueIdRef.current;
}
