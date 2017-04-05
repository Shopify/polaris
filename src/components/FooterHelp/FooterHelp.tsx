import * as React from 'react';

import Icon from '../Icon';
import TypeContainer from '../TypeContainer';
import TypeStyle from '../TypeStyle';

import helpIcon from './icons/help.svg';
import * as styles from './FooterHelp.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function FooterHelp({children}: Props) {
  return (
    <section className={styles.FooterHelp}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon source={helpIcon} size={20} color="teal" backdrop />
        </div>
        <TypeContainer>
          <TypeStyle variation="subdued">
            {children}
          </TypeStyle>
        </TypeContainer>
      </div>
    </section>
  );
}
