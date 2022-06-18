import { useState } from "react";
import styles from "./SiteLaunchBanner.module.scss";

interface Props {}

const isServer = typeof window === "undefined";
const localStorageKey = "siteLaunchBannerVisible";

function SiteLaunchBanner({}: Props) {
  let visibleDefault = true;

  if (!isServer) {
    const visibleValueInLocalStorage =
      window.localStorage.getItem(localStorageKey);
    if (visibleValueInLocalStorage === "false") {
      visibleDefault = false;
    }
  }

  const [visible, setVisible] = useState(visibleDefault);

  if (!visible) {
    return null;
  }

  function dismiss() {
    setVisible(false);
    if (!isServer) {
      window.localStorage.setItem(localStorageKey, "false");
    }
  }

  return (
    <div className={styles.SiteLaunchBanner}>
      <button
        className={styles.CloseButton}
        aria-label="Dismiss message"
        onClick={dismiss}
      >
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="var(--text-strong)"
            d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z"
          />
        </svg>
      </button>
      <span className={styles.Emoji}>👋</span>
      <p>{`We've made some improvements to our website to help you build more efficiently with Polaris.`}</p>
      <ul>
        <li>
          <a href="https://legacy.polaris.shopify.com">
            Return to the old site
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SiteLaunchBanner;
