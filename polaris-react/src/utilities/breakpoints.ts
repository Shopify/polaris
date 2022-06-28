import {useState, useLayoutEffect} from 'react';
import {
  tokens,
  getMediaConditions,
  BreakpointsTokenGroup,
} from '@shopify/polaris-tokens';

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

const breakpointsQueryEntries = getBreakpointsQueryEntries(tokens.breakpoints);

function getMatches() {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    return Object.fromEntries(
      breakpointsQueryEntries.map(([name, query]) => [
        name,
        window.matchMedia(query).matches,
      ]),
    );
  }

  return Object.fromEntries(
    breakpointsQueryEntries.map(([name]) => [name, false]),
  );
}

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = useState(getMatches());

  useLayoutEffect(() => {
    const mediaQueryLists = breakpointsQueryEntries.map(([_, query]) =>
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

/**
 * Converts `breakpoints` tokens into directional media query entries.
 *
 * @example
 * const breakpointsQueryEntries = getBreakpointsQueryEntries(breakpoints);
 * breakpointsQueryEntries === [
 *   ['xsUp', '(min-width: ...)'],
 *   ['xsDown', '(max-width: ...)'],
 *   ['xsOnly', '(min-width: ...) and (max-width: ...)'],
 *   ['smUp', '(min-width: ...) and (max-width: ...)'],
 *   ['mdUp', '(min-width: ...) and (max-width: ...)'],
 *   // etc.
 * ]
 */
export function getBreakpointsQueryEntries(breakpoints: BreakpointsTokenGroup) {
  const mediaConditionEntries = Object.entries(getMediaConditions(breakpoints));

  return mediaConditionEntries
    .map(([token, mediaConditions]) =>
      Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
        const breakpointAlias = token.split('-')[1];

        // e.g. smUp, smDown, smOnly, etc.
        const name = `${breakpointAlias}${capitalize(direction)}`;

        return [name, mediaCondition];
      }),
    )
    .flat();
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
