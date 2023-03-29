import {className, toPascalCase} from '@/utils';
import Link from 'next/link';
import styles from './Pill.module.scss';

interface Props {
  label: string;
  href?: string;
  asIcon?: true;
  style?: string;
  subdued?: boolean;
}

function Pill({href, label, asIcon, style, subdued}: Props) {
  const classNameValue = className(
    styles.Pill,
    asIcon && styles.asIcon,
    subdued && styles.subdued,
  );
  const dataStyle = (style && toPascalCase(style)) || toPascalCase(label);

  if (href) {
    return (
      <Link href={href} className={classNameValue} data-style={dataStyle}>
        {asIcon ? '' : label}
      </Link>
    );
  }
  return (
    <span className={classNameValue} data-style={dataStyle}>
      {asIcon ? '' : label}
    </span>
  );
}

export default Pill;
