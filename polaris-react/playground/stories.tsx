import {Playground} from './Playground';
import {KitchenSink} from './KitchenSink';
import {DetailsPage} from './DetailsPage';
import {WebComponents} from './WebComponents';
import {WebComponents2} from './WebComponents2';
import {WebComponentsManual} from './WebComponentsManual';

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default {
  title: 'Playground/Playground',
  parameters: {
    layout: 'fullscreen',
    chromatic: {disable: true},
  },
};

export {
  Playground,
  KitchenSink,
  DetailsPage,
  WebComponents,
  WebComponents2,
  WebComponentsManual,
};
