import styles from "./ResourcesPage.module.scss";
import { BrowseIcon, FigmaIcon, GitHubIcon, InstallIcon } from "./icons";
import Container from "../Container";
import Link from "next/link";
import { className } from "../../utils/various";
import componentsImage from "./components.png";
import tokensImage from "./tokens.png";
import iconsImage from "./icons.png";
import Image from "../Image";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <div className={styles.ResourcesPage}>
      <Container>
        <div className={styles.Hero}>
          <div className={styles.Text}>
            <h1>
              A starter kit
              <br /> for reimagining
              <br /> commerce.
            </h1>
            <p>
              Our design system helps us work together to build a great
              experience for all of Shopify’s merchants.
            </p>
          </div>
        </div>
      </Container>

      <div className={className(styles.Line, styles.FirstLine)}></div>

      <Container className={className(styles.Step, styles.Foundations)}>
        <h2>Explore the foundations</h2>
        <p>
          Our design foundations offer fundamental design elements and guidance
          for creating good merchant experiences.
        </p>
        <Link href="/foundations">Start learning</Link>
      </Container>
      <div className={styles.Line}></div>

      <div className={className(styles.Step, styles.BuildingBlocks)}>
        <Container>
          <div className={styles.Blocks}>
            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Components</h3>
                <p className={styles.Description}>
                  Components are reusable building blocks made of interface
                  elements and styles, packaged through code. Piece them
                  together, improve them, and create new ones to better solve
                  merchant problems.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
                      label: "Browse components",
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
                      url: "https://www.figma.com/community/file/1111360433678236702",
                    },
                  ]}
                />
              </div>
              <div className={styles.Image}>
                <Image
                  src={componentsImage}
                  alt="Media card and date picker components"
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>

            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Tokens</h3>
                <p className={styles.Description}>
                  Tokens are repeatable design elements that can be combined
                  creatively. They unite our design decisions across merchant
                  experiences.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
                      label: "Browse tokens",
                      url: "/tokens/colors",
                    },
                    {
                      icon: "github",
                      label: "Repo",
                      url: "https://github.com/Shopify/polaris/tree/main/polaris-tokens",
                    },
                    {
                      icon: "figma",
                      label: "Library",
                      url: "https://www.figma.com/community/file/1111359207966840858",
                    },
                  ]}
                />
              </div>

              <div className={styles.Image}>
                <Image
                  src={tokensImage}
                  alt="A card containing a color preview, a token name and a description."
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>

            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Icons</h3>
                <p className={styles.Description}>
                  The Polaris icon library has 400+ carefully designed icons
                  focused on commerce and entrepreneurship. Use them as visual
                  aids to help merchants complete tasks.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
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
                      url: "https://www.figma.com/community/file/1110993965108325096",
                    },
                  ]}
                />
              </div>

              <div className={styles.Image}>
                <Image
                  src={iconsImage}
                  alt="A grid containing icons from Polaris"
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>
          </div>
        </Container>

        <div className={styles.Line}></div>

        <div className={className(styles.Step, styles.PowerUps)}>
          <Container>
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
                      url: "https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode",
                    },
                  ]}
                />
              </div>

              <div className={styles.Video}>
                <video
                  width="2250"
                  height="1440"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source src="/images/vscode.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

interface ResourceListItemProps {
  links: {
    icon: "browse" | "github" | "figma" | "install" | "other";
    label: string;
    url: string;
  }[];
}

export const Links = ({ links }: ResourceListItemProps) => {
  return (
    <ul className={styles.Links}>
      {links.map((link) => (
        <li key={link.url}>
          <Link href={link.url}>
            <a data-icon={link.icon}>
              {link.icon === "browse" && <BrowseIcon />}

              {link.icon === "github" && <GitHubIcon />}

              {link.icon === "figma" && <FigmaIcon />}

              {link.icon === "install" && <InstallIcon />}

              {link.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesPage;
