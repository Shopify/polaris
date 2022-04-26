import Image from "../Image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { search } from "../../utils/search";
import { SearchResult } from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useCombobox } from "downshift";
import { slugify } from "../../utils/various";
import { useRouter } from "next/router";
import { useRef } from "react";
import { WrappedTextField } from "../TextField/TextField";

interface Props {}

function GlobalSearch({}: Props) {
  const [searchResults, setSearchResults] = useState<SearchResult>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id: "global-search",
    items: searchResults,
    onInputValueChange: ({ inputValue }) => {
      const results = search(inputValue || "");
      setSearchResults(results);
    },
    onSelectedItemChange: (item) => {
      const url = item.selectedItem?.url;
      if (url) {
        router.push(url);
      }
    },
    itemToString: (item) => item?.title || "",
  });

  return (
    <div className={styles.GlobalSearch}>
      <label {...getLabelProps()} className="sr-only">
        Search
      </label>
      <div {...getComboboxProps()}>
        <WrappedTextField
          renderTextField={(className) => (
            <input
              {...getInputProps()}
              placeholder="Search"
              className={className}
            />
          )}
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={"toggle menu"}
          className="sr-only"
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps({})} className={styles.Results}>
        {isOpen &&
          searchResults.map((item, index) => {
            const previousItemHadDifferentCategory =
              searchResults[index - 1] &&
              searchResults[index - 1].category !== item.category;

            const shouldShowCategory =
              index === 0 || previousItemHadDifferentCategory;
            return (
              <Fragment key={`${item.url}`}>
                {shouldShowCategory && (
                  <p className={styles.ResultCategory}>{item.category}</p>
                )}
                <li
                  {...getItemProps({ item, index })}
                  className={styles.Result}
                  data-is-active={highlightedIndex === index}
                >
                  <Link href={item.url} passHref>
                    <a>
                      {item.meta.colorToken?.value && (
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            background: item.meta.colorToken?.value,
                            borderRadius: 100,
                          }}
                        ></div>
                      )}

                      {item.meta.icon?.fileName && (
                        <div
                          style={{
                            filter: `brightness(0%) saturation(0%)`,
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <Image
                              src={`/icons/${item.meta.icon.fileName}.svg`}
                              width={32}
                              height={32}
                              layout="fixed"
                              alt=""
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <p className={styles.Title}>{item.title}</p>
                        <p className={styles.Excerpt}>{item.excerpt}</p>
                      </div>

                      {item.category === "Components" && (
                        <div className={styles.ComponentPreview}>
                          <Image
                            src={`/component-previews/${slugify(
                              item.title
                            )}.png`}
                            width={525}
                            height={300}
                            alt=""
                          />
                        </div>
                      )}
                    </a>
                  </Link>
                </li>
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
}

export default GlobalSearch;
