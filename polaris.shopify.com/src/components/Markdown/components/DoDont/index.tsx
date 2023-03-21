import {Slot} from '@radix-ui/react-slot';
import {PropsWithChildren, Children, Fragment} from 'react';
import {Heading} from '../../../Heading';
import {Box} from '../../../Box';
import styles from './styles.module.scss';

const DefaultDo = ({children}: PropsWithChildren) => (
  <Box className={[styles.DoDontPart, styles.Do]}>
    <Heading as="h4">Do</Heading>
    {children}
  </Box>
);

export const Do = ({
  children,
  asChild,
}: PropsWithChildren<{asChild: boolean}>) => {
  const Component = asChild ? Slot : DefaultDo;
  return <Component>{children}</Component>;
};

const DefaultDont = ({children}: PropsWithChildren) => (
  <Box className={[styles.DoDontPart, styles.Dont]}>
    <Heading as="h4">{"Don't"}</Heading>
    {children}
  </Box>
);

export const Dont = ({
  children,
  asChild,
}: PropsWithChildren<{asChild: boolean}>) => {
  const Component = asChild ? Slot : DefaultDont;
  return <Component>{children}</Component>;
};

export const DoDont = ({children}: PropsWithChildren) => {
  let doEl: any;
  let dontEl: any;
  const prefixes: any = [];
  Children.forEach(children, (child) => {
    // console.log(child, child.type, child.type.name);
    if (child && child?.type === Do) {
      doEl = child;
    } else if (child && child?.type === Dont) {
      dontEl = child;
    } else {
      // If there are any remaining elements we assume they're to be prefixed above the dos and donts UI
      prefixes.push(child);
    }
  });

  if (dontEl === undefined || doEl === undefined) {
    throw new Error("DoDont must have a 'Do' and a 'Dont' child");
  }

  return (
    <Fragment>
      {prefixes}
      <div className={styles.DoDont}>
        {doEl}
        {dontEl}
      </div>
    </Fragment>
  );
};
