// @flow

import React from 'react';

import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';

import {noop} from '../../utilities/other';

import styles from './ChoiceList.scss';

type Option = string | {
  value?: string,
  label: string,
  [key: string]: any,
};

type Props = {
  options: Option[],
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
      {options.map((option, index) => renderOptionWithComponent(option, Component, {
        name,
        key: index,
        checked: optionIsSelected(option, selected),
        onClick: () => onChange(addOptionToSelected(option, selected, allowMultiple)),
      }))}
    </div>
  );
}

function optionIsSelected(option: Option, selected: string[]) {
  return selected.includes(nameForOption(option));
}

function addOptionToSelected(option: Option, selected: string[], allowMultiple: boolean = false) {

  return allowMultiple ? [...selected, nameForOption(option)] : [nameForOption(option)];
}

function nameForOption(option: Option) {
  return typeof option === 'string' ? option : option.label;
}

function renderOptionWithComponent(option: Option, Component: ReactClass<{props: {label: Option}}>, props?: Object) {
  if (typeof option === 'string') {
    return <Component label={option} {...props} />;
  }

  return <Component {...option} {...props} />;
}

let index = 1;
function uniqueID() {
  return `ChoiceList${index++}`;
}
