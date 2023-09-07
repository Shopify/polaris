import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

export default function ViewTransition({children}) {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (document.startViewTransition !== undefined) {
        document.startViewTransition(async () => {
          return await new Promise((resolve) => {
            return resolve(true);
          });
        });
      }
    };

    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [router.events]);

  return children;
}
