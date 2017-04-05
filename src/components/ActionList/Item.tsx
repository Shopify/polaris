import * as React from 'react';
import Icon, {Props as IconProps} from '../Icon';
import UnstyledLink from '../UnstyledLink';
import * as styles from './ActionList.scss';

export interface Props {
  text: string,
  icon?: IconProps['source'],
  image?: string,
  to?: string,
  onClick?(): void,
}

export default function Item({text, to, onClick, icon, image}: Props) {
  let imageElement = null;

  if (icon) {
    imageElement = (
      <div className={styles.Image}>
        <Icon source={icon} size="fill" />
      </div>
    );
  } else if (image) {
    imageElement = (
      <div
        role="presentation"
        className={styles.Image}
        style={{backgroundImage: image}}
      />
    );
  }

  const content = imageElement
    ? (
      <div className={styles.Content}>
        {imageElement}
        <div className={styles.Text}>{text}</div>
      </div>
    )
    : text;

  const control = to
    ? <UnstyledLink to={to} className={styles.Item}>{content}</UnstyledLink>
    : <button onClick={onClick} className={styles.Item}>{content}</button>;

  return <li>{control}</li>;
}
