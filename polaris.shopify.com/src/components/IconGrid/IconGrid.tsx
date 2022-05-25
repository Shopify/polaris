import Image from "../Image";
import { className } from "../../utils/various";
import Tooltip from "../Tooltip";
const importedSvgs = require.context(
  "../../../../polaris-icons/icons",
  true,
  /\.svg$/
);
import styles from "./IconGrid.module.scss";
import { Icon, HighlightableSearchResult } from "../../types";
import { Children } from "react";

const COLUMN_COUNT = 8;

interface IconGridProps {
  children: React.ReactNode;
}

function IconGrid({ children }: IconGridProps) {
  const childCount = Children.count(children);
  const extraElements =
    childCount < COLUMN_COUNT ? COLUMN_COUNT - childCount : 0;

  return (
    <ul className={styles.IconGrid}>
      {children}
      {[...Array(extraElements)].map((i) => (
        <li key={i}></li>
      ))}
    </ul>
  );
}

interface IconGridItemProps extends HighlightableSearchResult {
  icon: Icon;
  onClick: (iconName: string) => void;
}

function IconGridItem({
  icon,
  onClick,
  isHighlighted,
  getItemProps = () => undefined,
}: IconGridItemProps) {
  return (
    <li
      key={`${icon.name}+${icon.set}`}
      className={className(styles.Icon, isHighlighted && styles.isHighlighted)}
      {...getItemProps()}
    >
      <Tooltip
        ariaLabel={icon.description}
        placement="top"
        renderContent={() => (
          <div>
            <p>
              {icon.description === "N/A" ? "No description" : icon.description}
            </p>
          </div>
        )}
      >
        <button onClick={() => onClick(icon.name)}>
          <div style={{ filter: "brightness(-500%)" }}>
            <Image
              src={importedSvgs(`./${icon.fileName}.svg`)}
              alt={icon.description}
              width={24}
              height={24}
            />
          </div>
          <span style={{ fontSize: 12, color: "#aaa" }}>{icon.name}</span>
        </button>
      </Tooltip>
    </li>
  );
}

IconGrid.Item = IconGridItem;

export default IconGrid;
