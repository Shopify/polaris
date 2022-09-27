import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import useDarkMode from 'use-dark-mode';

import Header from '../Frame';
import {className} from '../../utils/various';
import styles from './Page.module.scss';

interface Props {
  children: React.ReactNode;
}

function Page({children}: Props) {
  const router = useRouter();
  const darkMode = useDarkMode(false);

  const isPolaris = router.asPath.startsWith('/examples');

  useEffect(() => {
    document.documentElement.style.setProperty(
      'color-scheme',
      darkMode.value ? 'dark' : 'light',
    );
  }, [darkMode.value]);

  return (
    <div
      style={{background: isPolaris ? '#fafafa' : 'unset'}}
      className={className(
        styles.Page,
        !isPolaris && 'styles-for-site-but-not-polaris-examples',
      )}
    >
      {isPolaris ? (
        <>{children}</>
      ) : (
        <Header currentPath={router.asPath} darkMode={darkMode}>
          {children}
        </Header>
      )}
    </div>
  );
}

export default Page;
