import {classNames} from '../../../../../../utilities/css';
import {useToggle} from '../../../../../../utilities/use-toggle';
import styles from '../../ConnectedFilterControl.scss';

interface ItemProps {
  children?: React.ReactNode;
}

export function Item({children}: ItemProps) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused,
  } = useToggle(false);

  const className = classNames(styles.Item, focused && styles['Item-focused']);

  return (
    <div
      onBlur={forceFalseFocused}
      onFocus={forceTrueFocused}
      className={className}
    >
      {children}
    </div>
  );
}
