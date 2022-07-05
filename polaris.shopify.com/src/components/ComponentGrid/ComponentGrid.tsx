import Image from "../Image";
import Link from "next/link";
import { className, slugify } from "../../utils/various";
import { Status } from "../../types";
import styles from "./ComponentGrid.module.scss";
import StatusBadge from "../StatusBadge";
import { useGlobalSearchResult } from "../GlobalSearch/GlobalSearch";

interface ComponentGridProps {
  children: React.ReactNode;
}

function ComponentGrid({ children }: ComponentGridProps) {
  return <ul className={styles.ComponentGrid}>{children}</ul>;
}

interface ComponentGridItemProps {
  name: string;
  description: string;
  url: string;
  status?: Status;
}

function ComponentGridItem({
  name,
  description,
  url,
  status,
}: ComponentGridItemProps) {
  const attributes = useGlobalSearchResult();

  return (
    <li key={name} className={className(styles.Component)} {...attributes}>
      <Link href={url} passHref>
        <a tabIndex={attributes?.tabIndex}>
          <div className={styles.Preview}>
            <Image
              src={`/component-previews/${slugify(name)}.png`}
              layout="responsive"
              width={525}
              height={300}
              quality={70}
              sizes="300px"
              alt={`Screenshot of the ${name} component`}
              lazyBoundary="1000px"
            />
          </div>
          <div className={styles.ComponentDescription}>
            <h4>
              {name}
              {status && (
                <>
                  {" "}
                  <StatusBadge status={status} />
                </>
              )}
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
