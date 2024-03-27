import {useCallback, useEffect, useState} from 'react';

type Status = 'inactive' | 'copied' | 'failed';

interface UseCopyToClipboardOptions {
  defaultValue?: string;
  timeout?: number;
}

/**
 * Copy text to the native clipboard using the `navigator.clipboard` API
 * Adapted from https://www.benmvp.com/blog/copy-to-clipboard-react-custom-hook
 */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const {defaultValue = '', timeout = 1500} = options;

  const [status, setStatus] = useState<Status>('inactive');

  const copy = useCallback(
    (value?: string) => {
      navigator.clipboard
        .writeText(typeof value === 'string' ? value : defaultValue)
        .then(
          () => setStatus('copied'),
          () => setStatus('failed'),
        )
        .catch((error) => {
          throw error;
        });
    },
    [defaultValue],
  );

  useEffect(() => {
    if (status === 'inactive') return;

    const timeoutId = setTimeout(() => setStatus('inactive'), timeout);

    return () => clearTimeout(timeoutId);
  }, [status, timeout]);

  return [copy, status] as const;
}
