import type {TokenGroup} from './tokens';

export const spacing: TokenGroup = {
  'space-0': '0',
  'space-025': rem('1px'),
  'space-05': rem('2px'),
  'space-1': rem('4px'),
  'space-2': rem('8px'),
  'space-3': rem('12px'),
  'space-4': rem('16px'),
  'space-5': rem('20px'),
  'space-6': rem('24px'),
  'space-8': rem('32px'),
  'space-10': rem('40px'),
  'space-12': rem('48px'),
  'space-16': rem('64px'),
  'space-20': rem('80px'),
  'space-24': rem('96px'),
  'space-28': rem('112px'),
  'space-32': rem('128px'),
};

// This should be removed when the scss rem function is removed
// and html font size is updated to 100%
// https://github.com/Shopify/polaris-react/issues/4605
function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}
