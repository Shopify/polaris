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
    | 'space'
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
  return (
    Object.entries(tokenGroup)
      // se23: Temporarily filter out experimental tokens
      .filter(([name]) => !name.includes('experimental'))
      .filter(([name]) => {
        return name.toLowerCase().includes(filter.toLowerCase());
      })
      .map(([name, value]) => {
        return {name, ...value};
      })
  );
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
          <p>To use Tokens:</p>
          <h3>Installation</h3>
          <p>Use the following command in your terminal. <br> npm install @shopify/polaris-tokens </p>
          <h3>Usage</h3>
          <p>In Javascript, to access all of the available token groups, use the following code 
            <pre>
              <code>
                // Token values only
                import {tokens} from '@shopify/polaris-tokens';
                
                console.log(tokens.color['color-bg']); // 'rgba(...)'
                
                // Tokens with metadata
                import {metadata} from '@shopify/polaris-tokens';
                
                console.log(metadata.color['color-bg'].value); // 'rgba(...)'
                console.log(metadata.color['color-bg'].description); // 'For use as a background color, in components such as Page and Frame backgrounds.'
              </code>
            </pre>
          </p>
          <p>In CSS, first import all of the css variables. CSS variables are prefixed with --p to signal that these variables are Polaris variables. Use the following code 
            <pre>
              <code>
                import '@shopify/polaris-tokens/css/styles.css';
  
                div {
                  background: var(--p-color-bg);
                }  
              </code>
            </pre>
          </p>
           <p>In JSON, to access a specific token group file via the dist folder, use the following code 
            <pre>
              <code>
                const spacing = require('@shopify/polaris-tokens/json/spacing.json');
              </code>
            </pre>
          </p>
          <p>For further details, refer to <a href="https://github.com/Shopify/polaris/tree/main/polaris-tokens#installation">this link on shopify's github repository.</a> </p>
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
