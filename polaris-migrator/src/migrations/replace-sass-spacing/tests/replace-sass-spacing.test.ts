import {migration} from '..';
import {createCheckFn} from '../../../utilities/testUtils';

const check = createCheckFn(__dirname);

describe('replace-sass-spacing migration', () => {
  check({
    it: 'should replace the `spacing` function with the correct CSS variable',
    fixture: 'replace-sass-spacing',
    migration,
  });
});
