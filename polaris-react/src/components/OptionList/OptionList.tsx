import React, {useState, useCallback, useId} from 'react';

import type {
  Descriptor,
  OptionDescriptor,
  SectionDescriptor,
} from '../../types';
import {isSection} from '../../utilities/options';
import {arraysAreEqual} from '../../utilities/arrays';
import {useDeepEffect} from '../../utilities/use-deep-effect';
import {Box, BoxProps} from '../Box';
import {Text} from '../Text';
import {Bleed} from '../Bleed';

import {Option} from './components';

type Alignment = 'top' | 'center' | 'bottom';

export interface OptionListProps {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Defines a specific role attribute for the list itself */
  role?: 'listbox' | 'combobox' | string;
  /** Defines a specific role attribute for each option in the list */
  optionRole?: string;
  /** Sections containing a header and related options */
  sections?: SectionDescriptor[];
  /** The selected options */
  selected: string[];
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Vertically align child content to the center, top, or bottom.  */
  verticalAlign?: Alignment;
  /** Callback when selection is changed */
  onChange(selected: string[]): void;
}

export function OptionList({
  options,
  sections,
  title,
  selected,
  allowMultiple,
  role,
  optionRole,
  verticalAlign,
  onChange,
  id: idProp,
}: OptionListProps) {
  const [normalizedOptions, setNormalizedOptions] = useState(
    createNormalizedOptions(options, sections, title),
  );
  const uniqId = useId();
  const id = idProp ?? uniqId;

  useDeepEffect(
    () => {
      setNormalizedOptions(
        createNormalizedOptions(options || [], sections || [], title),
      );
    },
    [options, sections, title],
    optionArraysAreEqual,
  );

  const handleClick = useCallback(
    (sectionIndex: number, optionIndex: number) => {
      const selectedValue =
        normalizedOptions[sectionIndex].options[optionIndex].value;
      const foundIndex = selected.indexOf(selectedValue);
      if (allowMultiple) {
        const newSelection =
          foundIndex === -1
            ? [selectedValue, ...selected]
            : [
                ...selected.slice(0, foundIndex),
                ...selected.slice(foundIndex + 1, selected.length),
              ];
        onChange(newSelection);
        return;
      }
      onChange([selectedValue]);
    },
    [normalizedOptions, selected, allowMultiple, onChange],
  );

  const optionsExist = normalizedOptions.length > 0;

  const optionsMarkup = optionsExist
    ? normalizedOptions.map(({title, options}, sectionIndex) => {
        const isFirstOption = sectionIndex === 0;
        const titleMarkup = title ? (
          <Box
            paddingBlockStart={isFirstOption ? '2' : '4'}
            paddingInlineStart="2"
            paddingBlockEnd="2"
            paddingInlineEnd="2"
            borderBlockStart={!isFirstOption ? 'divider' : undefined}
          >
            <Text as="p" variant="headingXs">
              {title}
            </Text>
          </Box>
        ) : null;
        const optionsMarkup =
          options &&
          options.map((option, optionIndex) => {
            const isSelected = selected.includes(option.value);
            const optionId =
              option.id || `${id}-${sectionIndex}-${optionIndex}`;

            return (
              <Option
                key={optionId}
                {...option}
                id={optionId}
                section={sectionIndex}
                index={optionIndex}
                onClick={handleClick}
                select={isSelected}
                allowMultiple={allowMultiple}
                verticalAlign={verticalAlign}
                role={optionRole}
              />
            );
          });

        return (
          <Box
            key={title || `noTitle-${sectionIndex}`}
            as="li"
            paddingBlockStart={isFirstOption ? undefined : '2'}
          >
            {titleMarkup}
            <Bleed marginBlockStart={title ? undefined : '05'} marginInline="0">
              <Box
                as="ul"
                id={`${id}-${sectionIndex}`}
                role={role as BoxProps['role']}
              >
                {optionsMarkup}
              </Box>
            </Bleed>
          </Box>
        );
      })
    : null;

  return (
    <Box as="ul" role={role as BoxProps['role']} padding="2">
      {optionsMarkup}
    </Box>
  );
}

function createNormalizedOptions(
  options?: OptionDescriptor[],
  sections?: SectionDescriptor[],
  title?: string,
): SectionDescriptor[] {
  if (options == null) {
    const section = {options: [], title};
    return sections == null ? [] : [section, ...sections];
  }
  if (sections == null) {
    return [
      {
        title,
        options,
      },
    ];
  }
  return [
    {
      title,
      options,
    },
    ...sections,
  ];
}

function optionArraysAreEqual(
  firstArray: Descriptor[],
  secondArray: Descriptor[],
) {
  if (isSection(firstArray) && isSection(secondArray)) {
    return arraysAreEqual<SectionDescriptor>(
      firstArray,
      secondArray,
      testSectionsPropEquality,
    );
  }

  return arraysAreEqual(firstArray, secondArray);
}

function testSectionsPropEquality(
  previousSection: SectionDescriptor,
  currentSection: SectionDescriptor,
) {
  const {options: previousOptions} = previousSection;
  const {options: currentOptions} = currentSection;
  const optionsAreEqual = arraysAreEqual(previousOptions, currentOptions);
  const titlesAreEqual = previousSection.title === currentSection.title;
  return optionsAreEqual && titlesAreEqual;
}
