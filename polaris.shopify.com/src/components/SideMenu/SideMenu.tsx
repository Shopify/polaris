import Link from "next/link";
import Image from "next/image";

import { className } from "../../utils/various";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./SideMenu.module.scss";

interface Props {
  children?: React.ReactNode;
  showMenu?: boolean;
  handleShowMenu: (value: boolean) => void;
}

function SideMenu({ children, showMenu = false, handleShowMenu }: Props) {
  return (
    <>
      <div className={className(styles.SideMenu, showMenu && styles.show)}>
        <Link href="/">
          <a className={styles.Logo}>
            <Image
              src={shopifyLogo}
              layout="fixed"
              width={24}
              height={24}
              alt="Shopify logo"
            />
            Polaris
          </a>
        </Link>

        {children}

        <button
          className={styles.CloseButton}
          onClick={() => handleShowMenu(false)}
        >
          <CloseIcon />
        </button>
      </div>

      {showMenu && (
        <div
          className={styles.Backdrop}
          onClick={() => handleShowMenu(false)}
        />
      )}
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

export default SideMenu;
