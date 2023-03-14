import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';
import {ResolvedPage} from '../Editor/types';

function Breadcrumbs({currentPage}: {currentPage: ResolvedPage}) {
  const pageStack: {
    title: string;
    slug: string;
  }[] = [
    {title: 'Home', slug: ''},
    ...currentPage.pageStack.map(({title, slug}) => ({title, slug})),
  ];
  return (
    <nav className={styles.Breadcrumbs} aria-label="Breadcrumb">
      <ul>
        {pageStack.map((page, i) => (
          <li
            key={page.title}
            aria-current={
              currentPage.pageStack.length == i + 1 ? 'page' : 'false'
            }
          >
            <Link href={'#TODO'}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
