import {BrowseIcon, FigmaIcon, GitHubIcon, InstallIcon} from './icons';
import Container from '../Container';
import Link from 'next/link';
import {className} from '../../utils/various';
import {useMedia} from '../../utils/hooks';
import Image from '../Image';
import PageMeta from '../PageMeta';
import styles from './HomePage.module.scss';

interface Props {}

function HomePage({}: Props) {
  const useMotion = useMedia('(prefers-reduced-motion: no-preference)');

  return (
    <div className={styles.HomePage}>
      <PageMeta description="A starter kit for reimagining commerce." />

      <Container>
        <div className={styles.Hero}>
          <div className={styles.Text}>
            <h1>
              <span>Build.</span> <span>Contribute.</span> <span>Evolve.</span>
            </h1>
            <p>
              Shape the merchant experience for Shopify’s core product, the
              admin.
            </p>
          </div>
        </div>
      </Container>

      <div className={className(styles.Step, styles.BuildingBlocks)}>
        <Container>
          <div className={styles.Block}>
            <div className={styles.Text}>
              <h3>Foundations</h3>
              <p>
                Our design foundations offer fundamental design elements and
                guidance for creating good merchant experiences.
              </p>
              <Links
                links={[
                  {
                    icon: 'browse',
                    label: 'Foundations',
                    url: '/foundations',
                  },
                  {
                    icon: 'browse',
                    label: 'Design',
                    url: '/design',
                  },
                  {
                    icon: 'browse',
                    label: 'Content',
                    url: '/content',
                  },
                  {
                    icon: 'browse',
                    label: 'Patterns',
                    url: '/patterns',
                  },
                ]}
              />
            </div>
            <div className={styles.Image}>
              <Image
                src="/images/foundations.png"
                alt="Media card and date picker components"
                width={555 * 1.5}
                height={430 * 1.5}
              />
            </div>
          </div>

          <div className={styles.Block}>
            <div className={styles.Text}>
              <h3>Components</h3>
              <p>
                Components are reusable building blocks made of interface
                elements and styles, packaged through code. Piece them together,
                improve them, and create new ones to solve merchant problems.
              </p>
              <Links
                links={[
                  {
                    icon: 'browse',
                    label: 'Browse components',
                    url: '/components',
                  },
                  {
                    icon: 'github',
                    label: 'Repo',
                    url: 'https://github.com/Shopify/polaris/tree/main/polaris-react',
                  },
                  {
                    icon: 'figma',
                    label: 'Library',
                    url: 'https://www.figma.com/community/file/1111360433678236702',
                  },
                ]}
              />
            </div>
            <div className={styles.Image}>
              <Image
                src="/images/components.png"
                alt="Media card and date picker components"
                width={555 * 1.5}
                height={430 * 1.5}
              />
            </div>
          </div>

          <div className={styles.Block}>
            <div className={styles.Text}>
              <h3>Tokens</h3>
              <p>
                Design tokens are coded names that represent design decisions
                for elements like color, spacing, and typography. Applying them
                to our designs unifies merchant experiences.
              </p>
              <Links
                links={[
                  {
                    icon: 'browse',
                    label: 'Browse tokens',
                    url: '/tokens/colors',
                  },
                  {
                    icon: 'github',
                    label: 'Repo',
                    url: 'https://github.com/Shopify/polaris/tree/main/polaris-tokens',
                  },
                  {
                    icon: 'figma',
                    label: 'Library',
                    url: 'https://www.figma.com/community/file/1111359207966840858',
                  },
                ]}
              />
            </div>

            <div className={styles.Image}>
              <Image
                src="/images/tokens.png"
                alt="A card containing a color preview, a token name and a description."
                width={555 * 1.5}
                height={430 * 1.5}
              />
            </div>
          </div>

          <div className={styles.Block}>
            <div className={styles.Text}>
              <h3>Icons</h3>
              <p>
                The Polaris icon library has 400+ carefully designed icons
                focused on commerce and entrepreneurship. Use them as visual
                aids to help merchants complete tasks.
              </p>
              <Links
                links={[
                  {
                    icon: 'browse',
                    label: 'Browse icons',
                    url: '/icons',
                  },
                  {
                    icon: 'github',
                    label: 'Repo',
                    url: 'https://github.com/Shopify/polaris/tree/main/polaris-icons',
                  },
                  {
                    icon: 'figma',
                    label: 'Library',
                    url: 'https://www.figma.com/community/file/1110993965108325096',
                  },
                ]}
              />
            </div>

            <div className={styles.Image}>
              <Image
                src="/images/icons.png"
                alt="A grid containing icons from Polaris"
                width={555 * 1.5}
                height={430 * 1.5}
              />
            </div>
          </div>

          <div className={className(styles.Block, styles.PolarisForVSCode)}>
            <div className={styles.Text}>
              <h3>Polaris for VS Code</h3>
              <p>
                Automatic autocompletion for Polaris tokens, right inside your
                favorite code editor.
              </p>
              <Links
                links={[
                  {
                    icon: 'install',
                    label: 'Get the extension',
                    url: 'https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode',
                  },
                ]}
              />
            </div>
            <div className={styles.Image}>
              {useMotion ? (
                <div className={styles.Video}>
                  <video
                    muted
                    loop
                    autoPlay
                    playsInline
                    width="2250"
                    height="1440"
                  >
                    <source src="/images/vscode.mp4" type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className={styles.Poster}>
                  <Image
                    width="2250"
                    height="1440"
                    src="/images/vscode.jpg"
                    alt="Screen shot of the Polaris VS Code extension actively autocompleting the value of a background CSS rule with the surface success design token."
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

interface ResourceListItemProps {
  links: {
    icon: 'browse' | 'github' | 'figma' | 'install' | 'other';
    label: string;
    url: string;
  }[];
}

export const Links = ({links}: ResourceListItemProps) => {
  return (
    <ul className={styles.Links}>
      {links.map((link) => (
        <li key={link.url}>
          <Link href={link.url}>
            <a data-icon={link.icon}>
              {link.icon === 'browse' && <BrowseIcon />}

              {link.icon === 'github' && <GitHubIcon />}

              {link.icon === 'figma' && <FigmaIcon />}

              {link.icon === 'install' && <InstallIcon />}

              {link.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
