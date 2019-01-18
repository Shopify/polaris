import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {FrameContext} from '../../types';

const defaultContext: FrameContext = {
  frame: {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  },
};

const {Provider, Consumer} = React.createContext<FrameContext>(defaultContext);

export {Provider, Consumer};
