import Image from "../Image";
import { className } from "../../utils/various";
import Tooltip from "../Tooltip";
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
  isSelected?: boolean;
  fileName: string;
}

function IconGridItem({
  icon,
  isSelected,
  fileName,
  searchResultData,
}: IconGridItemProps) {
  return (
    <div
      key={`${fileName}`}
      className={className(
        styles.Icon,
        searchResultData?.isHighlighted && styles.isHighlighted,
        isSelected && styles.isSelected
      )}
      {...searchResultData?.itemAttributes}
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
        <>
          <div className={styles.SVGWrapper}>
            <Image
              src={`/icons/${fileName}.svg`}
              alt={icon.description}
              width={20}
              height={20}
              fadeIn={false}
            />
          </div>
          <span style={{ fontSize: 12, color: "#aaa" }}>{icon.name}</span>
        </>
      </Tooltip>
    </div>
  );
}

IconGrid.Item = IconGridItem;

export default IconGrid;
