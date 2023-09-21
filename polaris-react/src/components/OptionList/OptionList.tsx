import React, {useState, useCallback, useId} from 'react';

import type {
  Descriptor,
  OptionDescriptor,
  SectionDescriptor,
} from '../../types';
import {isSection} from '../../utilities/options';
import {arraysAreEqual} from '../../utilities/arrays';
import {useDeepEffect} from '../../utilities/use-deep-effect';
import {Box} from '../Box';
import type {BoxProps} from '../Box';
import {Text} from '../Text';
import {Bleed} from '../Bleed';
import {useFeatures} from '../../utilities/features';
import {VerticalStack} from '../VerticalStack';

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
  /** Callback when pointer enters an option */
  onPointerEnterOption?(selected: string): void;
  /** Callback when focusing an option */
  onFocusOption?(selected: string): void;
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
  onPointerEnterOption,
  onFocusOption,
}: OptionListProps) {
  const {polarisSummerEditions2023} = useFeatures();
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

  const handlePointerEnter = useCallback(
    (sectionIndex: number, optionIndex: number) => {
      if (!onPointerEnterOption) return;

      const selectedValue =
        normalizedOptions[sectionIndex].options[optionIndex].value;

      onPointerEnterOption(selectedValue);
    },
    [normalizedOptions, onPointerEnterOption],
  );

  const handleFocus = useCallback(
    (sectionIndex: number, optionIndex: number) => {
      if (!onFocusOption) return;

      const selectedValue =
        normalizedOptions[sectionIndex].options[optionIndex].value;

      onFocusOption(selectedValue);
    },
    [normalizedOptions, onFocusOption],
  );

  const optionsExist = normalizedOptions.length > 0;

  const optionsMarkup = optionsExist
    ? normalizedOptions.map(({title, options}, sectionIndex) => {
        const isFirstOption = sectionIndex === 0;
        const sectionPaddingBlockStart = polarisSummerEditions2023 ? '3' : '4';
        const firstOptionBlockStartPadding = polarisSummerEditions2023
          ? '05'
          : '2';
        const titleLevel = isFirstOption ? 'h2' : 'h3';
        const titleMarkup = title ? (
          <Box
            paddingBlockStart={
              isFirstOption
                ? firstOptionBlockStartPadding
                : sectionPaddingBlockStart
            }
            paddingInlineStart={
              polarisSummerEditions2023 ? '1_5-experimental' : '2'
            }
            paddingBlockEnd={polarisSummerEditions2023 ? '1' : '2'}
            paddingInlineEnd={
              polarisSummerEditions2023 ? '1_5-experimental' : '2'
            }
            borderColor="border-subdued"
            borderBlockStartWidth={
              !isFirstOption && !polarisSummerEditions2023 ? '1' : undefined
            }
          >
            <Text
              as={polarisSummerEditions2023 ? titleLevel : 'p'}
              variant="headingXs"
            >
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
                onPointerEnter={handlePointerEnter}
                onFocus={handleFocus}
              />
            );
          });

        const option = (
          <Bleed
            marginBlockStart={
              title || polarisSummerEditions2023 ? undefined : '05'
            }
          >
            <Box
              as="ul"
              id={`${id}-${sectionIndex}`}
              role={role as BoxProps['role']}
            >
              {optionsMarkup}
            </Box>
          </Bleed>
        );

        // eslint-disable-next-line no-nested-ternary
        const blockStartPadding = isFirstOption
          ? // eslint-disable-next-line no-nested-ternary
            polarisSummerEditions2023
            ? title
              ? '1'
              : '0'
            : undefined
          : // eslint-disable-next-line no-nested-ternary
          polarisSummerEditions2023
          ? title
            ? '05'
            : '0'
          : '2';

        return (
          <Box
            key={title || `noTitle-${sectionIndex}`}
            as="li"
            paddingBlockStart={blockStartPadding}
          >
            {polarisSummerEditions2023 ? (
              <VerticalStack gap={isFirstOption && sections ? undefined : '0'}>
                {titleMarkup}
                {option}
              </VerticalStack>
            ) : (
              <>
                {titleMarkup}
                {option}
              </>
            )}
          </Box>
        );
      })
    : null;

  return (
    <Box
      as="ul"
      role={role as BoxProps['role']}
      padding={polarisSummerEditions2023 ? '1_5-experimental' : '2'}
    >
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
