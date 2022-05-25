import styles from "./ResourcesPage.module.scss";
import { FigmaIcon, GitHubIcon, InstallIcon, VSCodeIcon } from "./icons";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Link from "next/link";
import { className } from "../../utils/various";
import { LinkButton } from "../Button/Button";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <div className={styles.ResourcesPage}>
      <MaxPageWidthDiv>
        <h1>Getting started</h1>
      </MaxPageWidthDiv>

      <MaxPageWidthDiv className={className(styles.Step, styles.FirstStep)}>
        <h2>Learn the system</h2>
        <p
          className={styles.CenteredTextBlock}
        >{`Polaris is not just a set of components. Instead, it's a carefully crafted design system built to solve very specific problems. By learning how the system works, you'll be able to design the best possible solutions for all merchants.`}</p>
        <LinkButton primary href="/">
          Start learning
        </LinkButton>
      </MaxPageWidthDiv>

      <div>
        <MaxPageWidthDiv className={styles.Step}>
          <h2>Explore the building blocks</h2>

          <div className={styles.MainPackages}>
            <div className={styles.Package}>
              <h3>Components</h3>
              <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
              <p className={styles.Description}>
                The core library that give you access to components, styles and
                everything else you need to build a great app with Polaris.
                Lorem ipsum dolor et amet.
              </p>
              <Links
                links={[
                  {
                    icon: "link",
                    label: "Documentation",
                    url: "/components",
                  },
                  {
                    icon: "github",
                    label: "Repo",
                    url: "https://github.com/Shopify/polaris/tree/main/polaris-react",
                  },
                  {
                    icon: "figma",
                    label: "Library",
                    url: "https://www.figma.com/community/file/930504625460155381",
                  },
                ]}
              />
            </div>

            <div className={styles.Package}>
              <h3>Tokens</h3>
              <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
              <p className={styles.Description}>
                Tokens are the building blocks for extending Polaris. Combine
                colors, spacing, typography and more into entierly new
                experiences.
              </p>
              <Links
                links={[
                  {
                    icon: "link",
                    label: "Browse tokens",
                    url: "/tokens",
                  },
                  {
                    icon: "github",
                    label: "Repo",
                    url: "https://github.com/Shopify/polaris/tree/main/polaris-tokens",
                  },
                  {
                    icon: "figma",
                    label: "Library",
                    url: "https://www.figma.com/community/file/930504178610771955",
                  },
                ]}
              />
            </div>

            <div className={styles.Package}>
              <h3>Icons</h3>
              <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
              <p className={styles.Description}>
                The Polaris icon library contains 400+ carefully designed icons
                focused on commerce and entrepreneurship. Lorem ipsum dolor et
                amet.
              </p>
              <Links
                links={[
                  {
                    icon: "link",
                    label: "Browse icons",
                    url: "/icons",
                  },
                  {
                    icon: "github",
                    label: "Repo",
                    url: "https://github.com/Shopify/polaris/tree/main/polaris-icons",
                  },
                  {
                    icon: "figma",
                    label: "Library",
                    url: "https://www.figma.com/community/file/930503928500000754",
                  },
                ]}
              />
            </div>
          </div>
        </MaxPageWidthDiv>

        <MaxPageWidthDiv className={styles.Step}>
          <h2>Get the power ups</h2>
          <div className={styles.PolarisForVSCode}>
            <div className={styles.Text}>
              <h3>Polaris for VS Code</h3>
              <p className={styles.Description}>
                Automatic autocompletion for Polaris tokens, right inside your
                favorite code editor.
              </p>
              <Links
                links={[
                  {
                    icon: "install",
                    label: "Get the extension",
                    url: "#",
                  },
                ]}
              />
            </div>

            <div className={styles.Video}>
              <video width="2250" height="1440" loop autoPlay muted>
                <source src="/images/vscode.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </MaxPageWidthDiv>
      </div>
    </div>
  );
}

interface ResourceListItemProps {
  links: {
    icon: "github" | "figma" | "install" | "link" | "other";
    label: string;
    url: string;
  }[];
}

export const Links = ({ links }: ResourceListItemProps) => {
  return (
    <ul className={styles.Links}>
      {links.map((link) => (
        <li key={link.url}>
          <Link href={link.url} data-icon={link.icon}>
            <a>
              {link.icon === "github" && (
                <span className={styles.Icon}>
                  <GitHubIcon />
                </span>
              )}

              {link.icon === "figma" && (
                <span className={styles.Icon}>
                  <FigmaIcon />{" "}
                </span>
              )}

              {link.icon === "install" && (
                <span className={styles.Icon}>
                  <InstallIcon />
                </span>
              )}

              {link.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesPage;
