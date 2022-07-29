import {mountWithApp} from 'tests/utilities';

import {Section} from '../Section';
import {SectionContext} from '../context';
import {listboxSectionDataSelector} from '../selectors';

describe('Section', () => {
  describe('context', () => {
    it('renders SectionContextProvider with an id', () => {
      const section = mountWithApp(<Section title="title" />);

      expect(section).toContainReactComponent(SectionContext.Provider, {
        value: expect.any(String),
      });
    });
  });

  describe('list item', () => {
    it('renders a list item with role=presentation', () => {
      const section = mountWithApp(<Section title="title" />);

      expect(section).toContainReactComponent('li', {
        role: 'presentation',
      });
    });

    it('renders a list item with list box section data selector', () => {
      const section = mountWithApp(<Section title="title" />);

      expect(section).toContainReactComponent(
        'li' as any,
        listboxSectionDataSelector.props,
      );
    });
  });

  describe('list', () => {
    it('renders an unordered list with role="group', () => {
      const section = mountWithApp(<Section title="title" />);

      expect(section).toContainReactComponent('ul', {
        role: 'group',
      });
    });

    it('renders an unordered list with aria labelledby matching the context value', () => {
      const section = mountWithApp(<Section title="title" />);

      const contextValue = section.find(SectionContext.Provider)!.prop('value');
      const ariaLabelledByValue = section.find('ul')!.prop('aria-labelledby');

      expect(ariaLabelledByValue).toBe(contextValue);
    });
  });

  it('renders children', () => {
    const Child = () => <li>Child</li>;
    const section = mountWithApp(
      <Section title="title">
        <Child />
      </Section>,
    );

    expect(section).toContainReactComponent(Child);
  });
});
