import migration from '../replace-text-component';
import {check} from '../../../utilities/testUtils';

describe('replace-text-component migration', () => {
  check({
    migration,
    it: 'should rename size to variant',
    original: `
    import {DisplayText} from '@shopify/polaris';
    function App() {
      return <DisplayText size="large">Display text</DisplayText>;
    }
  `,
    expected: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text variant="heading3xl">Display text</Text>;
    }
  `,
  });

  check({
    migration,
    it: 'should replace Heading with the proper Text variant',
    original: `
    import {Heading} from '@shopify/polaris';
    function App() {
      return <Heading>Heading text</Heading>;
    }
  `,
    expected: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text variant="headingLg">Heading text</Text>;
    }
  `,
  });
});
