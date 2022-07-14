import { useRouter } from "next/router";
import Container from "../Container";
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
      <Container>
        <nav aria-label="Breadcrumb">
          <ul>
            {items.map((item) => (
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
      </Container>
    </div>
  );
}

export default Tabs;
