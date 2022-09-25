export const zIndex = {
  'z-1': {
    value: '100',
  },
  'z-2': {
    value: '400',
  },
  'z-3': {
    value: '510',
  },
  'z-4': {
    value: '512',
  },
  'z-5': {
    value: '513',
  },
  'z-6': {
    value: '514',
  },
  'z-7': {
    value: '515',
  },
  'z-8': {
    value: '516',
  },
  'z-9': {
    value: '517',
  },
  'z-10': {
    value: '518',
  },
  'z-11': {
    value: '519',
  },
  'z-12': {
    value: '520',
  },
};

export type ZIndexTokenGroup = typeof zIndex;
export type ZIndexTokenName = keyof ZIndexTokenGroup;

// e.g. "1" | "2" | "3" | "4" | "5" | "6" | ...
export type ZIndexZScale = Extract<
  ZIndexTokenName,
  `z-${number}`
> extends `z-${infer Scale}`
  ? Scale
  : never;
