import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

export default function ViewTransition({children}) {
  const {beforePopState, isReady} = useRouter();

  useEffect(() => {
    beforePopState(() => {
      if (isReady && document.startViewTransition !== undefined) {
        document.startViewTransition(async () => {
          console.log('Calling startViewTransition');

          return await new Promise((resolve) => {
            return resolve(true);
          });
        });
      }

      return true;
    });
  });

  return children;
}
