import type {NavItem} from '../components/Nav';

export const navItems: NavItem[] = [
  {
    title: 'About tokens',
    children: [
      {title: 'Getting started', url: '/tokens/getting-started'},
      {title: 'Tokens in Figma', url: '/tokens/tokens-in-figma'},
      {title: 'Tokens in code', url: '/tokens/tokens-in-code'},
    ],
  },
  {
    title: 'Tokens',
    children: [
      {title: 'Colors', url: '/tokens/colors'},
      {title: 'Typography', url: '/tokens/typography'},
      {title: 'Shape', url: '/tokens/shape'},
      {title: 'Spacing', url: '/tokens/spacing'},
      {title: 'Depth', url: '/tokens/depth'},
      {title: 'Motion', url: '/tokens/motion'},
      {title: 'Z-index', url: '/tokens/z-index'},
    ],
  },
];
