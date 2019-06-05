import debounce, {Options} from './debounce';

export default function throttle<F extends Function>(
  func: F,
  delay: number,
  options: Options = {},
) {
  const {leading = true, trailing = true} = options;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  return debounce(func, delay, {
    leading,
    trailing,
    maxWait: delay,
  });
}
