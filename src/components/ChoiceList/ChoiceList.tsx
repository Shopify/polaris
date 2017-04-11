import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import * as styles from './ChoiceList.scss';

export interface ChoiceDescriptor {
  value: string,
  label: string,
}

export type Choice = ChoiceDescriptor;

export interface Props {
  title?: string,
  titleHidden?: boolean,
  choices: Choice[],
  selected: string[],
  name?: string,
  allowMultiple?: boolean,
  onChange?(selected: string[]): void,
}

export default function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  name = uniqueID(),
}: Props) {
  const ControlComponent = allowMultiple ? Checkbox : RadioButton;
  const finalName = allowMultiple ? `${name}[]` : name;
  const className = classNames(styles.ChoiceList, titleHidden && styles.titleHidden);
  const titleMarkup = title
    ? <legend className={styles.Title}>{title}</legend>
    : null;

  const choicesMarkup = choices.map((choice) => {
    const key = choice.value;
    const value = choice.value;
    const label = choice.label;

    function handleChange(checked: boolean) {
      onChange(updateSelectedChoices(choice, checked, selected, allowMultiple));
    }

    return (
      <li key={key}>
        <ControlComponent
          name={finalName}
          value={value}
          label={label}
          checked={choiceIsSelected(choice, selected)}
          onChange={handleChange}
        />
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
  return selected.includes(value);
}

function updateSelectedChoices({value}: Choice, checked: boolean, selected: string[], allowMultiple = false) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter((selectedChoice) => selectedChoice !== value);
}

let index = 1;
function uniqueID() {
  return `ChoiceList${index++}`;
}
