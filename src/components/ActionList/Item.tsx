import * as React from 'react';

import {IconableAction} from '../types';
import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';

import * as styles from './ActionList.scss';

export interface Props extends IconableAction {
  image?: string,
}

export default function Item({content, url, onAction, icon, image}: Props) {
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

  const contentElement = imageElement
    ? (
      <div className={styles.Content}>
        {imageElement}
        <div className={styles.Text}>{content}</div>
      </div>
    )
    : content;

  const control = url
    ? <UnstyledLink url={url} className={styles.Item}>{contentElement}</UnstyledLink>
    : <button onClick={onAction} className={styles.Item}>{contentElement}</button>;

  return <li>{control}</li>;
}
