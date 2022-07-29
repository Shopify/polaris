import {migration} from '..';
import {createCheckFn} from '../../../utilities/testUtils';

const check = createCheckFn(__dirname);

describe('replace-text-component {migration}', () => {
  check({
    migration,
    it: 'should rename size to variant',
    fixture: 'replace-text-component',
  });

  check({
    migration,
    it: 'should replace Heading with the proper Text variant',
    fixture: 'replace-text-component',
  });
});
