import styles from './TokensPage.module.scss';
import {MetaTokenGroupShape, metaThemeDefault} from '@shopify/polaris-tokens';
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
    | 'height'
    | 'motion'
    | 'shadow'
    | 'space'
    | 'text'
    | 'width'
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
    title: 'Border',
    url: `/tokens/border`,
  },
  {
    title: 'Breakpoints',
    url: `/tokens/breakpoints`,
  },
  {
    title: 'Color',
    url: `/tokens/color`,
  },
  {
    title: 'Font',
    url: `/tokens/font`,
  },
  {
    title: 'Height',
    url: `/tokens/height`,
  },
  {
    title: 'Motion',
    url: `/tokens/motion`,
  },
  {
    title: 'Shadow',
    url: `/tokens/shadow`,
  },
  {
    title: 'Space',
    url: `/tokens/space`,
  },
  {
    title: 'Text',
    url: `/tokens/text`,
  },
  {
    title: 'Width',
    url: `/tokens/width`,
  },
  {
    title: 'Z-Index',
    url: `/tokens/z-index`,
  },
];

function tokensToFilteredArray(
  filter: string,
  tokenGroup: MetaTokenGroupShape,
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
    border: tokensToFilteredArray(filter, metaThemeDefault.border),
    breakpoints: tokensToFilteredArray(filter, metaThemeDefault.breakpoints),
    color: tokensToFilteredArray(filter, metaThemeDefault.color),
    font: tokensToFilteredArray(filter, metaThemeDefault.font),
    height: tokensToFilteredArray(filter, metaThemeDefault.height),
    motion: tokensToFilteredArray(filter, metaThemeDefault.motion),
    shadow: tokensToFilteredArray(filter, metaThemeDefault.shadow),
    space: tokensToFilteredArray(filter, metaThemeDefault.space),
    text: tokensToFilteredArray(filter, metaThemeDefault.text),
    width: tokensToFilteredArray(filter, metaThemeDefault.width),
    zIndex: tokensToFilteredArray(filter, metaThemeDefault.zIndex),
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
