import { useCallback, useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash.slice(1)
  );

  const hashChangeHandler = useCallback(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash.slice(1));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) window.location.hash = newHash.slice(1);
    },
    [hash]
  );

  return [hash, updateHash];
};
