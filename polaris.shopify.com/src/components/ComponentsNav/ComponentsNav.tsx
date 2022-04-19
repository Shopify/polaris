import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from "../../utils/various";
import Button from "../Button";
import TextField from "../TextField";
import styles from "./ComponentsNav.module.scss";

const componentCategories = getComponentCategories();

function ComponentsNav() {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className={styles.ComponentsNav}>
      <div className={styles.Filters}>
        <div className={styles.TextField}>
          <TextField
            type="text"
            value={filterText}
            onChange={(value) => setFilterText(value)}
            placeholder="Filter components"
          />
        </div>

        <Button
          onClick={() => setFilterCategory("all")}
          aria-pressed={filterCategory === "all"}
          pill
        >
          All
        </Button>
        {componentCategories
          .filter((category) => category !== "other")
          .map((category) => (
            <Button
              key={category}
              onClick={() => setFilterCategory(category)}
              aria-pressed={category === filterCategory}
              pill
            >
              {category}
            </Button>
          ))}
      </div>

      <ul>
        {components
          .filter(({ frontMatter }) => frontMatter.category !== "other")
          .filter(({ frontMatter }) => {
            if (filterCategory === "all") {
              return true;
            }
            return frontMatter.category === filterCategory;
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
                        width={525}
                        height={300}
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
