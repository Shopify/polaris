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
import styles from "./ComponentsNav.module.scss";

const componentCategories = getComponentCategories();

interface Props {}

const layoutOptions = {
  tight: "Tight",
  default: "Default",
};

type LayoutOption = keyof typeof layoutOptions;

function ComponentsNav({}: Props) {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [layout, setLayout] = useState<LayoutOption>("default");

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className={styles.ComponentsNav} data-layout={layout}>
      <div className={styles.Filters}>
        <input
          type="text"
          value={filterText}
          onChange={(evt) => setFilterText(evt.target.value)}
          placeholder="Filter components"
        />

        <Button
          onClick={() => setFilterCategory("all")}
          aria-pressed={filterCategory === "all"}
          small
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
              small
              pill
            >
              {category}
            </Button>
          ))}

        {/* {Object.entries(layoutOptions).map(([key, label]) => (
          <Button
            key={key}
            onClick={() => setLayout(key as LayoutOption)}
            small
          >
            {label}
          </Button>
        ))} */}
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
                    <div className={styles.Preview}></div>
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
