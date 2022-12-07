import {className as classNames} from '../../utils/various';
import styles from './Stack.module.scss';

export interface StackProps extends React.PropsWithChildren {
  gap?:
    | '0'
    | '025'
    | '05'
    | '1'
    | '10'
    | '12'
    | '16'
    | '2'
    | '20'
    | '24'
    | '28'
    | '3'
    | '32'
    | '4'
    | '5'
    | '6'
    | '8';
  className?: string;
}

export const Stack = ({gap = '0', className, ...props}: StackProps) => (
  <div
    className={classNames(styles.Stack, className)}
    style={{'--stack-gap-prop': `var(--p-space-${gap})`}}
    {...props}
  />
);
