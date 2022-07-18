import migration from '../replace-sass-spacing';
import {check} from '../../../utilities/testUtils';

describe('replace-sass-spacing migration', () => {
  check({
    migration,
    it: 'should replace the `spacing` function with the correct CSS variable',
    original: `
    .Card {
      padding: spacing(loose) spacing(extra-loose);
      border-radius: var(--p-border-radius-2, border-radius());
      box-shadow: var(--p-shadow-card, shadow());
    }
    .ButtonContainer {
      right: spacing();
      top: spacing(loose);
    }
  `,
    expected: `
    .Card {
      padding: var(--p-space-5) var(--p-space-8);
      border-radius: var(--p-border-radius-2, border-radius());
      box-shadow: var(--p-shadow-card, shadow());
    }
    .ButtonContainer {
      right: var(--p-space-4);
      top: var(--p-space-5);
    }
  `,
  });
});
