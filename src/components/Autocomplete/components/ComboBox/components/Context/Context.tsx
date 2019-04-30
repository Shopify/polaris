import * as React from 'react';
import {ComboBoxContext} from '../../../types';

const {Provider, Consumer} = React.createContext<ComboBoxContext>({});

export {Provider, Consumer};
