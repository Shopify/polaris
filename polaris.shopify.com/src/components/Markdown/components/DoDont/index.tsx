import {Fragment, Children} from 'react';
import type {ReactElement, PropsWithChildren} from 'react';
import styles from './styles.module.scss';

import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';
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

    // skip the headings in older uses of <DoDont>
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

export const Do = ({children}: DoDontProps) => {
  return (
    <DirectiveCard status={DirectiveStatusName.Do}>{children}</DirectiveCard>
  );
};

export const Dont = ({children}: DoDontProps) => {
  return (
    <DirectiveCard status={DirectiveStatusName.Dont}>{children}</DirectiveCard>
  );
};
