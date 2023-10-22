// eslint-disable-next-line no-restricted-imports
import {useEffect, useLayoutEffect} from 'react';

import {isServer} from './target';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;
