import {createCssVariablesFactory} from '../ThemeProvider/utils';
import * as styles from './TextField.scss';

export interface Styles {
  color?: string;
  background?: string;
  border?: string;
  borderFocus?: string;
  placeholder?: string;
}

console.log(styles);

export const mergeStyles = createCssVariablesFactory<Styles>('text-field', {
  color: styles.color,
  background: styles.background,
  border: styles.border,
  borderFocus: styles.borderFocus,
  placeholder: styles.placeholder,
});
