import {Fragment, Children} from 'react';
import type {ReactElement, PropsWithChildren} from 'react';

import {Box} from '../../../Box';
import styles from './styles.module.scss';

interface DoDontProps extends PropsWithChildren {
  title?: string | null;
}

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
  while (
    i < childrenArray.length &&
    childrenArray[i].type !== 'h4' &&
    // @ts-expect-error This property _can_ exist
    childrenArray[i].type?.name !== 'h4'
  ) {
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
    while (
      i < childrenArray.length &&
      childrenArray[i].type !== 'h4' &&
      // @ts-expect-error This property _can_ exist
      childrenArray[i].type?.name !== 'h4'
    ) {
      target.push(childrenArray[i]);
      i++;
    }
  }

  if (!dos.length && !donts.length) {
    return null;
  }

  return (
    <Fragment>
      {prefix}
      <div className={styles.DoDont}>
        {dos.length ? <Do title={null}>{dos}</Do> : null}
        {donts.length ? <Dont title={null}>{donts}</Dont> : null}
      </div>
    </Fragment>
  );
};

export const Do = ({children, title = 'Do'}: DoDontProps) => {
  return (
    <Box className={[styles.DoDontPart, styles.Do]}>
      {title && <h4>{title}</h4>}
      {children}
    </Box>
  );
};

export const Dont = ({children, title = "Don't"}: DoDontProps) => {
  return (
    <Box className={[styles.DoDontPart, styles.Dont]}>
      {title && <h4>{title}</h4>}
      {children}
    </Box>
  );
};
