import * as React from 'react';
import {ScrollableContext} from '../../types';

const {Provider, Consumer} = React.createContext<ScrollableContext>({});

export {Provider, Consumer};
