import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';

import {Option} from './components';
import {arraysAreEqual} from '../../utilities/arrays';

import * as styles from './OptionsList.scss';

export interface OptionDescriptor {
  /** Value of the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Should the option be disabled */
  disabled?: boolean;
}

export interface SectionDescriptor {
  /** Collection of options within the section */
  options: OptionDescriptor[];
  /** Title of the section */
  title?: string;
}

const getUniqueId = createUniqueIDFactory('OptionsList');

export interface Props {
  /** A unique identifier for the options list */
  id?: string;
  /** Title of the list */
  title?: string;
  /** Collection of options to be listed */
  options?: OptionDescriptor[];
  /** Collection of sectioned options */
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

export class OptionsList extends React.Component<CombinedProps, State> {
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
    const {selected, allowMultiple} = this.props;
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
              const id = `${this.id}-${sectionIndex}-${optionIndex}`;

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
                />
              );
            });

          return (
            <li
              key={title || `noTitle-${sectionIndex}`}
              className={styles.Options}
            >
              {titleMarkup}
              <ul className={styles.Options}>{optionsMarkup}</ul>
            </li>
          );
        })
      : null;
    return <ul className={styles.OptionsList}>{optionsMarkup}</ul>;
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
  if (options == null || options === []) {
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

export default withAppProvider<Props>()(OptionsList);
