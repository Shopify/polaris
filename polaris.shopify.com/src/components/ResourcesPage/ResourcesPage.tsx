import styles from "./ResourcesPage.module.scss";
import { FigmaIcon, GitHubIcon, InstallIcon, VSCodeIcon } from "./icons";
import Image from "../Image";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Link from "next/link";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <div className={styles.ResourcesPage}>
      <MaxPageWidthDiv>
        <h1>Resources</h1>
        <p>
          Polaris gives you everything you need to build the next big thing.
        </p>
      </MaxPageWidthDiv>
      <MaxPageWidthDiv className={styles.MainPackages}>
        <div className={styles.Package}>
          <Image
            src="/images/package-components.png"
            alt=""
            width={800}
            height={400}
          />
          <h2>Components</h2>
          <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
          <p className={styles.Description}>
            The core library that give you access to components, styles and
            everything else you need to build a great app with Polaris.
          </p>
          <Links
            links={[
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
              {
                icon: "link",
                label: "Browse docs",
                url: "/components",
              },
            ]}
          />
        </div>

        <div className={styles.Package}>
          <Image
            src="/images/package-icons.png"
            alt=""
            width={800}
            height={400}
          />
          <h2>Icons</h2>
          <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
          <p className={styles.Description}>
            The Polaris icon library contains 400+ carefully designed icons
            focused on commerce and entrepreneurship.
          </p>
          <Links
            links={[
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
              {
                icon: "link",
                label: "Browse docs",
                url: "/icons",
              },
            ]}
          />
        </div>

        <div className={styles.Package}>
          <Image
            src="/images/package-tokens.png"
            alt=""
            width={800}
            height={400}
          />
          <h2>Tokens</h2>
          <p className={styles.Version}>Version 1.25 &bull; 235 icons</p>
          <p className={styles.Description}>
            Tokens are the building blocks for extending Polaris. Combine
            colors, spacing, typography and more into entierly new experiences.
          </p>
          <Links
            links={[
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
              {
                icon: "link",
                label: "Browse docs",
                url: "/tokens",
              },
            ]}
          />
        </div>

        <div className={styles.Package}>
          <Image
            src="/images/package-tokens.png"
            alt=""
            width={800}
            height={400}
          />
          <h2>Polaris for VSCode</h2>
          <p className={styles.Version}>Version 1.0.2</p>
          <p className={styles.Description}>
            Our official VS Code extension makes using tokens a breeze.
            Intelligent autocomplete helps you find the right token quickly.
          </p>
          <Links
            links={[
              {
                icon: "install",
                label: "Install the extension",
                url: "https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode",
              },
            ]}
          />
        </div>

        <div className={styles.Package}>
          <Image
            src="/images/package-tokens.png"
            alt=""
            width={800}
            height={400}
          />
          <h2>Polaris for Figma</h2>
          <p className={styles.Version}>Internal beta</p>
          <p className={styles.Description}>
            Polaris for Figma gives designers access to powerful tools that
            helps them build new experiences using Polaris.
          </p>
          <Links
            links={[
              {
                icon: "install",
                label: "Install the extension",
                url: "#",
              },
            ]}
          />
        </div>
      </MaxPageWidthDiv>

      {/*
      <MaxPageWidthDiv className={styles.PolarisForVSCode}>
        <div className={styles.Text}>
          <h2>
            <div className={styles.VSCodeIcon}>
              <VSCodeIcon />
            </div>{" "}
            Polaris for VS Code
          </h2>
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
      </MaxPageWidthDiv> */}
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
