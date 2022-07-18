import {migration} from '..';
import {createCheckFn} from '../../../utilities/testUtils';

const check = createCheckFn(__dirname);

describe('template-sass migration', () => {
  check({
    it: 'should reverse the names of CSS declarations',
    fixture: 'template-sass',
    migration,
  });
});
