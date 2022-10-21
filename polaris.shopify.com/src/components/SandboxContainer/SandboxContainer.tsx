import React from 'react';
import styles from './SandboxContainer.module.scss';
import {className} from '../../utils/various';

function SandboxContainer({children}: {children: React.ReactNode}) {
  return (
    <div
      className={className(
        'styles-for-site-but-not-polaris-examples',
        styles.Container,
      )}
    >
      {children}
    </div>
  );
}

export default SandboxContainer;
