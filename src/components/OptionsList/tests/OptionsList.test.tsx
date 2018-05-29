import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  shallowWithAppProvider,
  mountWithAppProvider,
} from '../../../../tests/utilities';

import OptionsList, {
  Props,
  OptionDescriptor,
  SectionDescriptor,
} from '../OptionsList';
import {Option} from '../components';

describe('<OptionsList />', () => {
  const defaultProps: Props = {
    id: 'some-memes',
    title: 'Recommended memes',
    options: [
      {
        value: 'doge',
        label: 'Doge',
      },
      {
        value: 'forever-alone',
        label: 'Forever alone',
        disabled: true,
      },
      {
        value: 'me-gusta',
        label: 'Me gusta',
      },
    ],
    sections: [
      {
        title: 'Other memes',
        options: [
          {
            value: 'y-u-no-guy',
            label: '"Y U NO" guy',
          },
          {
            value: 'neil-degrasse-tyson',
            label: 'Neil deGrasse Tyson reaction',
          },
        ],
      },
      {
        options: [
          {
            value: 'rage-face',
            label: 'Rage face',
            disabled: true,
          },
          {
            value: 'not-bad-obama',
            label: '"Not bad" Obama face',
          },
        ],
      },
    ],
    selected: [],
    onChange: noop,
  };

  it('renders options and sections', () => {
    const {options, sections} = defaultProps;
    const optionWrappers = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders sections', () => {
    const {sections} = defaultProps;
    const options: OptionDescriptor[] = [];
    const optionWrappers = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} options={options} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('renders options', () => {
    const {options} = defaultProps;
    const sections: SectionDescriptor[] = [];
    const optionWrappers = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} sections={sections} />,
    ).find(Option);

    expect(optionWrappers).toHaveLength(totalOptions(options, sections));
  });

  it('re-renders with new options passed in', () => {
    const {sections} = defaultProps;
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    const newOptions: OptionDescriptor[] = [
      {
        value: 'doge',
        label: 'Doge',
      },
      {
        value: 'forever-alone',
        label: 'Forever alone',
        disabled: true,
      },
    ];

    optionsList.setProps({options: newOptions});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
  });

  it('re-renders with new sections passed in', () => {
    const {options} = defaultProps;
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other memes',
        options: [
          {
            value: 'y-u-no-guy',
            label: '"Y U NO" guy',
          },
          {
            value: 'neil-degrasse-tyson',
            label: 'Neil deGrasse Tyson reaction',
          },
        ],
      },
    ];

    optionsList.setProps({sections: newSections});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
  });

  it('re-renders with new options and new sections passed in', () => {
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    const newOptions: OptionDescriptor[] = [
      {
        value: 'doge',
        label: 'Doge',
      },
      {
        value: 'forever-alone',
        label: 'Forever alone',
        disabled: true,
      },
    ];

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other memes',
        options: [
          {
            value: 'y-u-no-guy',
            label: '"Y U NO" guy',
          },
          {
            value: 'neil-degrasse-tyson',
            label: 'Neil deGrasse Tyson reaction',
          },
        ],
      },
    ];

    optionsList.setProps({options: newOptions, sections: newSections});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, newSections));
  });

  it('re-renders with undefined options', () => {
    const {sections} = defaultProps;
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    optionsList.setProps({options: undefined});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions([], sections));
  });

  it('re-renders with undefined sections', () => {
    const {options} = defaultProps;
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    optionsList.setProps({sections: undefined});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(options, []));
  });

  it('re-renders with undefined options and new sections', () => {
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    const newSections: SectionDescriptor[] = [
      {
        title: 'Other memes',
        options: [
          {
            value: 'y-u-no-guy',
            label: '"Y U NO" guy',
          },
          {
            value: 'neil-degrasse-tyson',
            label: 'Neil deGrasse Tyson reaction',
          },
        ],
      },
    ];

    optionsList.setProps({options: undefined, sections: newSections});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
  });

  it('re-renders with new options and undefined sections', () => {
    const optionsList = shallowWithAppProvider<Props>(
      <OptionsList {...defaultProps} />,
    );

    const newOptions: OptionDescriptor[] = [
      {
        value: 'doge',
        label: 'Doge',
      },
      {
        value: 'forever-alone',
        label: 'Forever alone',
        disabled: true,
      },
    ];

    optionsList.setProps({options: newOptions, sections: undefined});

    const optionWrappers = optionsList.find(Option);
    expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
  });

  it('calls onChange with the correct value', () => {
    const spy = jest.fn();
    const {options, sections} = defaultProps;

    const buttonWrappers = mountWithAppProvider<Props>(
      <OptionsList {...defaultProps} onChange={spy} />,
    ).find('button');

    buttonWrappers.at(0).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
  });

  describe('allowMultiple', () => {
    it('renders options and sections', () => {
      const {options, sections} = defaultProps;
      const optionWrappers = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders sections', () => {
      const {sections} = defaultProps;
      const options: OptionDescriptor[] = [];
      const optionWrappers = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} options={options} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('renders options', () => {
      const {options} = defaultProps;
      const sections: SectionDescriptor[] = [];
      const optionWrappers = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} sections={sections} allowMultiple />,
      ).find(Option);

      expect(optionWrappers).toHaveLength(totalOptions(options, sections));
    });

    it('re-renders with new options passed in', () => {
      const {sections} = defaultProps;
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: 'doge',
          label: 'Doge',
        },
        {
          value: 'forever-alone',
          label: 'Forever alone',
          disabled: true,
        },
      ];

      optionsList.setProps({options: newOptions});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, sections));
    });

    it('re-renders with new sections passed in', () => {
      const {options} = defaultProps;
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other memes',
          options: [
            {
              value: 'y-u-no-guy',
              label: '"Y U NO" guy',
            },
            {
              value: 'neil-degrasse-tyson',
              label: 'Neil deGrasse Tyson reaction',
            },
          ],
        },
      ];

      optionsList.setProps({sections: newSections});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, newSections));
    });

    it('re-renders with new options and new sections passed in', () => {
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: 'doge',
          label: 'Doge',
        },
        {
          value: 'forever-alone',
          label: 'Forever alone',
          disabled: true,
        },
      ];

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other memes',
          options: [
            {
              value: 'y-u-no-guy',
              label: '"Y U NO" guy',
            },
            {
              value: 'neil-degrasse-tyson',
              label: 'Neil deGrasse Tyson reaction',
            },
          ],
        },
      ];

      optionsList.setProps({options: newOptions, sections: newSections});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(
        totalOptions(newOptions, newSections),
      );
    });

    it('re-renders with undefined options', () => {
      const {sections} = defaultProps;
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      optionsList.setProps({options: undefined});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, sections));
    });

    it('re-renders with undefined sections', () => {
      const {options} = defaultProps;
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      optionsList.setProps({sections: undefined});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(options, undefined));
    });

    it('re-renders with undefined options and new sections', () => {
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      const newSections: SectionDescriptor[] = [
        {
          title: 'Other memes',
          options: [
            {
              value: 'y-u-no-guy',
              label: '"Y U NO" guy',
            },
            {
              value: 'neil-degrasse-tyson',
              label: 'Neil deGrasse Tyson reaction',
            },
          ],
        },
      ];

      optionsList.setProps({options: undefined, sections: newSections});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(undefined, newSections));
    });

    it('re-renders with new options and undefined sections', () => {
      const optionsList = shallowWithAppProvider<Props>(
        <OptionsList {...defaultProps} allowMultiple />,
      );

      const newOptions: OptionDescriptor[] = [
        {
          value: 'doge',
          label: 'Doge',
        },
        {
          value: 'forever-alone',
          label: 'Forever alone',
          disabled: true,
        },
      ];

      optionsList.setProps({options: newOptions, sections: undefined});

      const optionWrappers = optionsList.find(Option);
      expect(optionWrappers).toHaveLength(totalOptions(newOptions, undefined));
    });

    describe('onChange', () => {
      it('selects an item when nothing was selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;

        const inputWrappers = mountWithAppProvider<Props>(
          <OptionsList {...defaultProps} onChange={spy} allowMultiple />,
        ).find('input');

        inputWrappers.at(0).simulate('change');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([firstOption(options, sections)]);
      });

      it('selects an item when multiple items are selected', () => {
        const spy = jest.fn();
        const {options, sections} = defaultProps;
        const selected = ['not-bad-obama', 'y-u-no-guy'];

        const inputWrappers = mountWithAppProvider<Props>(
          <OptionsList
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
        const selected = ['not-bad-obama', 'y-u-no-guy', 'doge'];

        const inputWrappers = mountWithAppProvider<Props>(
          <OptionsList
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
