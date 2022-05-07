import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Nav from "../Nav";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./GuidelinesNav.module.scss";
import { navItems } from "./navItems";
import { className } from "../../utils/various";
import { NavItem } from "../Nav/Nav";
import Image from "../Image";

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

function getBreadcrumbs(navItems: NavItem[], path: string): string[] {
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

  return crumbs;
}

function GuidelinesNav({}: Props) {
  const router = useRouter();

  const isGuidelinesHome = router.asPath === guidelinesPath;
  const isAnyGuidelinesPage = router.asPath.startsWith(guidelinesPath);

  const [shouldRenderIntro, setShouldRenderIntro] = useState(isGuidelinesHome);
  const [isExpanded, setisExpanded] = useState(isGuidelinesHome);

  const breadcrumbs = getBreadcrumbs(navItems, router.asPath);

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
              {breadcrumbs.map((crumb) => (
                <span key={crumb}>{crumb}</span>
              ))}
            </button>
          </MaxPageWidthDiv>
        </div>
      )}

      <div className={styles.Nav}>
        <div className={styles.Inner}>
          {shouldRenderIntro ? (
            <div className={styles.Intro}>
              {/* <h1>
                <span>Guidelines</span>
                <span>
                  Building accessbile and <br />
                  inclusive experiences
                </span>
              </h1> */}
              <h1>Guidelines</h1>
              <p>
                Learn how to use Polaris to build accessible and inclusive
                experiences.
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

      <div className={styles.FeaturedArticle}>
        <MaxPageWidthDiv>
          <Image
            src="/images/editorial-content-example.svg"
            alt=""
            width={300 * 1}
            height={125 * 1}
          />
          <h2>
            <span>Featured article</span>
            <span>Learn the difference between voice and tone</span>
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </MaxPageWidthDiv>
      </div>
    </div>
  );
}

export default GuidelinesNav;
