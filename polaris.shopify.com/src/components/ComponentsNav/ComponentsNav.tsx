import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from "../../utils/various";
import { LinkButton } from "../Button/Button";
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
        <h1>Components</h1>

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

        <LinkButton pill href={`/components`} aria-current={category === "all"}>
          All
        </LinkButton>

        {componentCategories.map((thisCategory) => (
          <LinkButton
            key={thisCategory}
            pill
            href={`/components/${slugify(thisCategory)}`}
            aria-current={category === thisCategory}
          >
            {thisCategory}
          </LinkButton>
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
                      <h2>{name}</h2>
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
