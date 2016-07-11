// @flow

import React from 'react';
import styles from './ChoiceList.scss';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import {noop} from '../../utilities/other';

type OptionType = string | {
  value?: string,
  label: string,
  [key: string]: any,
};

type Props = {
  options: OptionType[],
  selected: string[],
  name?: string,
  onChange?: (selected: string[]) => void,
  allowMultiple?: boolean,
};

export default function ChoiceList({
  allowMultiple,
  options,
  selected,
  onChange = noop,
  name = uniqueID(),
}: Props) {
  const Component = allowMultiple ? Checkbox : RadioButton;

  return (
    <div className={styles.ChoiceList}>
      {options.map((option) => renderOptionWithComponent(option, Component, {
        name,
        checked: optionIsSelected(option, selected),
        onClick: () => onChange(addOptionToSelected(option, selected, allowMultiple)),
      }))}
    </div>
  );
}

function optionIsSelected(option: OptionType, selected: string[]) {
  return selected.includes(nameForOption(option));
}

function addOptionToSelected(option: OptionType, selected: string[], allowMultiple: boolean = false) {

  return allowMultiple ? [...selected, nameForOption(option)] : [nameForOption(option)];
}

function nameForOption(option: OptionType) {
  return typeof option === 'string' ? option : option.label;
}

function renderOptionWithComponent(option: OptionType, Component: ReactClass, props?: Object) {
  if (typeof option === 'string') {
    return <Component label={option} {...props} />;
  }

  return <Component {...option} {...props} />;
}

let index = 1;
function uniqueID() {
  return `ChoiceList${index++}`;
}
