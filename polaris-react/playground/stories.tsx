import {Playground} from './Playground';
import {KitchenSink} from './KitchenSink';
import {DetailsPage} from './DetailsPage';

export default {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Playground',
  parameters: {
    layout: 'fullscreen',
    chromatic: {disable: true},
  },
};

export {DetailsPage, KitchenSink, Playground};
