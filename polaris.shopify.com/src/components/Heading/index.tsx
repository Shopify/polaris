import styles from './Heading.module.scss';
import {className as classNames} from '../../utils/various';

export interface HeadingProps extends React.PropsWithChildren {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export const Heading = ({
  as: Tag = 'h1',
  className,
  ...props
}: HeadingProps) => (
  <Tag className={classNames(styles[Tag], className)} {...props} />
);
