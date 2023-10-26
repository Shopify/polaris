import {Fragment, Children} from 'react';
import type {ReactElement, PropsWithChildren} from 'react';
import styles from './styles.module.scss';
import {Box} from '../../../Box';
import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';
interface DoDontProps extends PropsWithChildren {
  className?: string;
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
export const DoDont = ({children, className}: DoDontProps) => {
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
      <Box className={[styles.DoDont, className]}>
        {dos.length ? <Do>{dos}</Do> : null}
        {donts.length ? <Dont>{donts}</Dont> : null}
      </Box>
    </Fragment>
  );
};

export const Do = ({children}: DoDontProps) => {
  return (
    <DirectiveCard minHeight="100%" status={DirectiveStatusName.Do}>
      {children}
    </DirectiveCard>
  );
};

export const Dont = ({children}: DoDontProps) => {
  return (
    <DirectiveCard minHeight="100%" status={DirectiveStatusName.Dont}>
      {children}
    </DirectiveCard>
  );
};
