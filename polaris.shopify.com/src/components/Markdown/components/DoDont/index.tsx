import {Fragment, Children} from 'react';
import type {ReactElement, PropsWithChildren} from 'react';

import {Box} from '../../../Box';
import styles from './styles.module.scss';

/* Must have the following structure:
 * <DoDont>
 *
 * #### Do
 *
 * (do content: paragraphs, lists, images, etc)
 *
 * #### Don't
 *
 * (don't content: paragraphs, lists, images, etc)
 *
 * </DoDont>
 */
export const DoDont = ({children}: PropsWithChildren) => {
  const childrenArray = Children.toArray(children) as ReactElement[];
  const prefix = [];
  let i = 0;

  // leading paragraphs, etc, need to be kept as they are
  while (i < childrenArray.length && childrenArray[i].type !== 'h4') {
    prefix.push(childrenArray[i]);
    i++;
  }

  const dos: ReactElement[] = [];
  const donts: ReactElement[] = [];
  let target: ReactElement[];

  while (i < childrenArray.length) {
    target = childrenArray[i].props.children.startsWith('Don') ? donts : dos;

    // Add the heading
    target.push(childrenArray[i]);
    i++;

    // Add all the non-headings
    while (i < childrenArray.length && childrenArray[i].type !== 'h4') {
      target.push(childrenArray[i]);
      i++;
    }
  }

  return (
    <Fragment>
      {prefix}
      <div className={styles.DoDont}>
        <Box className={[styles.DoDontPart, styles.Do]}>{dos}</Box>
        <Box className={[styles.DoDontPart, styles.Dont]}>{donts}</Box>
      </div>
    </Fragment>
  );
};
