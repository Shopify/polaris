import {NavItems} from '@/types';
import Link from 'next/link';
import {Inter} from 'next/font/google';
import styles from './Frame.module.scss';
import {className} from '@/utils';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Navigation from './components/Navigation';
import GlobalSearch from '../GlobalSearch';

const inter = Inter({subsets: ['latin']});

interface Props {
  navItems: NavItems;
  children: React.ReactNode;
}

function Frame({navItems, children}: Props) {
  return (
    <div className={className(styles.Frame, inter.className)}>
      <Navigation navItems={navItems} />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default Frame;
