import React from 'react';

type Status = 'inactive' | 'copying' | 'copied' | 'failed';

interface UseCopyToClipboardOptions {
  defaultValue?: string;
  timeout?: number;
  onCopySuccess?(): void;
  onCopyError?(error: string): void;
  onTimeout?(): void;
}

/**
 * Copy text to the native clipboard using the `navigator.clipboard` API
 * Adapted from https://www.benmvp.com/blog/copy-to-clipboard-react-custom-hook
 */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const {
    defaultValue = '',
    timeout = 1500,
    onCopySuccess,
    onCopyError,
    onTimeout,
  } = options;

  const copied = React.useRef(false);
  const [status, setStatus] = React.useState<Status>('inactive');

  const copy = React.useCallback(
    (value?: string) => {
      setStatus('copying');
      return navigator.clipboard
        .writeText(typeof value === 'string' ? value : defaultValue)
        .then(
          () => {
            setStatus('copied');
            copied.current = true;
            onCopySuccess?.();
          },
          (errorMessage: string) => {
            setStatus('failed');
            onCopyError?.(errorMessage);
          },
        )
        .catch((error) => {
          throw error;
        });
    },
    [defaultValue, onCopySuccess, onCopyError],
  );

  React.useEffect(() => {
    if (status === 'inactive') return;

    const timeoutId = setTimeout(() => {
      setStatus('inactive');
      onTimeout?.();
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status, timeout, onTimeout]);

  return [copy, status, copied] as const;
}
