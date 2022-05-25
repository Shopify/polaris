import { useRouter } from "next/router";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./Tabs.module.scss";

interface Props {
  items: {
    title: string;
    url: string;
    isCurrentIfPathStartsWith: string;
  }[];
}

function Tabs({ items }: Props) {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <div className={styles.Tabs}>
      <MaxPageWidthDiv>
        <nav aria-label="Breadcrumb">
          <ul>
            {items.map((item, i) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  aria-current={
                    currentPath.startsWith(item.isCurrentIfPathStartsWith)
                      ? "page"
                      : undefined
                  }
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </MaxPageWidthDiv>
    </div>
  );
}

export default Tabs;
