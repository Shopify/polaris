import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from "../../utils/various";
import Button from "../Button";
import Image from "../Image/Image";
import TextField from "../TextField";
import styles from "./ComponentsNav.module.scss";

const componentCategories = getComponentCategories();

interface Props {
  category: string;
}

function ComponentsNav({ category }: Props) {
  const router = useRouter();
  const currentPath = router.asPath;
  let searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams("");

  const q = searchParams.get("q");
  const [filterText, setFilterText] = useState(q || "");

  useEffect(() => {
    if (q) {
      setFilterText(q);
    }
  }, [q]);

  function getUrl(category: string, filter: string | null): string {
    const queryParam = filter ? `?q=${filter}` : "";
    if (category === "all") {
      return `/components${queryParam}`;
    } else {
      return `/components/${slugify(category)}${queryParam}`;
    }
  }

  return (
    <div className={styles.ComponentsNav}>
      <div className={styles.Filters}>
        <h2>Components</h2>

        <div className={styles.TextField}>
          <TextField
            type="text"
            value={filterText}
            onChange={(value) => {
              setFilterText(value);
              router.replace(getUrl(category, value));
            }}
            placeholder="Filter components"
          />
        </div>

        <Button
          onClick={() => router.replace(getUrl("all", filterText))}
          aria-pressed={category === "all"}
          pill
        >
          All
        </Button>

        {componentCategories.map((thisCategory) => (
          <Button
            key={thisCategory}
            onClick={() => router.replace(getUrl(thisCategory, filterText))}
            aria-pressed={category === thisCategory}
            pill
          >
            {thisCategory}
          </Button>
        ))}
      </div>

      <ul>
        {components
          .filter(({ frontMatter }) => {
            if (category === "all") {
              return true;
            }
            return frontMatter.category === category;
          })
          .filter(({ frontMatter }) =>
            frontMatter.name.toLowerCase().includes(filterText.toLowerCase())
          )
          .map(({ frontMatter, intro }) => {
            const { name, category } = frontMatter;
            const url = `/components/${slugify(category)}/${slugify(
              name.toLowerCase()
            )}`;
            return (
              <li key={name}>
                <Link href={url} passHref>
                  <a aria-current={currentPath === url ? "page" : "false"}>
                    <div className={styles.Preview}>
                      <Image
                        src={`/component-previews/${slugify(name)}.png`}
                        layout="responsive"
                        width={525 * 2}
                        height={300 * 2}
                        alt=""
                      />
                    </div>
                    <div>
                      <h4>{name}</h4>
                      <p>{stripMarkdownLinks(intro)}</p>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default ComponentsNav;
