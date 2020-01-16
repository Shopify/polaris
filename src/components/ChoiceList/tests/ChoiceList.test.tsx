import React from 'react';
import {mountWithApp} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, ReactWrapper} from 'test-utilities/legacy';
import {RadioButton, Checkbox, InlineError, errorTextID} from 'components';
import {ChoiceList, ChoiceListProps} from '../ChoiceList';

describe('<ChoiceList />', () => {
  let choices: ChoiceListProps['choices'];

  beforeEach(() => {
    choices = [
      {label: 'One', value: 'one'},
      {label: 'Two', value: 'two'},
      {label: 'Three', value: 'three'},
    ];
  });

  it('renders a fieldset', () => {
    const element = mountWithAppProvider(
      <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
    );
    expect(element.find('fieldset').exists()).toBe(true);
  });

  describe('title', () => {
    it('renders a legend for the fieldset', () => {
      const element = mountWithAppProvider(
        <ChoiceList title="My title" selected={[]} choices={choices} />,
      );
      expect(element.find('legend').text()).toBe('My title');
    });

    it('renders a legend containing JSX for the fieldset', () => {
      const TitleComponent = () => (
        <React.Fragment>
          JSX <b>title</b>
        </React.Fragment>
      );

      const element = mountWithApp(
        <ChoiceList
          title={<TitleComponent />}
          selected={[]}
          choices={choices}
        />,
      );
      expect(element.find('legend')).toContainReactComponent(TitleComponent);
    });
  });

  describe('choices', () => {
    it('renders a choice with the label, value, and helpText properties', () => {
      choices = [
        choices[0],
        choices[1],
        {...choices[2], helpText: 'Some help text'},
      ];

      const choiceElements = mountWithAppProvider(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement, index) => {
        expect(choiceElement.prop('label')).toBe(choices[index].label);
        expect(choiceElement.prop('value')).toBe(choices[index].value);
        expect(choiceElement.prop('helpText')).toBe(choices[index].helpText);
      });
    });

    it('renders choices with labels containing JSX', () => {
      const jsxLabel = <b>Two</b>;
      const ComponentLabel = () => (
        <React.Fragment>
          Label <i>one</i>
        </React.Fragment>
      );

      choices = [
        {label: <ComponentLabel />, value: 'one'},
        {label: jsxLabel, value: 'two'},
        {...choices[2], helpText: 'Some help text'},
      ];

      const choiceElements = mountWithAppProvider(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
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

        const choiceElements = mountWithAppProvider(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
        );

        expect(choiceElements.contains(children)).toBe(false);
      });
    });
  });

  describe('selected', () => {
    it('sets the provided choices to be selected', () => {
      const selectedIndexes = [0, 2];
      const selected = selectedIndexes.map((index) => choices[index].value);
      const choiceElements = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={selected}
          choices={choices}
        />,
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
          title="Choose a number"
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

    function changeCheckedForChoice(choice: ReactWrapper) {
      choice.simulate('click');
    }
  });

  describe('name', () => {
    it('provides a unique name when none is provided', () => {
      const choiceElements = mountWithAppProvider(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      ).find(RadioButton);
      const name = choiceElements.at(0).prop('name');
      expect(typeof name).toBe('string');

      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(name);
      });
    });

    it('uses the same name for choices', () => {
      const name = 'MyChoiceList';
      const choiceElements = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          name={name}
          selected={[]}
          choices={choices}
        />,
      ).find(RadioButton);
      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(name);
      });
    });

    it('postpends [] when multiple options are allowed', () => {
      const name = 'MyChoiceList';
      const choiceElements = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
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
      let element = mountWithAppProvider(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      );
      expect(element.find(RadioButton)).toHaveLength(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);

      element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          allowMultiple={false}
        />,
      );
      expect(element.find(RadioButton)).toHaveLength(choices.length);
      expect(element.find(Checkbox).exists()).toBe(false);
    });

    it('renders a checkbox each option when allowMultiple is true', () => {
      const element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          allowMultiple
          selected={[]}
          choices={choices}
        />,
      );
      expect(element.find(RadioButton).exists()).toBe(false);
      expect(element.find(Checkbox)).toHaveLength(choices.length);
    });
  });

  describe('error', () => {
    beforeEach(() => {
      choices = [
        ...choices,
        {label: 'Choice with error', value: 'Four', describedByError: true},
      ];
    });

    it('marks the fieldset as invalid', () => {
      const element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );
      expect(element.find('fieldset').prop<string>('aria-invalid')).toBe(true);
    });

    it('renders an InlineError markup when truthy', () => {
      const element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );

      const error = element.find(InlineError);
      expect(error.prop('message')).toBe('Error message');
    });

    it("connects the InlineError to the choice, with the describedByError key's, ariaDescribedBy prop", () => {
      const element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );

      const fieldId = element.find(InlineError).prop('fieldID');
      const expectedErrorFieldId = errorTextID(fieldId);

      const radioButtonDescribeBy = element
        .find(RadioButton)
        .last()
        .prop('ariaDescribedBy');

      expect(radioButtonDescribeBy).toBe(expectedErrorFieldId);
    });

    it('does not provide the choice, with the describedByError key, with ariaDescribedBy prop if no error is provided', () => {
      const element = mountWithAppProvider(
        <ChoiceList title="Title" selected={[]} choices={choices} />,
      );

      const radioButtonDescribeBy = element
        .find(RadioButton)
        .last()
        .prop('ariaDescribedBy');

      expect(radioButtonDescribeBy).toBeNull();
    });

    it('does not render an InlineError when falsy', () => {
      const element = mountWithAppProvider(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error=""
        />,
      );

      expect(element.find(InlineError)).toHaveLength(0);
    });
  });

  describe('disabled', () => {
    it('disables choices', () => {
      const choiceElements = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} disabled title="title" />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('disabled')).toBe(true);
      });
    });

    it('preserves disabled choices', () => {
      choices = [choices[0], choices[1], {...choices[2], disabled: true}];

      const choiceElements = mountWithAppProvider(
        <ChoiceList selected={[]} choices={choices} disabled title="title" />,
      ).find(RadioButton);

      choiceElements.forEach((choiceElement) => {
        expect(choiceElement.prop('disabled')).toBe(true);
      });
    });
  });
});
