import {useState, useEffect} from 'react';

/**
 * useIsAfterInitialMount will trigger a re-render to provide
 * you with an updated value. Using this you enhance server-side
 * code that can only run on the client.
 * @returns MutableRefObject<T> - Returns a ref object with the
 * results from invoking initial value
 * @example
 * function ComponentExample({children}) {
 *  const isMounted = useIsAfterInitialMount();
 *  const content = isMounted ? children : null;
 *
 *  return <>{content}</>;
 * }
 */
export function useIsAfterInitialMount() {
  const [isAfterInitialMount, setIsAfterInitialMount] = useState(false);

  useEffect(() => {
    setIsAfterInitialMount(true);
  }, []);

  return isAfterInitialMount;
}
