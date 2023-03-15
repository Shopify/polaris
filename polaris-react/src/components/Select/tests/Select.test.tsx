import {mountWithApp} from 'tests/utilities';
import {CircleTickOutlineMinor} from '@shopify/polaris-icons';

import {InlineError} from '../../InlineError';
import {Icon} from '../../Icon';
import {Labelled} from '../../Labelled';
import {Select} from '../Select';

describe('<Select />', () => {
  describe('onChange()', () => {
    it('is called with the value of the newly-selected option', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <Select
          id="MySelect"
          label="Select"
          options={['one', 'two']}
          onChange={spy}
        />,
      );

      const select = element.find('select')! as any;
      select.value = 'two';

      const event = {
        currentTarget: select,
      };

      select.trigger('onChange', event);
      expect(spy).toHaveBeenCalledWith('two', 'MySelect');
    });
  });

  describe('onFocus()', () => {
    it('is called when the select is focused', () => {
      const spy = jest.fn();
      mountWithApp(
        <Select label="Select" options={[]} onFocus={spy} onChange={noop} />,
      )
        .find('select')!
        .trigger('onFocus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the select is blurred', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <Select label="Select" options={[]} onBlur={spy} onChange={noop} />,
      );
      element.find('select')!.trigger('onBlur');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('translates an array of strings into options', () => {
      const options = ['one', 'two'];
      const optionElements = mountWithApp(
        <Select label="Select" options={options} onChange={noop} />,
      ).findAll('option');

      options.forEach((option, index) => {
        const optionElement = optionElements[index];
        expect(optionElement).toHaveReactProps({value: option});
        expect(optionElement.text()).toBe(option);
      });
    });

    it('translates an array of option descriptions into options', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two'},
      ];
      const optionElements = mountWithApp(
        <Select label="Select" options={options} onChange={noop} />,
      ).findAll('option');

      options.forEach(({value, label}, index) => {
        const optionElement = optionElements[index];

        expect(optionElement).toHaveReactProps({value});
        expect(optionElement).toContainReactText(label);
      });
    });

    it('sets disabled options as indicated in the option descriptor', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two', disabled: true},
        {value: 'three', label: 'Three', disabled: false},
      ];
      const optionElements = mountWithApp(
        <Select label="Select" options={options} onChange={noop} />,
      ).findAll('option')!;
      options.forEach(({disabled}, index) => {
        const optionElement = optionElements[index];

        expect(optionElement).toHaveReactProps({disabled});
      });
    });
  });

  describe('groups', () => {
    it('translates grouped options into optgroup tags', () => {
      const groupOptions = [
        {title: 'Group one', options: ['one.1', 'one.2']},
        {title: 'Group two', options: ['two.1', 'two.2']},
      ];

      const optgroupElements = mountWithApp(
        <Select label="Select" options={groupOptions} onChange={noop} />,
      ).find('select')!;

      groupOptions.forEach((optionOrGroup, index) => {
        const optgroupElement = optgroupElements.children[index];

        expect(optgroupElement.type).toBe('optgroup');
        expect(optgroupElement).toHaveReactProps({
          label: optionOrGroup.title,
        });
        const options = optgroupElement.children;

        optionOrGroup.options.forEach((option, optionIndex) => {
          const optionElement = options[optionIndex];
          expect(optionElement.type).toBe('option');
          expect(optionElement).toHaveReactProps({
            value: option,
          });
          expect(optionElement).toContainReactText(option);
        });
      });
    });

    it('translates string options into options tags', () => {
      const stringOptions = ['one', 'two'];
      const optionGroupElements = mountWithApp(
        <Select label="Select" options={stringOptions} onChange={noop} />,
      ).find('select')!;

      stringOptions.forEach((optionOrGroup, index) => {
        const optionGroupElement = optionGroupElements.children[index];
        expect(optionGroupElement.type).toBe('option');
        expect(optionGroupElement).toHaveReactProps({
          value: optionOrGroup,
        });
      });
    });
  });

  describe('value', () => {
    it('uses the passed value for the select', () => {
      const select = mountWithApp(
        <Select
          label="Select"
          value="Some value"
          options={[]}
          onChange={jest.fn()}
        />,
      );

      expect(select).toContainReactComponent('select', {value: 'Some value'});
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const select = mountWithApp(
        <Select label="Select" id="MySelect" options={[]} onChange={noop} />,
      );

      expect(select).toContainReactComponent('select', {id: 'MySelect'});
    });

    it('sets a random id on the input when none is passed', () => {
      const id = mountWithApp(
        <Select label="Select" options={[]} onChange={noop} />,
      )
        .find('select')!
        .prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeDefined();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the select', () => {
      const select = mountWithApp(
        <Select label="Select" disabled options={[]} onChange={noop} />,
      );
      expect(select.find('select')!.prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let select = mountWithApp(
        <Select label="Select" options={[]} onChange={noop} />,
      );
      expect(select.find('select')!.prop('disabled')).toBeUndefined();

      select = mountWithApp(
        <Select label="Select" disabled={false} options={[]} onChange={noop} />,
      );
      expect(select.find('select')!.prop('disabled')).toBe(false);
    });
  });

  describe('prefix', () => {
    it('shows the prefix element beside the option label if specified', () => {
      const options = [
        {
          value: 'one',
          label: 'One',
          prefix: <Icon source={CircleTickOutlineMinor} />,
        },
      ];
      const select = mountWithApp(
        <Select label="Select" options={options} onChange={noop} />,
      );

      expect(select).toContainReactComponentTimes(Icon, 1, {
        source: CircleTickOutlineMinor,
      });
    });
  });

  describe('helpText', () => {
    it('connects the select to the help text', () => {
      const select = mountWithApp(
        <Select
          label="Select"
          options={[]}
          helpText="Some help"
          onChange={noop}
        />,
      );
      const helpTextID = select.find('select')!.prop('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(select.find('div', {id: helpTextID})).toContainReactText(
        'Some help',
      );
    });
  });

  describe('placeholder', () => {
    it('renders the placeholder as the initially selected option', () => {
      const placeholderValue = '';
      const select = mountWithApp(
        <Select
          label="Select"
          placeholder="Choose something"
          options={[]}
          onChange={noop}
        />,
      ).find('select')!;
      const placeholderOption = select.findAll('option')![0];
      expect(placeholderOption).toHaveReactProps({
        disabled: true,
        value: placeholderValue,
      });
    });

    it('sets the placeholder value as the select value when there is an onChange handler', () => {
      const select = mountWithApp(
        <Select
          label="Select"
          placeholder="Choose something"
          options={[]}
          onChange={jest.fn()}
        />,
      ).find('select')!;
      const placeholderOption = select.findAll('option')![0];
      expect(select).toHaveReactProps({
        value: placeholderOption.prop('value'),
      });
    });
  });

  describe('error', () => {
    it('marks the select as invalid', () => {
      const select = mountWithApp(
        <Select error={<span>Invalid</span>} label="Select" onChange={noop} />,
      );

      expect(select).toContainReactComponent('select', {'aria-invalid': true});

      select.setProps({error: 'Some error'});
      expect(select).toContainReactComponent('select', {'aria-invalid': true});

      select.setProps({error: 'true'});
      expect(select).toContainReactComponent('select', {'aria-invalid': true});
    });

    it('connects the select to the error', () => {
      const select = mountWithApp(
        <Select label="Select" error="Some error" onChange={noop} />,
      );
      const errorID = select.find('select')!.prop('aria-describedby');
      expect(typeof errorID).toBe('string');
      expect(select.find('div', {id: errorID})!).toContainReactText(
        'Some error',
      );
    });

    it('connects the select to an error rendered separately', () => {
      const errorMessage = 'Some error';
      const selectID = 'collectionRuleType';
      const fieldGroup = mountWithApp(
        <div>
          <Select
            error={Boolean(errorMessage)}
            id={selectID}
            label="Select"
            onChange={noop}
          />
          <InlineError message={errorMessage} fieldID={selectID} />
        </div>,
      );

      const selects = fieldGroup.findAll(Select)!;
      const select = selects[selects.length - 1];
      const errorID = select.find('select')!.prop('aria-describedby');

      expect(select).toContainReactComponent('select', {'aria-invalid': true});
      expect(typeof errorID).toBe('string');
      expect(fieldGroup.find('div', {id: errorID})!).toContainReactText(
        'Some error',
      );
    });

    it('connects the select to both an error and help text', () => {
      const select = mountWithApp(
        <Select
          label="Select"
          error="Some error"
          helpText="Some help"
          onChange={noop}
        />,
      );
      const descriptions = select
        .find('select')!
        .prop('aria-describedby')!
        .split(' ');

      expect(descriptions).toHaveLength(2);
      expect(select).toContainReactComponent(Labelled, {
        helpText: 'Some help',
        error: 'Some error',
      });
    });

    it('renders error markup when a non-boolean value', () => {
      const select = mountWithApp(
        <Select
          label="Select"
          helpText="Some help"
          error="Some error"
          onChange={noop}
        />,
      );

      expect(select).toContainReactComponent(InlineError);
    });

    it('does not render error markup when a boolean value', () => {
      const select = mountWithApp(
        <Select error label="Select" helpText="Some help" onChange={noop} />,
      );

      expect(select).not.toContainReactComponent(InlineError);
    });
  });

  describe('requiredIndicator', () => {
    it('passes requiredIndicator prop to Labelled', () => {
      const element = mountWithApp(
        <Select label="Select" onChange={noop} requiredIndicator />,
      );

      expect(element).toContainReactComponent(Labelled, {
        requiredIndicator: true,
      });
    });
  });
});

function noop() {}
