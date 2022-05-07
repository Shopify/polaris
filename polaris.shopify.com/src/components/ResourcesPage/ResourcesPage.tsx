import styles from "./ResourcesPage.module.scss";
import {
  FigmaIcon,
  GitHubIcon,
  InstallIcon,
  LinkIcon,
  VSCodeIcon,
} from "./icons";
import Image from "../Image";
import MaxPageWidthDiv from "../MaxPageWidthDiv";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <div className={styles.ResourcesPage}>
      <MaxPageWidthDiv>
        <h1>Resources</h1>
        <p>
          Polaris has everything you need to get started building the next big
          thing.
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
          <p className={styles.Description}>
            The core library that give you access to components, styles and
            everything you need to build a great app.
          </p>
          <Links
            links={[
              {
                icon: "github",
                label: "Repo",
                url: "#",
              },
              {
                icon: "figma",
                label: "Library",
                url: "#",
              },
              {
                icon: "link",
                label: "Browse",
                url: "#",
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
          <p className={styles.Description}>
            The Polaris icon library contains 400+ carefully designed icons
            focused on commerce and entrepreneurship.
          </p>
          <Links
            links={[
              {
                icon: "github",
                label: "Repo",
                url: "#",
              },
              {
                icon: "figma",
                label: "Library",
                url: "#",
              },
              {
                icon: "link",
                label: "Browse",
                url: "#",
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
          <p className={styles.Description}>
            Tokens are the building blocks for extending Polaris. Combine
            colors, spacing, typography and more.
          </p>
          <Links
            links={[
              {
                icon: "github",
                label: "Repo",
                url: "#",
              },
              {
                icon: "figma",
                label: "Library",
                url: "#",
              },
              {
                icon: "link",
                label: "Browse",
                url: "#",
              },
            ]}
          />
        </div>
      </MaxPageWidthDiv>

      <MaxPageWidthDiv className={styles.Plugins}>
        <div className={styles.Plugin}>
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
        </div>

        <div className={styles.Plugin}>
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
        </div>
      </MaxPageWidthDiv>
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
          <a href={link.url} data-icon={link.icon}>
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

            {link.icon === "link" && (
              <span className={styles.Icon}>
                <LinkIcon />
              </span>
            )}

            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesPage;
