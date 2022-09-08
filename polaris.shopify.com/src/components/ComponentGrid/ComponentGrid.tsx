import Image from '../Image';
import Link from 'next/link';
import {slugify} from '../../utils/various';
import {Status} from '../../types';
import styles from './ComponentGrid.module.scss';
import StatusBadge from '../StatusBadge';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';

interface ComponentGridProps {
  children: React.ReactNode;
}

function ComponentGrid({children}: ComponentGridProps) {
  return <ul className={styles.ComponentGrid}>{children}</ul>;
}

interface ComponentGridItemProps {
  title: string;
  description: string;
  url: string;
  status?: Status;
}

function ComponentGridItem({
  title,
  description,
  url,
  status,
}: ComponentGridItemProps) {
  const searchAttributes = useGlobalSearchResult();
  const statusBadge = status ? (
    <StatusBadge status={{value: status.value, message: status.value}} />
  ) : null;

  return (
    <li key={title} className={styles.Component} {...searchAttributes}>
      <Link href={url} passHref>
        <a tabIndex={searchAttributes?.tabIndex}>
          <div className={styles.Preview}>
            <Image
              src={`/images/components/${slugify(title)}.png`}
              layout="responsive"
              width={525}
              height={300}
              quality={70}
              sizes="300px"
              alt={`Screenshot of the ${title} component`}
              lazyBoundary="1000px"
            />
          </div>
          <div className={styles.ComponentDescription}>
            <h4>
              {`${title} `} {statusBadge}
            </h4>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

ComponentGrid.Item = ComponentGridItem;

export default ComponentGrid;
