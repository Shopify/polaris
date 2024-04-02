// Adapted from https://usehooks-ts.com/react-hook/use-media-query
import {useCallback, useState} from 'react';

import {isServer} from './target';
import {useIsomorphicLayoutEffect} from './use-isomorphic-layout-effect';

// Derived from https://github.com/argyleink/open-props/blob/09e70c03c0a2533d06ec823f47490f018eb27f23/src/props.media.css#L21-L24
export const queryAliases = {
  touch: '(hover: none) and (pointer: coarse)',
  stylus: '(hover: none) and (pointer: fine)',
  pointer: '(hover) and (pointer: coarse)',
  mouse: '(hover) and (pointer: fine)',
} as const;

export type QueryAlias = keyof typeof queryAliases;

const isQueryAlias = (
  queryOrAlias: string,
): queryOrAlias is keyof typeof queryAliases =>
  Object.prototype.hasOwnProperty.call(queryAliases, queryOrAlias);

// Prevents TS from widening union types to `string`
// eslint-disable-next-line @typescript-eslint/ban-types
type AnyString = string & {};

interface UseMediaQueryOptions {
  /**
   * The default value to return if the hook is being run on the server.
   * @default false
   */
  defaultValue?: boolean;
  /**
   * If `true`, the hook will initialize reading the media query.
   * In SSR, you should set it to `false`, returning `options.defaultValue` or `false` initially.
   * @default false
   */
  initializeWithValue?: boolean;
}

export function useMediaQuery(
  queryOrAlias: AnyString | QueryAlias,
  options: UseMediaQueryOptions = {},
): boolean {
  const {defaultValue = false, initializeWithValue = false} = options;

  const query = isQueryAlias(queryOrAlias)
    ? queryAliases[queryOrAlias]
    : queryOrAlias;

  const getMatches = useCallback(
    (query: string): boolean => {
      if (isServer) return defaultValue;

      return window.matchMedia(query).matches;
    },
    [defaultValue],
  );

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);

    return defaultValue;
  });

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [getMatches, query]);

  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14
    // (https://github.com/juliencrn/usehooks-ts/pull/135)
    if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange);
    } else {
      mediaQueryList.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handleChange);
      } else {
        mediaQueryList.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}
