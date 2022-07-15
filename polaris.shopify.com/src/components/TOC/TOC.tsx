import { useEffect, useRef, useState } from "react";
import { TOCItem } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import styles from "./TOC.module.scss";

const HEADING_THRESHOLD = 120;

interface Props {
  items: TOCItem[];
}

function getHeaderThreshold(): number {
  const headerHeight = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--header-height");
  const headerMargin = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--header-margin");
  const headerThreshold = parseInt(headerHeight) + parseInt(headerMargin);
  console.log({ headerHeight, headerMargin });
  return headerThreshold;
}

function TOC({ items }: Props) {
  const isNested = !!items.find((item) => item.children.length > 0);
  const [idOfCurrentHeading, setIdOfCurrentHeading] = useState<string>();
  const temporarilyIgnoreScrolling = useRef(false);

  function scrollIntoView(id: string) {
    temporarilyIgnoreScrolling.current = true;
    setIdOfCurrentHeading(id);
    const headerThreshold = getHeaderThreshold();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const top =
        window.scrollY +
        targetEl.getBoundingClientRect().top -
        headerThreshold +
        1;
      window.scrollTo({ top, behavior: "smooth" });

      history.pushState({}, "", `#${id}`);

      setTimeout(() => {
        temporarilyIgnoreScrolling.current = false;
      }, 1000);

      return false;
    }
  }

  const findCurrentHeading = () => {
    if (temporarilyIgnoreScrolling.current === true) {
      return;
    }
    const headings = document.querySelectorAll("#main h2, #main h3");
    let currentHeading: Element | null = null;

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();
      currentHeading = heading;
      if (rect.top < HEADING_THRESHOLD) {
        break;
      }
    }

    if (!currentHeading && headings.length > 0) {
      currentHeading = headings[0];
    }

    if (currentHeading) {
      const id = currentHeading.getAttribute("id");
      if (id) {
        setIdOfCurrentHeading(id);
      }
    }
  };

  useEffect(() => {
    findCurrentHeading();
  }, [items]);

  useEffect(() => {
    findCurrentHeading();
    window.addEventListener("scroll", findCurrentHeading);
    return () => window.removeEventListener("scroll", findCurrentHeading);
  }, []);

  return (
    <div className={className(styles.TOC, isNested && styles.isNested)}>
      <ul>
        {items.map(({ name, children }) => {
          const id = slugify(name);
          return (
            <li key={name}>
              <a
                href={`#${id}`}
                data-is-current={id === idOfCurrentHeading}
                onClick={(evt) => {
                  scrollIntoView(id);
                  evt.preventDefault();
                }}
              >
                {name}
              </a>
              {children.length > 0 && (
                <ul>
                  {children.map((child) => {
                    const id = slugify(child.name);
                    return (
                      <li key={child.name}>
                        <a
                          href={`#${id}`}
                          data-is-current={id === idOfCurrentHeading}
                          onClick={(evt) => {
                            scrollIntoView(id);
                            evt.preventDefault();
                          }}
                        >
                          {child.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TOC;
