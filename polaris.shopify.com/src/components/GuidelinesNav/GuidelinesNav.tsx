import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Nav from "../Nav";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./GuidelinesNav.module.scss";
import { navItems } from "./navItems";
import { className } from "../../utils/various";
import { NavItem } from "../Nav/Nav";

interface Props {}

const guidelinesPath = "/guidelines";

function find(fragment: string, tree: NavItem[]): NavItem[] {
  return [...tree].reduce(function (result: NavItem[] = [], item) {
    if (item.url?.endsWith(fragment)) {
      result.push(item);
    } else {
      if (item.children) {
        const childMatches = find(fragment, item.children);

        if (childMatches.length > 0) {
          result.push({ ...item, children: childMatches });
        }
      }
    }
    return result;
  }, []);
}

function getBreadcrumbs(navItems: NavItem[], path: string): string {
  const fragments = path.split("/");
  const fragment = fragments[fragments.length - 1];
  const filteredNavItems = find(fragment, [...navItems]);

  let currentItem: NavItem | undefined = filteredNavItems[0];
  let crumbs: string[] = [];

  while (currentItem) {
    crumbs.push(currentItem.title);
    if (currentItem.children) {
      currentItem = currentItem.children[0];
    } else {
      currentItem = undefined;
    }
  }

  return crumbs.join(" -> ");
}

function GuidelinesNav({}: Props) {
  const router = useRouter();

  const isGuidelinesHome = router.asPath === guidelinesPath;
  const isAnyGuidelinesPage = router.asPath.startsWith(guidelinesPath);

  const [shouldRenderIntro, setShouldRenderIntro] = useState(isGuidelinesHome);
  const [isExpanded, setisExpanded] = useState(isGuidelinesHome);

  const menuButtonText = getBreadcrumbs(navItems, router.asPath);

  useEffect(() => {
    if (isGuidelinesHome) {
      setisExpanded(true);
    } else if (isAnyGuidelinesPage) {
      setisExpanded(false);
    } else {
      setisExpanded(false);
    }
  }, [isGuidelinesHome, isAnyGuidelinesPage, router.asPath]);

  useEffect(() => {
    if (isAnyGuidelinesPage) {
      if (isGuidelinesHome) {
        setShouldRenderIntro(true);
      } else {
        const timer = setTimeout(() => {
          setShouldRenderIntro(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAnyGuidelinesPage, isGuidelinesHome, router.asPath]);

  if (!isAnyGuidelinesPage) {
    return null;
  }

  return (
    <div
      className={className(
        styles.GuidelinesNav,
        isGuidelinesHome && styles.isGuidelinesHome,
        isExpanded && styles.isExpanded
      )}
    >
      {!isGuidelinesHome && (
        <div className={styles.NavWrapper}>
          <MaxPageWidthDiv>
            <button
              className={styles.MenuButton}
              onClick={() => setisExpanded(!isExpanded)}
            >
              {menuButtonText}
            </button>
          </MaxPageWidthDiv>
        </div>
      )}

      <div className={styles.Nav}>
        <div className={styles.Inner}>
          {shouldRenderIntro ? (
            <div className={styles.Intro}>
              <h1>Build with Polaris</h1>
              <p>
                Learn how to build inclusive and accessible experiences with
                Polaris
              </p>
            </div>
          ) : (
            <div className={styles.Head}>
              <h3>Guidelines</h3>
            </div>
          )}
          <Nav navItems={navItems} />
        </div>
      </div>
    </div>
  );
}

export default GuidelinesNav;
