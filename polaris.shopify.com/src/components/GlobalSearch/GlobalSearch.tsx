import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { search } from "../../utils/search";
import { Result } from "../../types";
import styles from "./GlobalSearch.module.scss";
import { useCombobox } from "downshift";

interface Props {}

function GlobalSearch({}: Props) {
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  const {
    isOpen,
    selectedItem,
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
        window.location.href = url;
      }
    },
  });

  return (
    <div className={styles.GlobalSearch}>
      <>
        <label {...getLabelProps()} className="sr-only">
          Choose an element:
        </label>
        <div {...getComboboxProps()}>
          <input {...getInputProps()} placeholder="Search" />
          <button
            type="button"
            {...getToggleButtonProps()}
            aria-label={"toggle menu"}
            className="sr-only"
          >
            &#8595;
          </button>
        </div>
        <ul {...getMenuProps()} className={styles.Results}>
          {isOpen &&
            searchResults.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "rgba(0,0,0,.5)" }
                    : {}
                }
                key={`${item.url}`}
                {...getItemProps({ item, index })}
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
                          filter: `brightness(200%)`,
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
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                        }}
                      >
                        {item.excerpt}
                      </p>
                    </div>
                    {item.meta.componentPreview && (
                      <div
                        style={{
                          minWidth: 100 * 2,
                          height: 65.25 * 2,
                          marginLeft: "auto",
                          background: "#333",
                        }}
                      ></div>
                    )}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </>
    </div>
  );
}

export default GlobalSearch;
