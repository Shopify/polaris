import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";

import SiteLaunchBanner from "../SiteLaunchBanner";
import Header from "../Header";

interface Props {
  children: React.ReactNode;
}

let forceDarkMode = false;

if (typeof window !== "undefined") {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let darkModeParam = params.get("darkmode");
  if (darkModeParam) {
    forceDarkMode = true;
  }
}

function Page({ children }: Props) {
  const router = useRouter();
  const darkMode = useDarkMode(false);

  const isPolaris = router.asPath.startsWith("/examples");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "color-scheme",
      darkMode.value ? "dark" : "light"
    );
  }, [darkMode.value]);

  useEffect(() => {
    if (forceDarkMode) {
      darkMode.enable();
    }
  }, [darkMode]);

  return (
    <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
      {!isPolaris && <Header currentPath={router.asPath} darkMode={darkMode} />}

      {children}

      {!isPolaris && <SiteLaunchBanner />}
    </div>
  );
}

export default Page;
