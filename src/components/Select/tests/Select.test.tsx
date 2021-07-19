import React from 'react';
import {InlineError, Icon, Labelled} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, ReactWrapper} from 'test-utilities/legacy';
import {CircleTickOutlineMinor} from '@shopify/polaris-icons';

import {Select} from '../Select';

describe('<Select />', () => {
  describe('onChange()', () => {
    it('is called with the value of the newly-selected option', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <Select
          id="MySelect"
          label="Select"
          options={['one', 'two']}
          onChange={spy}
        />,
      );
      (element.find('select') as any).instance().value = 'two';
      element.find('select').simulate('change');
      expect(spy).toHaveBeenCalledWith('two', 'MySelect');
    });
  });

  describe('onFocus()', () => {
    it('is called when the select is focused', () => {
      const spy = jest.fn();
      mountWithAppProvider(
        <Select label="Select" options={[]} onFocus={spy} onChange={noop} />,
      )
        .find('select')
        .simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the select is blurred', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <Select label="Select" options={[]} onBlur={spy} onChange={noop} />,
      );
      element.find('select').simulate('focus');
      element.find('select').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('translates an array of strings into options', () => {
      const options = ['one', 'two'];
      const optionElements = mountWithAppProvider(
        <Select label="Select" options={options} onChange={noop} />,
      ).find('option');

      options.forEach((option, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.key()).toBe(option);
        expect(optionElement.prop('value')).toBe(option);
        expect(optionElement.text()).toBe(option);
      });
    });

    it('translates an array of option descriptions into options', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two'},
      ];
      const optionElements = mountWithAppProvider(
        <Select label="Select" options={options} onChange={noop} />,
      ).find('option');

      options.forEach(({value, label}, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.key()).toBe(value);
        expect(optionElement.prop('value')).toBe(value);
        expect(optionElement.text()).toBe(label);
      });
    });

    it('sets disabled options as indicated in the option descriptor', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two', disabled: true},
        {value: 'three', label: 'Three', disabled: false},
      ];
      const optionElements = mountWithAppProvider(
        <Select label="Select" options={options} onChange={noop} />,
      ).find('option');

      options.forEach(({disabled}, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.prop('disabled')).toBe(disabled);
      });
    });
  });

  describe('groups', () => {
    const optionsAndGroups = [
      {title: 'Group one', options: ['one.1', 'one.2']},
      'one',
      'two',
      {title: 'Group two', options: ['two.1', 'two.2']},
    ];

    function testOptions(
      optionOrGroup: string | {title: string; options: string[]},
      optionOrOptgroupElement: ReactWrapper,
    ) {
      if (typeof optionOrGroup === 'string') {
        expect(optionOrOptgroupElement.type()).toBe('option');
        expect(optionOrOptgroupElement.key()).toBe(optionOrGroup);
        expect(optionOrOptgroupElement.prop('value')).toBe(optionOrGroup);
        expect(optionOrOptgroupElement.text()).toBe(optionOrGroup);
      } else {
        expect(optionOrOptgroupElement.type()).toBe('optgroup');
        expect(optionOrOptgroupElement.prop('label')).toBe(optionOrGroup.title);
        const options = optionOrOptgroupElement.children();

        optionOrGroup.options.forEach((option, optionIndex) => {
          const optionElement = options.at(optionIndex);
          expect(optionElement.type()).toBe('option');
          expect(optionElement.key()).toBe(option);
          expect(optionElement.prop('value')).toBe(option);
          expect(optionElement.text()).toBe(option);
        });
      }
    }

    // Expectations are ran within the call to testOptions()
    // eslint-disable-next-line jest/expect-expect
    it('translates grouped options into optgroup tags', () => {
      const optionOrOptgroupElements = mountWithAppProvider(
        <Select label="Select" options={optionsAndGroups} onChange={noop} />,
      )
        .find('select')
        .children();

      optionsAndGroups.forEach((optionOrGroup, index) => {
        const optionOrOptgroupElement = optionOrOptgroupElements.at(index);
        testOptions(optionOrGroup, optionOrOptgroupElement);
      });
    });
  });

  describe('value', () => {
    it('uses the passed value for the select', () => {
      const value = mountWithAppProvider(
        <Select
          label="Select"
          value="Some value"
          options={[]}
          onChange={jest.fn()}
        />,
      )
        .find('select')
        .prop('value');
      expect(value).toBe('Some value');
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = mountWithAppProvider(
        <Select label="Select" id="MySelect" options={[]} onChange={noop} />,
      )
        .find('select')
        .prop('id');
      expect(id).toBe('MySelect');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = mountWithAppProvider(
        <Select label="Select" options={[]} onChange={noop} />,
      )
        .find('select')
        .prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the select', () => {
      const select = mountWithAppProvider(
        <Select label="Select" disabled options={[]} onChange={noop} />,
      );
      expect(select.find('select').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let select = mountWithAppProvider(
        <Select label="Select" options={[]} onChange={noop} />,
      );
      expect(select.find('select').prop('disabled')).toBeFalsy();

      select = mountWithAppProvider(
        <Select label="Select" disabled={false} options={[]} onChange={noop} />,
      );
      expect(select.find('select').prop('disabled')).toBeFalsy();
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
      const select = mountWithAppProvider(
        <Select label="Select" options={options} onChange={noop} />,
      );

      expect(
        select
          .find(Icon)
          .filterWhere(
            (icon) => icon.prop('source') === CircleTickOutlineMinor,
          ),
      ).toHaveLength(1);
    });
  });

  describe('helpText', () => {
    it('connects the select to the help text', () => {
      const select = mountWithAppProvider(
        <Select
          label="Select"
          options={[]}
          helpText="Some help"
          onChange={noop}
        />,
      );
      const helpTextID = select.find('select').prop<string>('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(select.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('placeholder', () => {
    it('renders the placeholder as the initially selected option', () => {
      const placeholderValue = '';
      const select = mountWithAppProvider(
        <Select
          label="Select"
          placeholder="Choose something"
          options={[]}
          onChange={noop}
        />,
      ).find('select');
      const placeholderOption = select.find('option').first();

      expect(placeholderValue).toBe(placeholderOption.prop('value'));
      expect(placeholderOption.prop('disabled')).toBe(true);
    });

    it('sets the placeholder value as the select value when there is an onChange handler', () => {
      const select = mountWithAppProvider(
        <Select
          label="Select"
          placeholder="Choose something"
          options={[]}
          onChange={jest.fn()}
        />,
      ).find('select');
      const placeholderOption = select.find('option').first();
      expect(select.prop('value')).toBe(placeholderOption.prop('value'));
    });
  });

  describe('error', () => {
    it('marks the select as invalid', () => {
      const select = mountWithAppProvider(
        <Select error={<span>Invalid</span>} label="Select" onChange={noop} />,
      );

      expect(select.find('select').prop<string>('aria-invalid')).toBe(true);

      select.setProps({error: 'Some error'});
      expect(select.find('select').prop<string>('aria-invalid')).toBe(true);

      select.setProps({error: 'true'});
      expect(select.find('select').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the select to the error', () => {
      const select = mountWithAppProvider(
        <Select label="Select" error="Some error" onChange={noop} />,
      );
      const errorID = select.find('select').prop<string>('aria-describedby');
      expect(typeof errorID).toBe('string');
      expect(select.find(`#${errorID}`).text()).toBe('Some error');
    });

    it('connects the select to an error rendered separately', () => {
      const errorMessage = 'Some error';
      const selectID = 'collectionRuleType';
      const fieldGroup = mountWithAppProvider(
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

      const select = fieldGroup.find(Select).last();
      const errorID = select.find('select').prop<string>('aria-describedby');

      expect(select.find('select').prop<string>('aria-invalid')).toBe(true);
      expect(typeof errorID).toBe('string');
      expect(fieldGroup.find(`#${errorID}`).text()).toBe('Some error');
    });

    it('connects the select to both an error and help text', () => {
      const select = mountWithAppProvider(
        <Select
          label="Select"
          error="Some error"
          helpText="Some help"
          onChange={noop}
        />,
      );
      const descriptions = select
        .find('select')
        .prop<string>('aria-describedby')
        .split(' ');
      expect(descriptions).toHaveLength(2);
      expect(select.find(`#${descriptions[0]}`).text()).toBe('Some help');
      expect(select.find(`#${descriptions[1]}`).text()).toBe('Some error');
    });

    it('renders error markup when a non-boolean value', () => {
      const select = mountWithAppProvider(
        <Select
          label="Select"
          helpText="Some help"
          error="Some error"
          onChange={noop}
        />,
      );

      expect(select.find(InlineError)).toHaveLength(1);
    });

    it('does not render error markup when a boolean value', () => {
      const select = mountWithAppProvider(
        <Select error label="Select" helpText="Some help" onChange={noop} />,
      );

      expect(select.find(InlineError)).toHaveLength(0);
    });
  });

  describe('requiredIndicator', () => {
    it('passes requiredIndicator prop to Labelled', () => {
      const element = mountWithAppProvider(
        <Select label="Select" onChange={noop} requiredIndicator />,
      );
      const labelled = element.find(Labelled);

      expect(labelled.prop('requiredIndicator')).toBe(true);
    });
  });
});

function noop() {}
