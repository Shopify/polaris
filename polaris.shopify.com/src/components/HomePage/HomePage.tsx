import Link from 'next/link';
import {className} from '../../utils/various';
import {useMedia} from '../../utils/hooks';
import Image from '../Image';
import PageMeta from '../PageMeta';
import styles from './HomePage.module.scss';
import Page from '../Page';

interface Props {}

function HomePage({}: Props) {
  const useMotion = useMedia('(prefers-reduced-motion: no-preference)');

  return (
    <Page showTOC={false}>
      <div className={styles.HomePage}>
        <PageMeta description="A starter kit for reimagining commerce." />

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

        <div className={styles.EntryPoints}>
          <Link href="/foundations" className={styles.EntryPoint}>
            <h3>Foundations</h3>
            <p>
              Fundamental design guidance for creating quality admin experiences
            </p>
          </Link>

          <Link href="/components" className={styles.EntryPoint}>
            <h3>Components</h3>
            <p>
              Reusable elements and styles, packaged through code, for building
              admin interfaces
            </p>
          </Link>

          <Link href="/tokens/colors" className={styles.EntryPoint}>
            <h3>Tokens</h3>
            <p>
              Coded names that represent design decisions for color, spacing,
              typography, and more
            </p>
          </Link>

          <Link href="/icons" className={styles.EntryPoint}>
            <h3>Icons</h3>
            <p>
              Over 400 carefully designed icons focused on commerce and
              entrepreneurship
            </p>
          </Link>
        </div>

        <div className={styles.Promos}>
          <div className={className(styles.Promo, styles.News, 'dark-mode')}>
            <div className={styles.Text}>
              <h3>
                <span>New</span> Version 10 typography
              </h3>
              <p>Learn about what changes are coming to Polaris typography.</p>
              <Link href="/whats-new/version-10-typography">Read post</Link>
            </div>
            <div className={styles.Image}>
              <Image
                width={1600}
                height={800}
                style={{width: '100%', height: 'auto'}}
                src="/images/home-news.png"
                alt="A list showcasing the new font sizes in Polaris"
              />
            </div>
          </div>
          <div
            className={className(
              styles.Promo,
              styles.PolarisForVSCode,
              'dark-mode',
            )}
          >
            <div className={styles.Text}>
              <h3>Polaris for VS Code</h3>
              <p>
                Autocompletion for Polaris tokens, right inside your favorite
                code editor
              </p>
              <Link href="/tools/polaris-for-vscode">Install</Link>
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
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
