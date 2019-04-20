import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import {RadioButton, Checkbox, InlineError} from 'components';
import ChoiceList from '../ChoiceList';

describe('<ChoiceList />', () => {
  let choices: ({
    label: string;
    value: string;
    helpText?: React.ReactNode;
    renderChildren?(): React.ReactNode;
  })[];

  beforeEach(() => {
    choices = [
      {label: 'One', value: 'one'},
      {label: 'Two', value: 'two'},
      {label: 'Three', value: 'three'},
    ];
  });

  it('renders a fieldset', () => {
    const element = shallowWithAppProvider(
      <ChoiceList selected={[]} choices={choices} />,
    );
    expect(element.find('fieldset').exists()).toBe(true);
  });

  describe('title', () => {
    it('renders a legend for the fieldset', () => {
      const element = shallowWithAppProvider(
        <ChoiceList title="My title" selected={[]} choices={choices} />,
      );
      expect(element.find('legend').text()).toBe('My title');
    });
  });

  describe('choices', () => {
    it('renders a choice with the label, value, and helpText properties', () => {
      choices = [
        choices[0],
        choices[1],
        {...choices[2], helpText: 'Some help text'},
      ];

      const choiceElements = shallowWithAppProvider(
        <ChoiceList selected={[]} choices={choices} />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('label')).toBe(choices[index].label);
        expect(choiceElement.prop('value')).toBe(choices[index].value);
        expect(choiceElement.prop('helpText')).toBe(choices[index].helpText);
      });
    });

    describe('with valid children property returning node', () => {
      const children = <span>Child</span>;

      it('renders a choice with children content', () => {
        const renderChildrenSpy = jest.fn(() => children);
        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            renderChildren: renderChildrenSpy,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={[]} choices={choices} />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements.contains(children)).toBe(true);
      });
    });

    describe('with valid children property returning node when current choice is selected', () => {
      const children = <span>Child</span>;

      it('renders a choice with children content when choice is selected ', () => {
        const selectedIndexes = [2];
        const selected = selectedIndexes.map((index) => choices[index].value);
        const renderChildrenSpy = jest.fn(
          (isSelected) => isSelected && children,
        );
        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            renderChildren: renderChildrenSpy,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={selected} choices={choices} />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements.contains(children)).toBe(true);
      });

      it('renders a choice with children wrapper div when choice is selected', () => {
        const selectedIndex = 2;
        const selectedIndexes = [selectedIndex];
        const selected = selectedIndexes.map((index) => choices[index].value);
        const renderChildrenSpy = jest.fn(
          (isSelected) => isSelected && children,
        );

        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            renderChildren: renderChildrenSpy,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={selected} choices={choices} />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(
          choiceElements
            .find('li')
            .at(selectedIndex)
            .find('div')
            .exists(),
        ).toBeTruthy();
      });

      it('does not render a choice with children content when choice is not selected', () => {
        const renderChildrenSpy = jest.fn(
          (isSelected) => isSelected && children,
        );

        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            renderChildren: renderChildrenSpy,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={[]} choices={choices} />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements.contains(children)).toBe(false);
      });

      it('does not render a choice with children wrapper div when choice is not selected', () => {
        const selectedIndex = 0;
        const indexWithChildren = 2;
        const selectedIndexes = [selectedIndex];
        const selected = selectedIndexes.map((index) => choices[index].value);
        const renderChildrenSpy = jest.fn(
          (isSelected) => isSelected && children,
        );

        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            renderChildren: renderChildrenSpy,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={selected} choices={choices} />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(
          choiceElements
            .find('li')
            .at(indexWithChildren)
            .find('div')
            .exists(),
        ).toBeFalsy();
      });
    });

    describe('with invalid children property', () => {
      const children = <span>Invalid Child</span>;

      it('does not render a choice with children content', () => {
        choices = [
          choices[0],
          choices[1],
          {
            ...choices[2],
            children,
          },
        ] as any;

        const choiceElements = shallowWithAppProvider(
          <ChoiceList selected={[]} choices={choices} />,
        );

        expect(choiceElements.contains(children)).toBe(false);
      });
    });
  });

  describe('selected', () => {
    it('sets the provided choices to be selected', () => {
      const selectedIndexes = [0, 2];
      const selected = selectedIndexes.map((index) => choices[index].value);
      const choiceElements = shallowWithAppProvider(
        <ChoiceList selected={selected} choices={choices} />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('checked')).toBe(
          selectedIndexes.includes(index),
        );
      });
    });
  });

  describe('onChange()', () => {
    it('is called with the newly-selected choices', () => {
      let selected = [choices[0].value];
      const spy = jest.fn((newSelected: string[]) => {
        selected = newSelected;
      });
      const choiceList = mountWithAppProvider(
        <ChoiceList
          name="MyChoiceList"
          allowMultiple
          onChange={spy}
          selected={selected}
          choices={choices}
        />,
      );
      const choiceElements = choiceList.find(Checkbox);

      changeCheckedForChoice(choiceElements.at(1));
      expect(spy).toHaveBeenLastCalledWith(['one', 'two'], 'MyChoiceList');
      choiceList.setProps({selected});

      changeCheckedForChoice(choiceElements.at(2));
      expect(spy).toHaveBeenLastCalledWith(
        ['one', 'two', 'three'],
        'MyChoiceList',
      );
      choiceList.setProps({selected});

      changeCheckedForChoice(choiceElements.at(0));
      expect(spy).toHaveBeenLastCalledWith(['two', 'three'], 'MyChoiceList');
      choiceList.setProps({selected});
    });

    function changeCheckedForChoice(choice: ReactWrapper<any, any>) {
      choice.simulate('click');
    }
  });

  describe('name', () => {
    it('provides a unique name when none is provided', () => {
      const choiceElements = shallowWithAppProvider(
        <ChoiceList selected={[]} choices={choices} />,
      ).find(RadioButton);
      let name: string;

      choiceElements.forEach((choiceElement) => {
        const choiceName = choiceElement.prop<string>('name');
        if (name == null) {
          name = choiceName;
        } else {
          expect(choiceName).toBe(name);
        }

        expect(typeof choiceName).toBe('string');
      });
    });

    it('uses the same name for every choice', () => {
      const name = 'MyChoiceList';
      const choiceElements = shallowWithAppProvider(
        <ChoiceList name={name} selected={[]} choices={choices} />,
      ).find(RadioButton);
      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(name);
      });
    });

    it('postpends [] when multiple options are allowed', () => {
      const name = 'MyChoiceList';
      const choiceElements = shallowWithAppProvider(
        <ChoiceList
          allowMultiple
          name={name}
          selected={[]}
          choices={choices}
        />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(`${name}[]`);
      });
    });
  });

  describe('allowMultiple', () => {
    it('renders a radio button for each option when allowMultiple is not true', () => {
      let element = shallowWithAppProvider(
        <ChoiceList selected={[]} choices={choices} />,
      );
      expect(element.find(RadioButton)).toHaveLength(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);

      element = shallowWithAppProvider(
        <ChoiceList selected={[]} choices={choices} allowMultiple={false} />,
      );
      expect(element.find(RadioButton)).toHaveLength(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);
    });

    it('renders a checkbox each option when allowMultiple is true', () => {
      const element = shallowWithAppProvider(
        <ChoiceList allowMultiple selected={[]} choices={choices} />,
      );
      expect(element.find(RadioButton).exists()).toBe(false);
      expect(element.find(Checkbox)).toHaveLength(choices.length);
    });
  });

  describe('error', () => {
    it('marks the fieldset as invalid', () => {
      const element = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} error="Error message" />,
      );

      expect(element.find('fieldset').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the fieldset to the error', () => {
      const element = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} error="Error message" />,
      );

      const errorID = element.find('fieldset').prop<string>('aria-describedby');
      expect(typeof errorID).toBe('string');
      expect(element.find(`#${errorID}`).text()).toBe('Error message');
    });

    it('renders error markup when truthy', () => {
      const element = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} error="Error message" />,
      );

      const error = element.find(InlineError);
      expect(error.prop('message')).toBe('Error message');
    });

    it('renders no error markup when falsy', () => {
      const element = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} error="" />,
      );

      expect(element.find(InlineError)).toHaveLength(0);
    });
  });
});
