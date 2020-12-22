import React from 'react';
import {CirclePlusMinor} from '@shopify/polaris-icons';

import {Icon} from '../../../../../Icon';
import type {IconProps} from '../../../../../../types';
import {Option, OptionProps} from '../Option';
import {TextOption} from '../TextOption';

import styles from './Action.scss';

interface ActionProps extends OptionProps {
  icon?: IconProps['source'];
}

export function Action(props: ActionProps) {
  const {selected, disabled, children, icon} = props;

  return (
    <Option {...props}>
      <TextOption selected={selected} disabled={disabled}>
        <div className={styles.Action}>
          <div className={styles.Icon}>
            <Icon color="subdued" source={icon ? icon : CirclePlusMinor} />
          </div>
          {children}
        </div>
      </TextOption>
    </Option>
  );
}
