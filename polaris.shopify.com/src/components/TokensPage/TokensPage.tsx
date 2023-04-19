import styles from './TokensPage.module.scss';
import {MetadataGroup, metadata as allTokens} from '@shopify/polaris-tokens';
import {Status, TokenPropertiesWithName} from '../../types';
import TokenList from '../TokenList';
import Link from 'next/link';
import {slugify} from '../../utils/various';
import {useRouter} from 'next/router';
import Page from '../Page';

interface Props {
  tokenGroup:
    | 'border'
    | 'breakpoints'
    | 'color'
    | 'font'
    | 'motion'
    | 'shadow'
    | 'spacing'
    | 'zIndex';
}

export type NavItem = {
  title: string;
  url?: string;
  status?: Status;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: 'Color',
    url: `/tokens/color`,
  },
  {
    title: 'Font',
    url: `/tokens/font`,
  },
  {
    title: 'Border',
    url: `/tokens/border`,
  },
  {
    title: 'Space',
    url: `/tokens/space`,
  },
  {
    title: 'Shadow',
    url: `/tokens/shadow`,
  },
  {
    title: 'Motion',
    url: `/tokens/motion`,
  },
  {
    title: 'Breakpoints',
    url: `/tokens/breakpoints`,
  },
  {
    title: 'Z-Index',
    url: `/tokens/z-index`,
  },
];

function tokensToFilteredArray(
  filter: string,
  tokenGroup: MetadataGroup,
): TokenPropertiesWithName[] {
  return Object.entries(tokenGroup)
    .filter(([name]) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    })
    .map(([name, value]) => {
      return {name, ...value};
    });
}

function TokensPage({tokenGroup}: Props) {
  const filter = '';
  const router = useRouter();

  const tokens = {
    border: tokensToFilteredArray(filter, allTokens.border),
    breakpoints: tokensToFilteredArray(filter, allTokens.breakpoints),
    color: tokensToFilteredArray(filter, allTokens.color),
    font: tokensToFilteredArray(filter, allTokens.font),
    motion: tokensToFilteredArray(filter, allTokens.motion),
    shadow: tokensToFilteredArray(filter, allTokens.shadow),
    space: tokensToFilteredArray(filter, allTokens.space),
    zIndex: tokensToFilteredArray(filter, allTokens.zIndex),
  };

  const keyframeStyles = tokens['motion']
    .filter(({name}) => name.includes('keyframes'))
    .map(({name, value}) => `@keyframes ${name} ${value}`)
    .join('\n');

  return (
    <Page>
      <div className={styles.TokensPage}>
        <div className={styles.Banner}>
          <h1>Tokens</h1>
        </div>

        <div className={styles.Tokens}>
          <nav className={styles.TokensNav}>
            <ul>
              {navItems.map((item) => {
                if (!item.url) return null;
                const isCurrent = router.asPath.endsWith(slugify(item.title));
                return (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <TokenList>
            {tokens[tokenGroup]
              .sort((token) =>
                token.name.includes('ease') || token.name.includes('linear')
                  ? -1
                  : 1,
              )
              .map((token) => (
                <TokenList.Item
                  key={token.name}
                  category={tokenGroup}
                  token={token}
                />
              ))}
          </TokenList>
        </div>

        <style jsx>{keyframeStyles}</style>
      </div>
    </Page>
  );
}

export default TokensPage;
