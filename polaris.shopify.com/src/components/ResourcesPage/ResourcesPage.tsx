import styles from "./ResourcesPage.module.scss";
import { FigmaIcon, GitHubIcon, InstallIcon, VSCodeIcon } from "./icons";
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
        <h1>
          A starter kit
          <br /> for reimagining commerce.
        </h1>
        <p>{`Millions of merchants trust Shopify to run their business—but they need designers to build the tools that help them achieve independence. What will you build for them?`}</p>
      </Container>

      <div className={className(styles.Line, styles.FirstLine)}></div>

      <div className={styles.FadeIn}>
        <Container className={className(styles.Step, styles.FirstStep)}>
          <h2>Explore the foundations</h2>
          <p
            className={styles.CenteredTextBlock}
          >{`Polaris is not just a set of components. Instead, it's a carefully crafted design system built to solve very specific problems. By learning how the system works, you'll be able to design the best possible solutions for all merchants.`}</p>
          <Link href="/foundations">Start learning</Link>
        </Container>
        <div className={styles.Line}></div>

        <div className={className(styles.Step, styles.BuildingBlocks)}>
          <Container>
            <h2>Play with the building blocks</h2>

            <div className={styles.Blocks}>
              <div className={styles.Block}>
                <div className={styles.Text}>
                  <h3>Components</h3>
                  <p className={styles.Description}>
                    The core library that gives you access to components, styles
                    and everything else you need to build a great app with
                    Polaris.
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
                    Tokens are the building blocks for extending Polaris.
                    Combine colors, spacing, typography and more into entirely
                    new experiences.
                  </p>
                  <Links
                    links={[
                      {
                        icon: "link",
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
                    The Polaris icon library contains 400+ carefully designed
                    icons focused on commerce and entrepreneurship.
                  </p>
                </div>

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
                      url: "https://www.figma.com/community/file/1110993965108325096",
                    },
                  ]}
                />
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
                    Automatic autocompletion for Polaris tokens, right inside
                    your favorite code editor.
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
                  <video width="2250" height="1440" loop autoPlay muted>
                    <source src="/images/vscode.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </Container>
          </div>
        </div>
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
          <Link href={link.url}>
            <a data-icon={link.icon}>
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
