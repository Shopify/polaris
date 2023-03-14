import {style} from '@vanilla-extract/css';

export const actionMenu = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  border: '1px solid red',
  '@media': {
    print: {
      display: 'none !important',
    },
  },
});
