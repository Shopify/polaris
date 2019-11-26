import React from 'react';
import {useForcibleToggle} from '../../../../utilities/use-toggle';
import {classNames} from '../../../../utilities/css';

import styles from '../../ButtonGroup.scss';

export interface ItemProps {
  button: React.ReactElement;
}

export function Item({button}: ItemProps) {
  const [
    focused,
    {forceTrue: forceTrueFocused, forceFalse: forceFalseFocused},
  ] = useForcibleToggle(false);

  const className = classNames(
    styles.Item,
    focused && styles['Item-focused'],
    button.props.plain && styles['Item-plain'],
  );

  return (
    <div
      className={className}
      onFocus={forceTrueFocused}
      onBlur={forceFalseFocused}
    >
      {button}
    </div>
  );
}
