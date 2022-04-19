import Image from "next/image";
import { useState } from "react";
import TextField from "../TextField";
import icons from "../../data/icons.json";
import Fuse from "fuse.js";
import styles from "./IconGallery.module.scss";

interface Props {}

const fuse = new Fuse(icons, {
  threshold: 0.25,
  keys: [
    { name: "title", weight: 3 },
    "description",
    { name: "keywords", weight: 2 },
  ],
});

function IconGallery({}: Props) {
  const [selectedIconName, setSelectedIconName] = useState<string>();
  const [filterString, setFilterString] = useState("");

  const selectedIcon = icons.find((icon) => icon.name === selectedIconName);

  let filteredIcons = icons;
  if (filterString) {
    const fuseResults = fuse.search(filterString);
    filteredIcons = fuseResults.map((result) => result.item);
  }

  return (
    <div className={styles.IconGallery}>
      <div className={styles.Filter}>
        <TextField
          value={filterString}
          onChange={(value) => setFilterString(value)}
          placeholder="Filter icons"
        />
      </div>

      <div className={styles.IconGrids}>
        <div>
          <h3>Major</h3>
          <p>Used for things like lorem ipsum dolor et amet consecteur</p>
          <IconGrid
            filteredIcons={filteredIcons.filter((icon) => icon.set === "major")}
          />
        </div>

        <div>
          <h3>Minor</h3>
          <p>Used for things like lorem ipsum dolor et amet consecteur</p>
          <IconGrid
            filteredIcons={filteredIcons.filter((icon) => icon.set === "minor")}
          />
        </div>
      </div>
    </div>
  );
}

function IconGrid({ filteredIcons }: { filteredIcons: typeof icons }) {
  return (
    <ul className={styles.IconGrid}>
      {filteredIcons.map((icon) => (
        <li key={`${icon.name}+${icon.set}`} className={styles.Icon}>
          <div style={{ filter: "brightness(-500%)" }}>
            <Image
              src={`/icons/${icon.fileName}.svg`}
              alt={icon.description}
              width={16}
              height={16}
            />
          </div>
          <span style={{ fontSize: 12, color: "#aaa" }}>{icon.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default IconGallery;
