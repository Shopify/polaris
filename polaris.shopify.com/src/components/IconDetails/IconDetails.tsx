import React from 'react';
import Link from 'next/link';
import Image from '../Image';
import Code from '../Code';
import styles from './IconDetails.module.scss';

interface Props {
  fileName: string;
  iconData: {
    name: string;
    set: string;
    description: string;
    keywords: string[];
  };
}

function IconDetails({fileName, iconData}: Props) {
  if (!fileName) return <EmptyState />;

  const {set, description, name, keywords} = iconData;

  const reactExamples = {
    imports: `import {\n  ${fileName}\n} from '@shopify/polaris-icons';`,
    componentUsage: `<Icon\n  source={${fileName}}\n  color="base"\n/>`,
  };
  const figmaUIKitURl =
    'https://www.figma.com/community/file/1110993965108325096';
  const polarisIconsUrl =
    'https://www.npmjs.com/package/@shopify/polaris-icons#usage';
  const iconComponentUrl = '/components/icon';
  const githubIssueSubject = `[Icon]: Update icon ${fileName}`;
  const proposeChangeUrl = `https://github.com/Shopify/polaris/issues/new?assignees=&labels=Icon&template=UPDATE_ICON.yml&title=${encodeURIComponent(
    githubIssueSubject,
  )}`;

  return (
    <div className={styles.IconDetails}>
      <div className={styles.Section}>
        <div className={styles.Preview}>
          <Image
            src={`/icons/${fileName}.svg`}
            alt={description}
            width={40}
            height={40}
            icon
          />
          <div className={styles.SetBadge}>{set}</div>
        </div>

        <h2 className={styles.Title}>{name}</h2>

        {description !== 'N/A' && (
          <p className={styles.IconDescription}>
            {description}{' '}
            <span className={styles.Keywords}>
              {keywords
                .filter((keyword) => keyword !== 'N/A')
                .map((keyword, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Link
                        key={keyword}
                        href={{query: {icon: fileName, q: keyword}}}
                        scroll={false}
                      >
                        {keyword}
                      </Link>
                      {i < keywords.length - 1 && ' '}
                    </React.Fragment>
                  );
                })}
            </span>
          </p>
        )}

        <a
          className={styles.DownloadButton}
          href={`/icons/${fileName}.svg`}
          download
        >
          Download
        </a>
      </div>

      <div className={styles.Section}>
        <h3 className={styles.Subtitle}>Figma</h3>
        <p className={styles.SmallParagraph}>
          Use the <a href={figmaUIKitURl}>Polaris Icon Library</a> to access all
          icons right inside Figma.
        </p>
      </div>

      <div className={styles.Section}>
        <h3 className={styles.Subtitle}>React</h3>
        <p className={styles.SmallParagraph}>
          Import the icon from <a href={polarisIconsUrl}>polaris-icons</a>:
        </p>

        <div className={styles.CodeWrapper}>
          <Code code={{title: 'Import', code: reactExamples.imports}} />
        </div>

        <p className={styles.SmallParagraph}>
          Then render it using the{' '}
          <Link href={iconComponentUrl}>icon component</Link>:
        </p>

        <div className={styles.CodeWrapper}>
          <Code
            code={{
              title: 'React component',
              code: reactExamples.componentUsage,
            }}
          />
        </div>
      </div>
      <div className={styles.Section}>
        <div className={styles.ProposeChange}>
          <a href={proposeChangeUrl}>Propose a change to this icon</a>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.IconDetails}>
      <div className={styles.EmptyState}>
        <Image
          width={46}
          height={46}
          src="/icons/BehaviorMajor.svg"
          alt="Cursor suggesting to click an item"
          icon
        />
        <p>Select an icon</p>
      </div>
    </div>
  );
}

export default IconDetails;
