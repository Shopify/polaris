import { useState } from "react";

const COPY_TO_CLIPBOARD_TIMEOUT = 2000;

export const useCopyToClipboard = (stringToCopy: string) => {
  const [didJustCopy, setDidJustCopy] = useState(false);

  const copy = () => {
    if (!didJustCopy) {
      setDidJustCopy(true);
      if (navigator) {
        navigator.clipboard.writeText(stringToCopy);
      }
      const timer = setTimeout(() => {
        setDidJustCopy(false);
      }, COPY_TO_CLIPBOARD_TIMEOUT);
      return () => clearTimeout(timer);
    }
  };

  return [copy, didJustCopy] as const;
};
