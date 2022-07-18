import {migration} from '..';
import {createCheckFn} from '../../../utilities/testUtils';

const check = createCheckFn(__dirname);

describe('template-babel migration', () => {
  check({
    it: 'should convert Object.assign to spread operator',
    fixture: 'template-babel',
    migration,
  });
});
