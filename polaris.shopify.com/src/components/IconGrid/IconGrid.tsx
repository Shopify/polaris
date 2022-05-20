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

interface IconGridProps {
  children: React.ReactNode;
}

function IconGrid({ children }: IconGridProps) {
  return <ul className={styles.IconGrid}>{children}</ul>;
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
            <p>{icon.description}</p>
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
