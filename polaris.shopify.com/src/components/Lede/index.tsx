import styles from './Lede.module.scss';
import {className as classNames} from '../../utils/various';

export interface LedeProps extends React.PropsWithChildren {
  className?: string;
}

export const Lede = ({className, ...props}: LedeProps) => (
  <p className={classNames(styles.LedeParagraph, className)} {...props} />
);
