import {mountWithApp} from 'tests/utilities';

import {Checkbox} from '../../Checkbox';
import {InlineError} from '../../InlineError';
import {RadioButton} from '../../RadioButton';
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
    const element = mountWithApp(
      <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
    );
    expect(element).toContainReactComponent('fieldset');
  });

  describe('title', () => {
    it('renders a legend for the fieldset', () => {
      const element = mountWithApp(
        <ChoiceList title="My title" selected={[]} choices={choices} />,
      );
      expect(element.find('legend')).toContainReactText('My title');
    });

    it('renders a legend containing JSX for the fieldset', () => {
      const TitleComponent = () => (
        <>
          JSX <b>title</b>
        </>
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

      const choiceElements = mountWithApp(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      );

      choiceElements.findAll(RadioButton).forEach((choiceElement, index) => {
        expect(choiceElement.prop('label')).toBe(choices[index].label);
        expect(choiceElement.prop('value')).toBe(choices[index].value);
        expect(choiceElement.prop('helpText')).toBe(choices[index].helpText);
      });
    });

    it('renders choices with labels containing JSX', () => {
      const jsxLabel = <b>Two</b>;
      const ComponentLabel = () => (
        <>
          Label <i>one</i>
        </>
      );

      choices = [
        {label: <ComponentLabel />, value: 'one'},
        {label: jsxLabel, value: 'two'},
        {...choices[2], helpText: 'Some help text'},
      ];

      const choiceElements = mountWithApp(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      );

      choiceElements.findAll(RadioButton).forEach((choiceElement, index) => {
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements).toContainReactComponent('span', {
          children: 'Child',
        });
      });
    });

    describe('with valid children property returning node when current choice is selected', () => {
      const children = <span>Child</span>;

      it('renders a choice with children content when choice is selected', () => {
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements).toContainReactComponent('span', {
          children: 'Child',
        });
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(
          choiceElements.findAll('li')[selectedIndex],
        ).toContainReactComponent('div');
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(choiceElements).not.toContainReactComponent('span', {
          children: 'Child',
        });
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={selected}
            choices={choices}
          />,
        );

        expect(renderChildrenSpy).toHaveBeenCalled();
        expect(
          choiceElements.findAll('li')[indexWithChildren],
        ).not.toContainReactComponent('div');
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

        const choiceElements = mountWithApp(
          <ChoiceList
            title="Choose a number"
            selected={[]}
            choices={choices}
          />,
        );

        expect(choiceElements).not.toContainReactComponent('span', {
          children: 'Child',
        });
      });
    });
  });

  describe('selected', () => {
    it('sets the provided choices to be selected', () => {
      const selectedIndexes = [0, 2];
      const selected = selectedIndexes.map((index) => choices[index].value);
      const choiceElements = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={selected}
          choices={choices}
        />,
      );

      choiceElements.findAll(RadioButton).forEach((choiceElement, index) => {
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
      const choiceList = mountWithApp(
        <ChoiceList
          title="Choose a number"
          name="MyChoiceList"
          allowMultiple
          onChange={spy}
          selected={selected}
          choices={choices}
        />,
      );

      const getChoiceElement = (index: number) =>
        choiceList.findAll(Checkbox)[index];

      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      getChoiceElement(1).find('input')!.domNode?.dispatchEvent(event);
      expect(spy).toHaveBeenLastCalledWith(['one', 'two'], 'MyChoiceList');

      choiceList.setProps({selected});

      getChoiceElement(2).find('input')!.domNode?.dispatchEvent(event);
      expect(spy).toHaveBeenLastCalledWith(
        ['one', 'two', 'three'],
        'MyChoiceList',
      );

      choiceList.setProps({selected});

      getChoiceElement(0).find('input')!.domNode?.dispatchEvent(event);
      expect(spy).toHaveBeenLastCalledWith(['two', 'three'], 'MyChoiceList');
    });
  });

  describe('name', () => {
    it('provides a unique name when none is provided', () => {
      const choiceElements = mountWithApp(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      );

      const radioButtons = choiceElements.findAll(RadioButton);

      const buttonName = radioButtons[0]!.prop('name');

      radioButtons.forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(buttonName);
      });
    });

    it('uses the same name for choices', () => {
      const name = 'MyChoiceList';
      const choiceElements = mountWithApp(
        <ChoiceList
          title="Choose a number"
          name={name}
          selected={[]}
          choices={choices}
        />,
      );
      choiceElements.findAll(RadioButton).forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(name);
      });
    });

    it('postpends [] when multiple options are allowed', () => {
      const name = 'MyChoiceList';
      const choiceElements = mountWithApp(
        <ChoiceList
          title="Choose a number"
          allowMultiple
          name={name}
          selected={[]}
          choices={choices}
        />,
      );

      choiceElements.findAll(RadioButton).forEach((choiceElement) => {
        expect(choiceElement.prop('name')).toBe(`${name}[]`);
      });
    });
  });

  describe('allowMultiple', () => {
    it('renders a radio button for each option when allowMultiple is not true', () => {
      let element = mountWithApp(
        <ChoiceList title="Choose a number" selected={[]} choices={choices} />,
      );

      expect(element).toContainReactComponentTimes(RadioButton, choices.length);
      expect(element).not.toContainReactComponent(Checkbox);

      element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          allowMultiple={false}
        />,
      );

      expect(element).toContainReactComponentTimes(RadioButton, choices.length);
      expect(element).not.toContainReactComponent(Checkbox);
    });

    it('renders a checkbox each option when allowMultiple is true', () => {
      const element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          allowMultiple
          selected={[]}
          choices={choices}
        />,
      );

      expect(element).toContainReactComponentTimes(Checkbox, choices.length);
      expect(element).not.toContainReactComponent(RadioButton);
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
      const element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );

      expect(element).toContainReactComponent('fieldset', {
        'aria-invalid': true,
      });
    });

    it('renders an InlineError markup when truthy', () => {
      const element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );

      expect(element.find(InlineError)).toContainReactText('Error message');
    });

    it("connects the InlineError to the choice, with the describedByError key's, ariaDescribedBy prop", () => {
      const element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error="Error message"
        />,
      );

      const fieldId = `${element.find(InlineError)!.prop('fieldID')}Error`;

      expect(element).toContainReactComponent(RadioButton, {
        ariaDescribedBy: fieldId,
      });
    });

    it('does not provide the choice, with the describedByError key, with ariaDescribedBy prop if no error is provided', () => {
      const element = mountWithApp(
        <ChoiceList title="Title" selected={[]} choices={choices} />,
      );

      expect(element.find(RadioButton)!.prop('ariaDescribedBy')).toBeNull();
    });

    it('does not render an InlineError when falsy', () => {
      const element = mountWithApp(
        <ChoiceList
          title="Choose a number"
          selected={[]}
          choices={choices}
          error=""
        />,
      );

      expect(element).not.toContainReactComponent(InlineError);
    });
  });

  describe('disabled', () => {
    it('disables choices', () => {
      const choiceElements = mountWithApp(
        <ChoiceList selected={[]} choices={choices} disabled title="title" />,
      );

      choiceElements.findAll(RadioButton)!.forEach((choiceElement) => {
        expect(choiceElement.prop('disabled')).toBe(true);
      });
    });

    it('preserves disabled choices', () => {
      choices = [choices[0], choices[1], {...choices[2], disabled: true}];

      const choiceElements = mountWithApp(
        <ChoiceList selected={[]} choices={choices} disabled title="title" />,
      );

      choiceElements.findAll(RadioButton).forEach((choiceElement) => {
        expect(choiceElement.prop('disabled')).toBe(true);
      });
    });
  });
});
