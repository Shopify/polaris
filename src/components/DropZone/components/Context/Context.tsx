import * as React from 'react';
import {DropZoneContext, Size} from '../../types';

const {Provider, Consumer} = React.createContext<DropZoneContext>({
  width: Size.ExtraLarge,
  height: Size.ExtraLarge,
  type: 'file',
});

export {Provider, Consumer};
