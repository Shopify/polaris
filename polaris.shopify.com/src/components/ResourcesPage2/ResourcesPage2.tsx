import styles from "./ResourcesPage2.module.scss";
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

function ResourcesPage2({}: Props) {
  return (
    <div className={styles.ResourcesPage2}>
      <MaxPageWidthDiv>
        <h1>
          <span>Resources</span>
          <span>
            Everything you need to start <br />
            building your next app
          </span>
        </h1>
      </MaxPageWidthDiv>

      <MaxPageWidthDiv className={styles.MainPackages}>
        <div className={styles.Package}>
          <h2>Development</h2>

          <div className={styles.Resource}>
            <GitHubIcon />
            <h3>
              <a href="">Polaris monorepo</a>
            </h3>
            <p className={styles.Description}>
              The core library that give you access to components, styles and
              everything you need to build a great app. The core library that
              give you access to components, styles and everything you. The core
              library that give you access to components, styles and everything
              you need to build a great app. The core library that give you
              access to components, styles and everything you.
            </p>
          </div>

          <div className={styles.Resource}>
            <VSCodeIcon />
            <h3>
              <a href="">Polaris for VSCode</a>
            </h3>
            <p className={styles.Description}>
              The core library that give you access to components, styles and
              everything you need to build a great app. The core library that
              give you access to components, styles and everything you.
            </p>
          </div>
        </div>

        <div className={styles.Package}>
          <h2>Design</h2>

          <div className={styles.Resource}>
            <FigmaIcon />
            <h3>
              <a href="">Polaris kit</a>
            </h3>
            <p className={styles.Description}>
              The core library that give you access to components, styles and
              everything you need to build a great app.
            </p>
          </div>

          <div className={styles.Resource}>
            <FigmaIcon />
            <h3>
              <a href="">Polaris for Figma</a>
            </h3>
            <p className={styles.Description}>
              The core library that give you access to components, styles and
              everything you need to build a great app.
            </p>
          </div>
        </div>
      </MaxPageWidthDiv>

      {/* <MaxPageWidthDiv>
        <div className={styles.PolarisForVSCode}>
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
          </div>

          <div className={styles.Video}>
            <video width="2250" height="1440" loop autoPlay muted>
              <source src="/images/vscode.mp4" type="video/mp4" />
            </video>
          </div>
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

export default ResourcesPage2;
