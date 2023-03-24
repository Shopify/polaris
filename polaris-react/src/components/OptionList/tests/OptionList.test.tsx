import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Option} from '../components';
import {OptionList} from '../OptionList';
import type {OptionListProps} from '../OptionList';
import type {OptionDescriptor} from '../../../types';

describe('<OptionList />', () => {
  const defaultProps: OptionListProps = {
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
    const optionWrappers = mountWithApp(
      <OptionList {...defaultProps} />,
    ).findAll(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders sections', () => {
    const {sections} = defaultProps;
    const options: OptionDescriptor[] = [];
    const optionWrappers = mountWithApp(
      <OptionList {...defaultProps} options={options} />,
    ).findAll(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders options', () => {
    const {options} = defaultProps;
    const sections: OptionListProps['sections'] = [];
    const optionWrappers = mountWithApp(
      <OptionList {...defaultProps} sections={sections} />,
    ).findAll(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('re-renders with new options passed in', () => {
    const {sections} = defaultProps;
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

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
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
  });

  it('re-renders with new sections passed in', () => {
    const {options} = defaultProps;
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

    const newSections: OptionListProps['sections'] = [
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
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
  });

  it('re-renders with new options and new sections passed in', () => {
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

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

    const newSections: OptionListProps['sections'] = [
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
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, newSections));
  });

  it('re-renders with undefined options', () => {
    const {sections} = defaultProps;
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

    optionList.setProps({options: undefined});
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions([], sections));
  });

  it('re-renders with undefined sections', () => {
    const {options} = defaultProps;
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

    optionList.setProps({sections: undefined});
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, []));
  });

  it('re-renders with undefined options and new sections', () => {
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

    const newSections: OptionListProps['sections'] = [
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
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
  });

  it('re-renders with new options and undefined sections', () => {
    const optionList = mountWithApp(<OptionList {...defaultProps} />);

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
    optionList.forceUpdate();
    const optionWrappers = optionList.findAll(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
  });

  it('calls onChange with options and sections', () => {
    const spy = jest.fn();
    const {options, sections} = defaultProps;

    const button = mountWithApp(
      <OptionList {...defaultProps} onChange={spy} />,
    ).find('button');

    button!.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
  });

  describe('allowMultiple', () => {
    it('renders options and sections', () => {
      const {options, sections} = defaultProps;
      const optionWrappers = mountWithApp(
        <OptionList {...defaultProps} allowMultiple />,
      ).findAll(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders sections', () => {
      const {sections} = defaultProps;
      const options: OptionDescriptor[] = [];
      const optionWrappers = mountWithApp(
        <OptionList {...defaultProps} options={options} allowMultiple />,
      ).findAll(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders options', () => {
      const {options} = defaultProps;
      const sections: OptionListProps['sections'] = [];
      const optionWrappers = mountWithApp(
        <OptionList {...defaultProps} sections={sections} allowMultiple />,
      ).findAll(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('re-renders with new options passed in', () => {
      const {sections} = defaultProps;
      const optionList = mountWithApp(
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
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
    });

    it('re-renders with new sections passed in', () => {
      const {options} = defaultProps;
      const optionList = mountWithApp(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newSections: OptionListProps['sections'] = [
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
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
    });

    it('re-renders with new options and new sections passed in', () => {
      const optionList = mountWithApp(
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

      const newSections: OptionListProps['sections'] = [
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
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(
        totalOptions(newOptions, newSections),
      );
    });

    it('re-renders with undefined options', () => {
      const {sections} = defaultProps;
      const optionList = mountWithApp(
        <OptionList {...defaultProps} allowMultiple />,
      );

      optionList.setProps({options: undefined});
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, sections));
    });

    it('re-renders with undefined sections', () => {
      const {options} = defaultProps;
      const optionList = mountWithApp(
        <OptionList {...defaultProps} allowMultiple />,
      );

      optionList.setProps({sections: undefined});
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, undefined));
    });

    it('re-renders with undefined options and new sections', () => {
      const optionList = mountWithApp(
        <OptionList {...defaultProps} allowMultiple />,
      );

      const newSections: OptionListProps['sections'] = [
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
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
    });

    it('re-renders with new options and undefined sections', () => {
      const optionList = mountWithApp(
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
      optionList.forceUpdate();
      const optionWrappers = optionList.findAll(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
    });

    describe('onChange', () => {
      it('selects an item when nothing was selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;

        const inputWrapper = mountWithApp(
          <OptionList {...defaultProps} onChange={spy} allowMultiple />,
        ).find('input');

        inputWrapper!.trigger('onChange');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
      });

      it('selects an item when multiple items are selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;
        const selected = ['11', '8'];

        const inputWrapper = mountWithApp(
          <OptionList
            {...defaultProps}
            onChange={spy}
            selected={selected}
            allowMultiple
          />,
        ).find('input');

        inputWrapper!.trigger('onChange');

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

        const inputWrapper = mountWithApp(
          <OptionList
            {...defaultProps}
            onChange={spy}
            selected={selected}
            allowMultiple
          />,
        ).find('input');

        inputWrapper!.trigger('onChange');

        const valueToCheck = firstOption(options, sections);
        const newSelected = selected.filter((value) => value !== valueToCheck);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(newSelected);
      });
    });
  });

  describe('verticalAlign', () => {
    it('renders with the vertical align prop', () => {
      const optionList = mountWithApp(
        <OptionList {...defaultProps} verticalAlign="center" />,
      );
      const optionWrappers = optionList.findAll(Option);

      optionWrappers.forEach((option) => {
        expect(option.props.verticalAlign).toBe('center');
      });
    });

    it('renders without the vertical align prop', () => {
      const optionList = mountWithApp(<OptionList {...defaultProps} />);
      const optionWrappers = optionList.findAll(Option);

      optionWrappers.forEach((option) => {
        expect(option.props.verticalAlign).toBeUndefined();
      });
    });
  });
});

function noop() {}

function firstOption(
  options?: OptionDescriptor[],
  sections?: OptionListProps['sections'],
): string {
  const firstOptionsValue = options?.[0]?.value ?? '';
  const firstSectionOptionsValue = sections?.[0]?.options?.[0]?.value ?? '';
  return firstOptionsValue || firstSectionOptionsValue;
}

function totalOptions(
  options?: OptionDescriptor[],
  sections?: OptionListProps['sections'],
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
