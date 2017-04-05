import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Avatar.scss';

export type Size = 'small' | 'medium' | 'large' ;

export interface Props {
  initials?: string[],
  name: string,
  image?: string,
  circular?: boolean,
  size?: Size,
}

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];

export default function Avatar({
  initials,
  name,
  size= 'medium',
  image,
  circular,
}: Props) {

  const styleClass = initials
    ? styleClassFromInitials(initials)
    : STYLE_CLASSES[0];

  const className = classNames(
    styles.Avatar,
    styleClass && styles[variationName('style', styleClass)],
    size && styles[variationName('size', size)],
    image && styles.hasImage,
    circular && styles.circular,
  );

  let content = null;

  if (image) {
    content = <img className={styles.Image} src={image} alt={name} />;
  } else if (initials) {
    content = <span className={styles.Initials}>{initials.join('')}</span>;
  };

  return (
    <div className={className}>{content}</div>
  );
}

function styleClassFromInitials(initials: string[]) {
  return STYLE_CLASSES[initials[0].charCodeAt(0) % STYLE_CLASSES.length];
}
