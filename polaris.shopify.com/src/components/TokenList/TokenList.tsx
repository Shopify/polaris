import {TokenPropertiesWithName} from '../../types';
import {createContext} from 'react';
import {className, slugify} from '../../utils/various';
import styles from './TokenList.module.scss';
import {useCopyToClipboard} from '../../utils/hooks';
import Image from '../Image';
import Tooltip from '../Tooltip';
import {figmaColorNames} from '../../data/figmaColorNames';
import Link from 'next/link';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';

interface ColumnsConfig {
  preview: boolean;
  name: boolean;
  value: boolean;
  figmaUsage: boolean;
  description: boolean;
}

const defaultColumnsConfig: ColumnsConfig = {
  preview: true,
  name: true,
  value: true,
  figmaUsage: true,
  description: true,
};

interface TokenListProps {
  showTableHeading?: boolean;
  columns?: ColumnsConfig;
  children: React.ReactNode;
}

const TokenListContext = createContext<{
  columns: ColumnsConfig;
}>({columns: defaultColumnsConfig});

function TokenList({
  showTableHeading = true,
  columns = defaultColumnsConfig,
  children,
}: TokenListProps) {
  return (
    <TokenListContext.Provider value={{columns}}>
      <div className={styles.TokenList}>
        <table>
          {showTableHeading && (
            <thead>
              <tr>
                {columns.preview && <th></th>}
                {columns.name && <th>Token name</th>}
                {columns.value && <th>Current value</th>}
                {columns.figmaUsage && <th>Figma usage</th>}
                {columns.description && <th>Description</th>}
              </tr>
            </thead>
          )}
          <tbody>{children}</tbody>
        </table>
        <style jsx>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </TokenListContext.Provider>
  );
}

function getFigmaUsageForToken(
  name: string,
  value: string,
): undefined | string {
  let usage = '—';

  const REM = 16;

  if (value.startsWith('rgba')) {
    usage = figmaColorNames[name] ? `Use ${figmaColorNames[name]}` : '—';
  } else if (name.startsWith('shadow')) {
    usage = 'Use shadow styles from UI kit';
  } else if (name.includes('breakpoint')) {
    const artboardWidth = parseFloat(value) * REM;
    if (artboardWidth > 0) {
      usage = `Set frame width to ${artboardWidth}+ pixels`;
    }
  } else if (name.includes('border-radius-half')) {
    usage = 'Use a circle';
  } else if (name.includes('radius')) {
    const radius = parseFloat(value) * REM;
    usage = `Use a radius of ${radius} pixels`;
  } else if (name.includes('font') || name.includes('line-height')) {
    usage = 'Use typography styles from UI kit';
  } else if (name.includes('space')) {
    const spacing = parseFloat(value) * REM;
    usage = `Use a spacing of ${spacing} pixels`;
  }

  return usage;
}

interface TokenListItemProps {
  category: string;
  token: TokenPropertiesWithName;
}

function TokenListItem({
  category,
  token: {name, value, description},
}: TokenListItemProps) {
  const figmaUsage = getFigmaUsageForToken(name, value);
  const tokenNameWithPrefix = `--p-${name}`;
  const [copy, didJustCopy] = useCopyToClipboard(tokenNameWithPrefix);

  const searchAttributes = useGlobalSearchResult();
  const isClickableSearchResult = !!searchAttributes?.tabIndex;

  return (
    <TokenListContext.Consumer>
      {({columns}) => (
        <tr
          key={name}
          className={className(styles.TokenListItem)}
          {...searchAttributes}
          id={slugify(name)}
        >
          {columns.preview && (
            <td>
              <TokenPreview name={name} value={value} />
              {isClickableSearchResult && (
                <Link href={`/tokens/${category}#${searchAttributes?.id}`}>
                  <a className={styles.ClickableItemLink} tabIndex={-1}>
                    View token
                  </a>
                </Link>
              )}
            </td>
          )}
          {columns.name && (
            <td>
              <span className={styles.TokenContainer}>
                <div className={styles.TokenName}>
                  <span>{tokenNameWithPrefix}</span>
                </div>
                <div className={styles.TokenClipboard}>
                  <Tooltip
                    ariaLabel="Copy to clipboard"
                    renderContent={() => (
                      <div className={styles.TokenToolTip}>
                        <p>{didJustCopy ? 'Copied!' : 'Copy to clipboard'}</p>
                      </div>
                    )}
                  >
                    <button
                      onClick={copy}
                      tabIndex={searchAttributes?.tabIndex}
                    >
                      <Image
                        src="/api/icons/v0/ClipboardMinor.svg"
                        alt="Copy"
                        width={14}
                        height={14}
                        fadeIn={false}
                        icon
                      />
                    </button>
                  </Tooltip>
                </div>
              </span>
            </td>
          )}
          {columns.value && <td className={styles.Value}>{value}</td>}
          {columns.figmaUsage && (
            <td className={styles.FigmaUsage}>{figmaUsage || '—'}</td>
          )}
          {columns.description && (
            <td className={styles.TokenDescription}>{description || '—'}</td>
          )}
        </tr>
      )}
    </TokenListContext.Consumer>
  );
}

TokenList.Item = TokenListItem;

interface TokenPreviewProps {
  name: string;
  value: string;
}

function TokenPreview({name, value}: TokenPreviewProps) {
  const previewDivAttributes = {
    className: styles.Preview,
  };

  // Colors
  if (value.startsWith('rgba')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          background: value,
          minHeight: 52,
          borderRadius: 'var(--border-radius-400)',
        }}
      ></div>
    );
  }

  // Border radii
  else if (name.includes('border-radius')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 50,
            aspectRatio: '1 / 1',
            borderRadius: value,
            background: 'var(--text)',
          }}
        ></div>
      </div>
    );
  }

  // Border width
  else if (name.includes('border-width')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          background: 'transparent',
          display: 'flex',
        }}
      >
        <div
          style={{
            minHeight: value,
            background: 'var(--text)',
            flex: 1,
          }}
        ></div>
      </div>
    );
  }

  // Other borders width
  else if (name.includes('border')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          background: 'var(--surface-subdued)',
        }}
      >
        <div
          style={{
            minHeight: 0,
            borderTop: value,
            flex: 1,
          }}
        ></div>
      </div>
    );
  }

  // Spacing
  else if (name.includes('space')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            aspectRatio: '1/1',
            borderRadius: 100,
            minHeight: '10px',
            background: 'var(--text)',
          }}
        ></div>
        <div
          style={{
            width: value,
            minHeight: '30px',
            background: 'var(--text)',
            opacity: 0.15,
          }}
        ></div>
        <div
          style={{
            aspectRatio: '1/1',
            borderRadius: 100,
            minHeight: '10px',
            background: 'var(--text)',
          }}
        ></div>
      </div>
    );
  }

  // Font families
  else if (name.includes('font-family')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          fontFamily: value,
          background: 'transparent',
        }}
      >
        Commerce
      </div>
    );
  }

  // Font sizes
  else if (name.includes('font-size')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          fontSize: value,
          background: 'transparent',
        }}
      >
        Aa
      </div>
    );
  }

  // Font weights
  else if (name.includes('font-weight')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          fontWeight: value,
          background: 'transparent',
        }}
      >
        Aa
      </div>
    );
  }

  // Line height
  else if (name.includes('line-height')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          lineHeight: value,
          background: 'transparent',
        }}
      >
        Hello
        <br />
        World
      </div>
    );
  }

  // Breakpoints
  else if (name.includes('breakpoints')) {
    const width = (parseInt(value.replace('rem', '')) / 120) * 100;
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 50,
        }}
      >
        <div
          style={{
            minWidth: 4,
            maxWidth: width,
            width: '100%',
            minHeight: 50,
            boxShadow: 'inset 0 0 0 3px var(--text), inset 0 -10px var(--text)',
            borderRadius: 4,
          }}
        ></div>
      </div>
    );
  }

  // Depth
  else if (name.includes('shadow')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 50,
            minHeight: 50,
            background: 'white',
            boxShadow: value,
            borderRadius: 8,
          }}
        ></div>
      </div>
    );
  }

  // Duration
  else if (name.includes('duration')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          background: 'transparent',
        }}
      >
        <div
          style={{
            minHeight: '0%',
            width: '10%',
            paddingBottom: '10%',
            background: 'var(--text)',
            animation: `spin ${value} infinite both linear`,
          }}
        ></div>
      </div>
    );
  }

  // Easing
  else if (name.includes('ease') || name.includes('linear')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          background: 'transparent',
        }}
      >
        <div
          style={{
            minHeight: '0%',
            width: '10%',
            paddingBottom: '10%',
            background: 'var(--text)',
            boxShadow: value,
            animation: `spin 1s ${value} infinite both`,
          }}
        ></div>
      </div>
    );
  }

  // Keyframes
  else if (name.includes('keyframes')) {
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          background: 'transparent',
        }}
      >
        <div
          style={{
            minHeight: '0%',
            width: '10%',
            paddingBottom: '10%',
            background: 'var(--text)',
            boxShadow: value,
            animation: `${name} 1s infinite both`,
          }}
        ></div>
      </div>
    );
  }

  // Z-index
  else if (name.includes('z-')) {
    const layerCount = 12;
    const number = parseInt(name.replace('z-', ''));
    return (
      <div
        {...previewDivAttributes}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {[...Array(layerCount)].map((_, n) => (
          <div
            key={n}
            style={{
              minHeight: 2.5,
              background: 'var(--text)',
              opacity: n + 1 === number ? 1 : 0.08,
              borderRadius: 2,
            }}
          ></div>
        ))}
      </div>
    );
  }

  return null;
}

export default TokenList;
