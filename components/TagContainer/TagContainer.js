// @flow

import React from 'react';

import Tag from '../Tag';
import styles from './TagContainer.scss';

type Props = {
  tags: string[],
  onRemove?: (tag: string) => void,
};

export default function TagContainer({tags, onRemove}: Props) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.TagContainer}>
      {tags.map((tag) => <Tag key={tag} onRemove={onRemove}>{tag}</Tag>)}
    </div>
  );
}
