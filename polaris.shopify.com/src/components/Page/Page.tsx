import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import useDarkMode from 'use-dark-mode';

import Header from '../Header';
import {className} from '../../utils/various';

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
        !isPolaris && 'styles-for-site-but-not-polaris-examples',
      )}
    >
      {!isPolaris && <Header currentPath={router.asPath} darkMode={darkMode} />}

      {children}
    </div>
  );
}

export default Page;
