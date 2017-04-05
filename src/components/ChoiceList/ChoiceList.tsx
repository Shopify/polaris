import * as React from 'react';

import {noop} from '@shopify/javascript-utilities/other';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import * as styles from './ChoiceList.scss';

export interface Choice {
  value: string,
  label: React.ReactNode,
}

export interface Props {
  title?: React.ReactNode,
  choices: Choice[],
  selected: string[],
  name?: string,
  allowMultiple?: boolean,
  onChange?(selected: string[]): void,
}

export default function ChoiceList({
  title,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  name = uniqueID(),
}: Props) {
  const ControlComponent = allowMultiple ? Checkbox : RadioButton;
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
          name={name}
          value={value}
          label={label}
          checked={choiceIsSelected(choice, selected)}
          onChange={handleChange}
        />
      </li>
    );
  });

  return (
    <fieldset className={styles.ChoiceList}>
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
