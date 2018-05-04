import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import {ItemDescriptor} from './types';
import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';

import * as styles from './ActionList.scss';

export type Props = ItemDescriptor;

export default function Item({
  content,
  url,
  onAction,
  icon,
  image,
  disabled,
  external,
}: Props) {
  const className = classNames(styles.Item, disabled && styles.disabled);
  let imageElement = null;

  if (icon) {
    imageElement = (
      <div className={styles.Image}>
        <Icon source={icon} />
      </div>
    );
  } else if (image) {
    imageElement = (
      <div
        role="presentation"
        className={styles.Image}
        style={{backgroundImage: `url(${image}`}}
      />
    );
  }

  const contentElement = imageElement ? (
    <div className={styles.Content}>
      {imageElement}
      <div className={styles.Text}>{content}</div>
    </div>
  ) : (
    content
  );

  const control = url ? (
    <UnstyledLink
      url={url}
      onClick={onAction}
      className={styles.Item}
      external={external}
    >
      {contentElement}
    </UnstyledLink>
  ) : (
    <button onClick={onAction} className={className} disabled={disabled}>
      {contentElement}
    </button>
  );

  return <li>{control}</li>;
}
