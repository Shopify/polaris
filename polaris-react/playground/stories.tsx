import {Playground} from './Playground';
import {KitchenSink} from './KitchenSink';
import {DetailsPage} from './DetailsPage';
import {OrdersPage} from './OrdersPage';

export default {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Test Pages',
  parameters: {
    layout: 'fullscreen',
    chromatic: {disable: true},
  },
};

export {Playground, DetailsPage, OrdersPage, KitchenSink};
