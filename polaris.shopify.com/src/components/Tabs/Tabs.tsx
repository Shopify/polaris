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
                  {/* <div className={styles.Icon}>
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11 1h7a1 1 0 011 1v7a.999.999 0 01-.29.71l-.29.29H16a6 6 0 00-6 6v2.42l-.29.29a1 1 0 01-1.42 0l-7-7a.999.999 0 010-1.42l9-9A1.001 1.001 0 0111 1zm3.667 4.747a1.5 1.5 0 101.666-2.494 1.5 1.5 0 00-1.666 2.494zm5.04 9.546A1 1 0 0019 15h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 00.707-1.707z"
                        fill="#222"
                      />
                    </svg>
                  </div> */}
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
