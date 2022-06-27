import {useState, useLayoutEffect} from 'react';
import {tokens, getMediaConditions} from '@shopify/polaris-tokens';

const Breakpoints = {
  navigationBarCollapsed: '768px',
  stackedContent: '1043px',
};

const noWindowMatches: MediaQueryList = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

function noop() {}

export function navigationBarCollapsed() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}

const mediaConditionEntries = Object.entries(
  getMediaConditions(tokens.breakpoints),
);

const queryEntries = mediaConditionEntries
  .map(([token, mediaConditions]) =>
    Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
      const breakpointAlias = token.split('-')[1];
      const name = `${breakpointAlias}${capitalize(direction)}`;

      // e.g. smUp, smDown, smOnly, etc.
      return [name, mediaCondition];
    }),
  )
  .flat();

function getMatches() {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    return Object.fromEntries(
      queryEntries.map(([name, query]) => [
        name,
        window.matchMedia(query).matches,
      ]),
    );
  }

  return Object.fromEntries(queryEntries.map(([name]) => [name, false]));
}

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = useState(getMatches());

  useLayoutEffect(() => {
    const mediaQueryLists = queryEntries.map(([_, query]) =>
      window.matchMedia(query),
    );

    const handler = () => setBreakpoints(getMatches);

    mediaQueryLists.forEach((mql) => {
      if (mql.addListener) {
        mql.addListener(handler);
      } else {
        mql.addEventListener('change', handler);
      }
    });

    return () =>
      mediaQueryLists.forEach((mql) => {
        if (mql.removeListener) {
          mql.removeListener(handler);
        } else {
          mql.removeEventListener('change', handler);
        }
      });
  }, []);

  return breakpoints;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
