import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import {Playground} from './Playground';
import {KitchenSink} from './KitchenSink';
import {DetailsPage} from './DetailsPage';
import {MobilePrototype} from './MobilePrototype';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'Playground/Playground',
  parameters: {
    layout: 'fullscreen',
    chromatic: {disable: true},
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    }
  },
};

export {Playground, KitchenSink, DetailsPage, MobilePrototype};
