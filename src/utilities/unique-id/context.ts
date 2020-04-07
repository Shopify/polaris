import React from 'react';

import type {UniqueIdFactory} from './unique-id-factory';

export const UniqueIdFactoryContext = React.createContext<
  UniqueIdFactory | undefined
>(undefined);
