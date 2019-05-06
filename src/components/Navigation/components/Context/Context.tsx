import * as React from 'react';
import {NavigationContext} from '../../types';

const {Provider, Consumer} = React.createContext<NavigationContext>({
  location: '',
});

export {Provider, Consumer};
