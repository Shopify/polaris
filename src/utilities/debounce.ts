export interface Options {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export default function debounce<F extends Function>(
  func: F,
  delay: number,
  options: Options = {},
) {
  const {leading = false, trailing = true, maxWait = 0} = options;
  const throttleEnabled = maxWait > 0;
  let triggerCount = 0;
  let isThrottled = false;
  let throttleTimeout: NodeJS.Timeout | null = null;
  let debounceTimeout: NodeJS.Timeout | null = null;

  return function(...args: any[]) {
    if (throttleEnabled) {
      setThrottleTimeout();

      if (!isThrottled) {
        func.apply(this, args);
        resetThrottle();
      }
    }

    triggerCount++;
    tryLeadingEdgeCallback();
    clear(debounceTimeout);
    debounceTimeout = setTimeout(tryTrailingEdgeCallback, delay);

    function tryLeadingEdgeCallback() {
      if (leading && !debounceTimeout) {
        func.apply(this, args);
      }
    }

    function tryTrailingEdgeCallback() {
      if (trailing && (triggerCount > 1 || !leading)) {
        func.apply(this, args);
      }

      resetDebounce();
      resetThrottle();
    }

    function resetDebounce() {
      debounceTimeout = null;
      triggerCount = 0;
    }

    function setThrottleTimeout() {
      if (throttleTimeout) {
        return;
      }

      resetThrottle();
      throttleTimeout = setTimeout(() => {
        isThrottled = false;
      }, maxWait);
    }

    function resetThrottle() {
      isThrottled = true;
      throttleTimeout = null;
    }

    function clear(timeout: NodeJS.Timeout | null) {
      if (!timeout) return;
      clearTimeout(timeout);
    }
  };
}
