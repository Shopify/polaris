import styles from './TokensPage.module.scss';
import {MetadataGroup, metadata as allTokens} from '@shopify/polaris-tokens';
import {Status, TokenPropertiesWithName} from '../../types';
import TokenList from '../TokenList';

interface Props {
  tokenGroup:
    | 'breakpoints'
    | 'colors'
    | 'depth'
    | 'font'
    | 'motion'
    | 'shape'
    | 'spacing'
    | 'zIndex';
}

export type NavItem = {
  title: string;
  url?: string;
  status?: Status;
  children?: NavItem[];
};

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

  const tokens = {
    breakpoints: tokensToFilteredArray(filter, allTokens.breakpoints),
    colors: tokensToFilteredArray(filter, allTokens.colors),
    depth: tokensToFilteredArray(filter, allTokens.depth),
    font: tokensToFilteredArray(filter, allTokens.font),
    motion: tokensToFilteredArray(filter, allTokens.motion),
    shape: tokensToFilteredArray(filter, allTokens.shape),
    spacing: tokensToFilteredArray(filter, allTokens.spacing),
    zIndex: tokensToFilteredArray(filter, allTokens.zIndex),
  };

  const keyframeStyles = tokens['motion']
    .filter(({name}) => name.includes('keyframes'))
    .map(({name, value}) => `@keyframes ${name} ${value}`)
    .join('\n');

  return (
    <div className={styles.TokensPage}>
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

      <style jsx>{keyframeStyles}</style>
    </div>
  );
}

export default TokensPage;
