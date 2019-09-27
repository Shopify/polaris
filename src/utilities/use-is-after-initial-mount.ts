import {useState, useEffect} from 'react';

export function useIsAfterInitialMount() {
  const [isAfterInitialMount, setIsAfterInitialMount] = useState(false);

  useEffect(() => {
    setIsAfterInitialMount(true);
  }, []);

  return isAfterInitialMount;
}
