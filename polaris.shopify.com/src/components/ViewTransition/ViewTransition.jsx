import React, {useEffect, useRef} from 'react';

export default function ViewTransition({children}) {
  useEffect(() => {
    if (document.startViewTransition !== undefined) {
      document.startViewTransition(() => {
        console.log('Calling startViewTransition');

        return new Promise((resolve) => {
          return resolve(true);
        });
      });
    }
  });

  return children;
}
