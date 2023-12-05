import React from 'react';

import {Icon} from '../../../Icon';
import type {IconProps} from '../../../Icon';
import {Option} from '../Option';
import type {OptionProps} from '../Option';
import {TextOption} from '../TextOption';
import {classNames} from '../../../../utilities/css';
import {ActionContext} from '../../../../utilities/listbox/context';

import styles from './Action.scss';

interface ActionProps extends OptionProps {
  icon?: IconProps['source'];
}

export function Action(props: ActionProps) {
  const {selected, disabled, children, icon, divider} = props;

  const iconMarkup = icon && (
    <div className={styles.Icon}>
      <Icon tone="subdued" source={icon} />
    </div>
  );

  const className = classNames(styles.Action, divider && styles.ActionDivider);

  return (
    <ActionContext.Provider value>
      <Option {...props}>
        <div className={className}>
          <TextOption selected={selected} disabled={disabled}>
            {iconMarkup}
            {children}
          </TextOption>
        </div>
      </Option>
    </ActionContext.Provider>
  );
}
