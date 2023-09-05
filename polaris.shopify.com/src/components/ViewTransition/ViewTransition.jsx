import React, {useEffect, useRef} from 'react';

export default function ViewTransition({children}) {
  useEffect(() => {
    if (document.startViewTransition !== undefined) {
      return document.startViewTransition(() => {
        console.log('Calling startViewTransition');

        return new Promise((resolve) => {
          return resolve(true);
        });
      });
    }

    // router.events.on('routeChangeStart', handler);

    return () => {
      // router.events.off('routeChangeStart', handler);
    };
  }, []);

  return children;
}
