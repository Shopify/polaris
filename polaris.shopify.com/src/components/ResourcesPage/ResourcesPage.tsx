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
    <>
      <MaxPageWidthDiv>
        <h1>Resources</h1>
      </MaxPageWidthDiv>
      <MaxPageWidthDiv className={styles.MainPackages}>
        <div className={styles.Package}>
          <h2>Components</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything.
          </p>
          <Image
            src="/images/package-components.png"
            alt=""
            width={800}
            height={400}
          />
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
          <h2>Icons</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything.
          </p>
          <Image
            src="/images/package-icons.png"
            alt=""
            width={800}
            height={400}
          />
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
          <h2>Tokens</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything.
          </p>
          <Image
            src="/images/package-tokens.png"
            alt=""
            width={800}
            height={400}
          />
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

      <MaxPageWidthDiv padding={false}>
        <div className={styles.PolarisForVSCode}>
          <div className={styles.Text}>
            <h2>
              <div className={styles.Icon}>
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
    </>
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
            {link.icon === "github" && <GitHubIcon />}
            {link.icon === "figma" && <FigmaIcon />}
            {link.icon === "install" && <InstallIcon />}
            {link.icon === "link" && <LinkIcon />}
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesPage;
