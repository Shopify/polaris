const other = {};
const other2 = {};

// eslint-disable-next-line prefer-object-spread
export const obj = Object.assign(
  {
    test1: 1,
  },
  other,
  {
    test2: 2,
  },
  other2,
);
