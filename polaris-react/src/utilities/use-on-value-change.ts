import React, {useEffect} from 'react';

export function useOnValueChange<T>(
  value: T,
  onChange: (value: T, oldValue: T) => void,
) {
  const tracked = React.useRef(value);
  useEffect(() => {
    const oldValue = tracked.current;
    if (value !== tracked.current) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [value, onChange]);
}
