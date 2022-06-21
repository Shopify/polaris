import Image from "../Image";
import { className } from "../../utils/various";
import Tooltip from "../Tooltip";
const importedSvgs = require.context(
  "../../../../polaris-icons/icons",
  true,
  /\.svg$/
);
import styles from "./IconGrid.module.scss";
import { Icon, SearchResultItem } from "../../types";

interface IconGridProps {
  children: React.ReactNode;
}

function IconGrid({ children }: IconGridProps) {
  return <ul className={styles.IconGrid}>{children}</ul>;
}

interface IconGridItemProps extends SearchResultItem {
  icon: Icon;
  onClick: (iconName: string) => void;
  isSelected?: boolean;
}

function IconGridItem({
  icon,
  onClick,
  isSelected,
  searchResultData,
}: IconGridItemProps) {
  return (
    <li
      key={`${icon.name}+${icon.set}`}
      className={className(
        styles.Icon,
        searchResultData?.isHighlighted && styles.isHighlighted,
        isSelected && styles.isSelected
      )}
      {...searchResultData?.itemAttributes}
      id={icon.fileName}
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
        <button
          onClick={() => onClick(icon.name)}
          tabIndex={searchResultData?.tabIndex}
        >
          <div className={styles.SVGWrapper}>
            <Image
              src={importedSvgs(`./${icon.fileName}.svg`)}
              alt={icon.description}
              width={20}
              height={20}
              fadeIn={false}
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
