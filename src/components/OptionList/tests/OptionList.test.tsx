import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import {Option} from '../components';
import OptionList, {
  Props,
  OptionDescriptor,
  SectionDescriptor,
} from '../OptionList';

describe('<OptionList />', () => {
  const defaultProps: Props = {
    id: 'recommended-products',
    title: 'Recommended products',
    options: [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
      {
        value: '7',
        label: 'Item three',
      },
    ],
    sections: [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
      {
        options: [
          {
            value: '10',
            label: 'Item six',
            disabled: true,
          },
          {
            value: '11',
            label: 'Item seven',
          },
        ],
      },
    ],
    selected: [],
    onChange: noop,
  };

  it('renders options and sections', () => {
    const {options, sections} = defaultProps;
    const optionWrappers = shallowWithAppProvider(
      <OptionList {...defaultProps} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders sections', () => {
    const {sections} = defaultProps;
    const options: OptionDescriptor[] = [];
    const optionWrappers = shallowWithAppProvider(
      <OptionList {...defaultProps} options={options} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders options', () => {
    const {options} = defaultProps;
    const sections: SectionDescriptor[] = [];
    const optionWrappers = shallowWithAppProvider(
      <OptionList {...defaultProps} sections={sections} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('re-renders with new options passed in', () => {
    const {sections} = defaultProps;
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    const newOptions: OptionDescriptor[] = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    optionList.setProps({options: newOptions});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
  });

  it('re-renders with new sections passed in', () => {
    const {options} = defaultProps;
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    optionList.setProps({sections: newSections});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
  });

  it('re-renders with new options and new sections passed in', () => {
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    const newOptions: OptionDescriptor[] = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    optionList.setProps({options: newOptions, sections: newSections});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, newSections));
  });

  it('re-renders with undefined options', () => {
    const {sections} = defaultProps;
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    optionList.setProps({options: undefined});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions([], sections));
  });

  it('re-renders with undefined sections', () => {
    const {options} = defaultProps;
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    optionList.setProps({sections: undefined});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, []));
  });

  it('re-renders with undefined options and new sections', () => {
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    optionList.setProps({options: undefined, sections: newSections});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
  });

  it('re-renders with new options and undefined sections', () => {
    const optionList = shallowWithAppProvider(<OptionList {...defaultProps} />);

    const newOptions: OptionDescriptor[] = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    optionList.setProps({options: newOptions, sections: undefined});

    const optionWrappers = optionList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
  });

  it('calls onChange with the correct value', () => {
    const spy = jest.fn();
    const {options, sections} = defaultProps;

    const buttonWrappers = mountWithAppProvider(
      <OptionList {...defaultProps} onChange={spy} />,
    ).find('button');

    buttonWrappers.at(0).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
  });

  describe('allowMultiple', () => {
    it('renders options and sections', () => {
      const {options, sections} = defaultProps;
      const optionWrappers = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders sections', () => {
      const {sections} = defaultProps;
      const options: OptionDescriptor[] = [];
      const optionWrappers = shallowWithAppProvider(
        <OptionList {...defaultProps} options={options} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders options', () => {
      const {options} = defaultProps;
      const sections: SectionDescriptor[] = [];
      const optionWrappers = shallowWithAppProvider(
        <OptionList {...defaultProps} sections={sections} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('re-renders with new options passed in', () => {
      const {sections} = defaultProps;
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      optionList.setProps({options: newOptions});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
    });

    it('re-renders with new sections passed in', () => {
      const {options} = defaultProps;
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      optionList.setProps({sections: newSections});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
    });

    it('re-renders with new options and new sections passed in', () => {
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      optionList.setProps({options: newOptions, sections: newSections});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(
        totalOptions(newOptions, newSections),
      );
    });

    it('re-renders with undefined options', () => {
      const {sections} = defaultProps;
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      optionList.setProps({options: undefined});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, sections));
    });

    it('re-renders with undefined sections', () => {
      const {options} = defaultProps;
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      optionList.setProps({sections: undefined});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, undefined));
    });

    it('re-renders with undefined options and new sections', () => {
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      optionList.setProps({options: undefined, sections: newSections});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
    });

    it('re-renders with new options and undefined sections', () => {
      const optionList = shallowWithAppProvider(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      optionList.setProps({options: newOptions, sections: undefined});

      const optionWrappers = optionList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
    });

    describe('onChange', () => {
      it('selects an item when nothing was selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;

        const inputWrappers = mountWithAppProvider(
          <OptionList {...defaultProps} onChange={spy} allowMultiple />,
        ).find('input');

        inputWrappers.at(0).simulate('change');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
      });

      it('selects an item when multiple items are selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;
        const selected = ['11', '8'];

        const inputWrappers = mountWithAppProvider(
          <OptionList
            {...defaultProps}
            onChange={spy}
            selected={selected}
            allowMultiple
          />,
        ).find('input');

        inputWrappers.at(0).simulate('change');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([
          firstOption(options, sections),
          ...selected,
        ]);
      });

      it('deselects an item when it is already selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;
        const selected = ['10', '8', '5'];

        const inputWrappers = mountWithAppProvider(
          <OptionList
            {...defaultProps}
            onChange={spy}
            selected={selected}
            allowMultiple
          />,
        ).find('input');

        inputWrappers.at(0).simulate('change');

        const valueToCheck = firstOption(options, sections);
        const newSelected = selected.filter((value) => value !== valueToCheck);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(newSelected);
      });
    });
  });
});

function firstOption(
  options?: OptionDescriptor[],
  sections?: SectionDescriptor[],
): string {
  const firstOptionsValue =
    options == null || options === [] ? '' : options[0].value;
  const firstSectionOptionsValue =
    sections == null || sections === [] || sections[0].options === []
      ? ''
      : sections[0].options[0].value;
  return firstOptionsValue || firstSectionOptionsValue;
}

function totalOptions(
  options?: OptionDescriptor[],
  sections?: SectionDescriptor[],
): number {
  return (
    (options == null ? 0 : options.length) +
    (sections == null
      ? 0
      : sections.reduce((total, {options}) => {
          return total + options.length;
        }, 0))
  );
}
