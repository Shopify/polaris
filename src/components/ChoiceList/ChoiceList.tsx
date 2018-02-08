import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {ReactComponent} from '@shopify/react-utilities/types';
import {noop, createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import * as styles from './ChoiceList.scss';

export interface ChoiceDescriptor {
  value: string,
  label: string,
  disabled?: boolean,
  helpText?: React.ReactNode,
  renderChildren?(isSelected: boolean): React.ReactNode | false,
}

export type Choice = ChoiceDescriptor;

export interface Props {
  title?: string,
  titleHidden?: boolean,
  choices: Choice[],
  selected: string[],
  name?: string,
  allowMultiple?: boolean,
  onChange?(selected: string[], name: string): void,
}

type ChooseableComponent = ReactComponent<{
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  checked?: boolean,
  helpText?: React.ReactNode,
  onChange?(checked: boolean, id: string): void,
}>;

const getUniqueID = createUniqueIDFactory('ChoiceList');

export default function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  name = getUniqueID(),
}: Props) {

  const ControlComponent: ChooseableComponent = allowMultiple
    ? Checkbox
    : RadioButton;

  const finalName = allowMultiple ? `${name}[]` : name;

  const className = classNames(
    styles.ChoiceList,
    titleHidden && styles.titleHidden,
  );

  const titleMarkup = title
    ? <legend className={styles.Title}>{title}</legend>
    : null;

  const choicesMarkup = choices.map((choice) => {
    const {
      value,
      label,
      helpText,
      disabled,
    } = choice;

    function handleChange(checked: boolean) {
      onChange(
        updateSelectedChoices(choice, checked, selected, allowMultiple),
        name,
      );
    }

    const isSelected = choiceIsSelected(choice, selected);
    const children = choice.renderChildren
      ? (
        <div className={styles.ChoiceChildren}>
          {choice.renderChildren(isSelected)}
        </div>
      )
      : null;

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

  return (
    <fieldset className={className}>
      {titleMarkup}
      <ul className={styles.Choices}>
        {choicesMarkup}
      </ul>
    </fieldset>
  );
}

function choiceIsSelected({value}: Choice, selected: string[]) {
  return selected.indexOf(value) >= 0;
}

function updateSelectedChoices({value}: Choice, checked: boolean, selected: string[], allowMultiple = false) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter((selectedChoice) => selectedChoice !== value);
}
