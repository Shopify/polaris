import {pluckDeep} from './pluck-deep';

export function getWidth(
  value: {[key: string]: any} | number | null | undefined = {},
  defaultWidth: number | null = 0,
  key = 'width',
) {
  const width = typeof value === 'number' ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}
