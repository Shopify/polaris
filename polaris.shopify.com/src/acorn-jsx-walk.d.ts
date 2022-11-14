declare module 'acorn-jsx-walk' {
  import type {RecursiveVisitors} from 'acorn-walk';
  export function extend(base: RecursiveVisitors<any>): void;
}
