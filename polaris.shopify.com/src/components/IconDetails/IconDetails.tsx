import Link from "next/link";
import { className } from "../../utils/various";
import Image from "../Image";
import CodeExample from "../CodeExample";
import styles from "./IconDetails.module.scss";

interface Props {
  fileName: string;
  iconData: {
    name: string;
    set: string;
    description: string;
    keywords: string[];
  };
}

function IconDetails({ fileName, iconData }: Props) {
  if (!fileName) {
    return (
      <div className={styles.SidebarCard}>
        <div className={styles.SidebarEmptyState}>
          <span style={{ opacity: 0.25 }}>
            <Image
              width={20}
              height={20}
              src="/icons/BehaviorMajor.svg"
              alt="Cursor suggesting to click an item"
            />
          </span>
          <p>Select an icon</p>
        </div>
      </div>
    );
  }

  const { set, description, name, keywords } = iconData;
  return (
    <div className={styles.SidebarCard}>
      <div className={className(styles.SidebarSection, styles.IconInfo)}>
        <div className={styles.Preview}>
          <div className={styles.PreviewImage}>
            <Image
              src={`/icons/${fileName}.svg`}
              alt={description}
              width={20}
              height={20}
              icon
            />
          </div>
        </div>

        <h2 className={styles.Title}>
          <span>{name}</span>
          <div className={styles.Badge}>{set}</div>
        </h2>

        {description !== "N/A" && (
          <p className={styles.IconDescription}>{description}</p>
        )}

        <div className={styles.Keywords}>
          {keywords
            .filter((keyword) => keyword !== "N/A")
            .map((keyword) => {
              return (
                <Link
                  key={keyword}
                  href={{ query: { icon: fileName, q: keyword } }}
                  scroll={false}
                >
                  {keyword}
                </Link>
              );
            })}
        </div>

        <div className={styles.ActionButtons}>
          <a
            className={styles.DownloadIconButton}
            href={`/icons/${fileName}.svg`}
            download
          >
            Download SVG
          </a>
        </div>
      </div>

      <div className={styles.SidebarSection}>
        <h3 className={styles.Title}>Figma</h3>
        <p className={styles.SmallParagraph}>
          Use the{" "}
          <a href="https:www.figma.com/community/file/1110993965108325096">
            Polaris Icon Library
          </a>{" "}
          to access all icons right inside Figma.
        </p>
      </div>

      <div className={styles.SidebarSection}>
        <h3 className={styles.Title}>React</h3>
        <p className={styles.SmallParagraph}>
          Import the icon from{" "}
          <a href="https:www.npmjs.com/package/@shopify/polaris-icons#usage">
            polaris-icons
          </a>
          :
        </p>

        <div className={styles.CodeExampleWrapper}>
          <CodeExample language="typescript" minimalist>
            {`import {
  ${fileName}
} from '@shopify/polaris-icons';`}
          </CodeExample>
        </div>

        <p className={styles.SmallParagraph}>
          Then render it using the{" "}
          <a href="https:polaris.shopify.com/components/icon">icon component</a>
          :
        </p>

        <div className={styles.CodeExampleWrapper}>
          <CodeExample language="typescript" minimalist>
            {`<Icon
  source={${fileName}}
  color="base"
/>`}
          </CodeExample>
        </div>
      </div>
      <div className={styles.SidebarSection}>
        <div className={styles.ProposeChange}>
          <Link
            href={`https://github.com/Shopify/polaris/issues/new?title=Propose change ${fileName}&labels=Icon`}
          >
            Propose a change to this icon
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IconDetails;
