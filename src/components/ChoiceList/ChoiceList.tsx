import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop, createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import Icon from '../Icon';
import {Error} from '../../types';

import * as styles from './ChoiceList.scss';

export interface ChoiceDescriptor {
  value: string;
  label: string;
  disabled?: boolean;
  helpText?: React.ReactNode;
  renderChildren?(isSelected: boolean): React.ReactNode | false;
}

export type Choice = ChoiceDescriptor;

export interface BaseProps {
  /** Label for list of choices */
  title?: string;
  /** Collection of choices */
  choices: Choice[];
  /** Collection of selected choices */
  selected: string[];
  /** Name for form input */
  name?: string;
  /** Allow merchants to select multiple options at once */
  allowMultiple?: boolean;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Display an error message */
  error?: Error;
  /** Callback when the selected choices change */
  onChange?(selected: string[], name: string): void;
}

export interface Props extends BaseProps {}
export type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('ChoiceList');
const getUniqueErrorID = createUniqueIDFactory('Error');

function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  error,
  name = getUniqueID(),
}: CombinedProps) {
  const ControlComponent: typeof Checkbox | typeof RadioButton = allowMultiple
    ? Checkbox
    : RadioButton;

  const finalName = allowMultiple ? `${name}[]` : name;

  const className = classNames(
    styles.ChoiceList,
    titleHidden && styles.titleHidden,
  );

  const titleMarkup = title ? (
    <legend className={styles.Title}>{title}</legend>
  ) : null;

  const choicesMarkup = choices.map((choice) => {
    const {value, label, helpText, disabled} = choice;

    function handleChange(checked: boolean) {
      onChange(
        updateSelectedChoices(choice, checked, selected, allowMultiple),
        name,
      );
    }

    const isSelected = choiceIsSelected(choice, selected);
    const children = choice.renderChildren ? (
      <div className={styles.ChoiceChildren}>
        {choice.renderChildren(isSelected)}
      </div>
    ) : null;

    return (
      <li key={value}>
        <ControlComponent
          name={finalName}
          value={value}
          label={label}
          disabled={disabled}
          checked={choiceIsSelected(choice, selected)}
          helpText={helpText}
          onChange={handleChange}
        />
        {children}
      </li>
    );
  });

  const errorMarkup = error && (
    <div className={styles.Error} id={getUniqueErrorID()}>
      <div className={styles.ErrorIcon}>
        <Icon source="alert" />
      </div>
      {error}
    </div>
  );

  return (
    <fieldset className={className}>
      {titleMarkup}
      <ul className={styles.Choices}>{choicesMarkup}</ul>
      {errorMarkup}
    </fieldset>
  );
}

function choiceIsSelected({value}: Choice, selected: string[]) {
  return selected.indexOf(value) >= 0;
}

function updateSelectedChoices(
  {value}: Choice,
  checked: boolean,
  selected: string[],
  allowMultiple = false,
) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter((selectedChoice) => selectedChoice !== value);
}

export default withAppProvider<Props>()(ChoiceList);
