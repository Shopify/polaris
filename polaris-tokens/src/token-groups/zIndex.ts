import type {TokenGroup} from '../types';

export const zIndex = {
  'z-index-1': {
    value: '100',
  },
  'z-index-2': {
    value: '400',
  },
  'z-index-3': {
    value: '510',
  },
  'z-index-4': {
    value: '512',
  },
  'z-index-5': {
    value: '513',
  },
  'z-index-6': {
    value: '514',
  },
  'z-index-7': {
    value: '515',
  },
  'z-index-8': {
    value: '516',
  },
  'z-index-9': {
    value: '517',
  },
  'z-index-10': {
    value: '518',
  },
  'z-index-11': {
    value: '519',
  },
  'z-index-12': {
    value: '520',
  },
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

export type ZIndexTokenGroup = TokenGroup<typeof zIndex>;
export type ZIndexTokenName = keyof ZIndexTokenGroup;

export const zIndexZScale = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const;
export type ZIndexZScale = typeof zIndexZScale[number];
