import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import {Option} from './components';
import {IconProps, ThumbnailProps, AvatarProps} from '..';
import {arraysAreEqual} from '../../utilities/arrays';

import * as styles from './OptionList.scss';

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

export interface SectionDescriptor {
  /** Collection of options within the section */
  options: OptionDescriptor[];
  /** Section title */
  title?: string;
}

const getUniqueId = createUniqueIDFactory('OptionList');

export interface Props {
  /** A unique identifier for the option list */
  id?: string;
  /** List title */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Defines a specific role attribute for the list itself */
  role?: string;
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

export interface State {
  normalizedOptions: SectionDescriptor[];
}

export type CombinedProps = Props & WithAppProviderProps;

export class OptionList extends React.Component<CombinedProps, State> {
  state: State = {
    normalizedOptions: createNormalizedOptions(
      this.props.options,
      this.props.sections,
      this.props.title,
    ),
  };

  private id = this.props.id || getUniqueId();

  componentWillReceiveProps({
    options: nextOptions = [],
    sections: nextSections = [],
    id: nextID,
    title: nextTitle,
  }: Props) {
    const {options = [], sections = [], id, title} = this.props;

    if (id !== nextID) {
      this.id = nextID || this.id;
    }

    const optionsChanged = !arraysAreEqual<OptionDescriptor>(
      nextOptions,
      options,
    );

    const sectionsChanged = !arraysAreEqual<SectionDescriptor>(
      nextSections,
      sections,
      testSectionsPropEquality,
    );

    const titleChanged = title !== nextTitle;

    if (optionsChanged || sectionsChanged || titleChanged) {
      this.setState({
        normalizedOptions: createNormalizedOptions(
          nextOptions,
          nextSections,
          nextTitle,
        ),
      });
    }
  }

  render() {
    const {normalizedOptions} = this.state;
    const {selected, allowMultiple, role, optionRole} = this.props;
    const optionsExist = normalizedOptions.length > 0;

    const optionsMarkup = optionsExist
      ? normalizedOptions.map(({title, options}, sectionIndex) => {
          const titleMarkup = title ? (
            <p className={styles.Title} role={role}>
              {title}
            </p>
          ) : null;
          const optionsMarkup =
            options &&
            options.map((option, optionIndex) => {
              const isSelected = selected.includes(option.value);
              const id =
                option.id || `${this.id}-${sectionIndex}-${optionIndex}`;

              return (
                <Option
                  {...option}
                  key={id}
                  id={id}
                  section={sectionIndex}
                  index={optionIndex}
                  onClick={this.handleClick}
                  select={isSelected}
                  allowMultiple={allowMultiple}
                  role={optionRole}
                />
              );
            });

          return (
            <li
              key={title || `noTitle-${sectionIndex}`}
              className={styles.Options}
            >
              {titleMarkup}
              <ul
                className={styles.Options}
                id={this.id}
                role={role}
                aria-multiselectable={allowMultiple}
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

  @autobind
  private handleClick(sectionIndex: number, optionIndex: number) {
    const {selected, onChange, allowMultiple} = this.props;
    const selectedValue = this.state.normalizedOptions[sectionIndex].options[
      optionIndex
    ].value;
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
  }
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

export default withAppProvider<Props>()(OptionList);
