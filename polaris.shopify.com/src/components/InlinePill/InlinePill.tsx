import styles from './InlinePill.module.scss';

type Props<T extends React.ElementType> = {
  as: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const InlinePill = <T extends React.ElementType>(props: Props<T>) => {
  const {as: As = 'button', children, ...rest} = props as Props<T>;
  return (
    <As className={styles.InlinePill} {...rest}>
      {children}
    </As>
  );
};

export default InlinePill;
