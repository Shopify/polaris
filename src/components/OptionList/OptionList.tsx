import React, {useState, useCallback} from 'react';

import type {
  Descriptor,
  OptionDescriptor,
  SectionDescriptor,
} from '../../types';
import {isSection} from '../../utilities/options';
import {arraysAreEqual} from '../../utilities/arrays';
import {useUniqueId} from '../../utilities/unique-id';
import {useDeepEffect} from '../../utilities/use-deep-effect';

import {Option} from './components';
import styles from './OptionList.scss';

type Alignment = 'top' | 'center' | 'bottom';

export interface OptionListProps<TValue extends string = string> {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor<TValue>[];
  /** Defines a specific role attribute for the list itself */
  role?: 'listbox' | 'combobox' | string;
  /** Defines a specific role attribute for each option in the list */
  optionRole?: string;
  /** Sections containing a header and related options */
  sections?: SectionDescriptor<TValue>[];
  /** The selected options */
  selected: TValue[];
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Vertically align child content to the center, top, or bottom.  */
  verticalAlign?: Alignment;
  /** Callback when selection is changed */
  onChange(selected: TValue[]): void;
}

export function OptionList<TValue extends string = string>({
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
}: OptionListProps<TValue>) {
  const [normalizedOptions, setNormalizedOptions] = useState(
    createNormalizedOptions(options, sections, title),
  );
  const id = useUniqueId('OptionList', idProp);

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
      const selectedTValue =
        normalizedOptions[sectionIndex].options[optionIndex].value;
      const foundIndex = selected.indexOf(selectedTValue);
      if (allowMultiple) {
        const newSelection =
          foundIndex === -1
            ? [selectedTValue, ...selected]
            : [
                ...selected.slice(0, foundIndex),
                ...selected.slice(foundIndex + 1, selected.length),
              ];
        onChange(newSelection);
        return;
      }
      onChange([selectedTValue]);
    },
    [normalizedOptions, selected, allowMultiple, onChange],
  );

  const optionsExist = normalizedOptions.length > 0;

  const optionsMarkup = optionsExist
    ? normalizedOptions.map(({title, options}, sectionIndex) => {
        const titleMarkup = title ? (
          <p className={styles.Title}>{title}</p>
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
          <li key={title || `noTitle-${sectionIndex}`}>
            {titleMarkup}
            <ul
              className={styles.Options}
              id={`${id}-${sectionIndex}`}
              role={role}
            >
              {optionsMarkup}
            </ul>
          </li>
        );
      })
    : null;

  return (
    <ul className={styles.OptionList} role={role}>
      {optionsMarkup}
    </ul>
  );
}

function createNormalizedOptions<TValue extends string = string>(
  options?: OptionDescriptor<TValue>[],
  sections?: SectionDescriptor<TValue>[],
  title?: string,
): SectionDescriptor<TValue>[] {
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
