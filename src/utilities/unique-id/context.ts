import React from 'react';

import {UniqueIdFactory} from './unique-id-factory';

export const UniqueIdFactoryContext = React.createContext<
  UniqueIdFactory | undefined
>(undefined);
