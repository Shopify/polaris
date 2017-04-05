import * as React from 'react';

import Tag from '../Tag';
import * as styles from './TagContainer.scss';

export interface Props {
  tags: string[],
  onRemove?(): void,
}

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
