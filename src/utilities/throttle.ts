import debounce, {Options} from './debounce';

export default function throttle<F extends Function>(
  func: F,
  delay: number,
  options: Options = {},
) {
  const {leading = true, trailing = true} = options;

  return debounce(func, delay, {
    leading,
    trailing,
    maxWait: delay,
  });
}
