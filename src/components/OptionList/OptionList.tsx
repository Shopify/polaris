import React, {useState, useCallback} from 'react';

import {arraysAreEqual} from '../../utilities/arrays';
import type {IconProps} from '../Icon';
import type {AvatarProps} from '../Avatar';
import type {ThumbnailProps} from '../Thumbnail';
import {useUniqueId} from '../../utilities/unique-id';
import {useDeepEffect} from '../../utilities/use-deep-effect';

import {Option} from './components';
import styles from './OptionList.scss';

export interface OptionDescriptor {
  /** Value of the option */
  value: string;
  /** Display label for the option */
  label: React.ReactNode;
  /** Whether the option is disabled or not */
  disabled?: boolean;
  /** Whether the option is active or not */
  active?: boolean;
  /** Unique identifier for the option */
  id?: string;
  /** Media to display to the left of the option content */
  media?: React.ReactElement<IconProps | ThumbnailProps | AvatarProps>;
}

interface SectionDescriptor {
  /** Collection of options within the section */
  options: OptionDescriptor[];
  /** Section title */
  title?: string;
}

type Descriptor = OptionDescriptor | SectionDescriptor;

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
  onChange,
  id: idProp,
}: OptionListProps) {
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
                {...option}
                key={optionId}
                id={optionId}
                section={sectionIndex}
                index={optionIndex}
                onClick={handleClick}
                select={isSelected}
                allowMultiple={allowMultiple}
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

function isSection(arr: Descriptor[]): arr is SectionDescriptor[] {
  return (
    typeof arr[0] === 'object' &&
    Object.prototype.hasOwnProperty.call(arr[0], 'options')
  );
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
