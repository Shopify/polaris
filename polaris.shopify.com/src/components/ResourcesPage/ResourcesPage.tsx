import Page from "../Page";
import styles from "./ResourcesPage.module.scss";
import {
  ArrowIcon,
  FigmaIcon,
  GitHubIcon,
  InstallIcon,
  LinkIcon,
  ReactIcon,
  VSCodeIcon,
} from "./icons";
import CodeExample from "../CodeExample";
import { Disclosure } from "@headlessui/react";
import Nav from "../Nav";
import Image from "../Image";
import MaxPageWidthDiv from "../MaxPageWidthDiv";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <Page noLayout renderAbove={() => <h1>Resources</h1>} showTOC={false}>
      <MaxPageWidthDiv className={styles.MainPackages}>
        <div className={styles.Package}>
          <div
            style={{
              height: 240,
              background: "#ededed",
              marginBottom: "1.5rem",
              borderRadius: "var(--border-radius-300)",
            }}
          ></div>
          <h2>Components</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything you need
            to start building with Polaris. The main Polaris library that give
            you access to everything you need to start building with Polaris.
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
          <div
            style={{
              height: 240,
              background: "#ededed",
              marginBottom: "1.5rem",
              borderRadius: "var(--border-radius-300)",
            }}
          ></div>
          <h2>Icons</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything you need
            to start building with Polaris. The main Polaris library that give
            you access to everything you need to start building with Polaris.
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
          <div
            style={{
              height: 240,
              background: "#ededed",
              marginBottom: "1.5rem",
              borderRadius: "var(--border-radius-300)",
            }}
          ></div>
          <h2>Tokens</h2>
          <p className={styles.Description}>
            The main Polaris library that give you access to everything you need
            to start building with Polaris. The main Polaris library that give
            you access to everything you need to start building with Polaris.
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
    </Page>
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
