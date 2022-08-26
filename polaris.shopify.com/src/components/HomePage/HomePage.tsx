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
          <Link href="/foundations">
            <a className={styles.EntryPoint}>
              <h3>Foundations</h3>
              <p>
                Fundamental design guidance for creating quality admin
                experiences
              </p>
            </a>
          </Link>

          <Link href="/components">
            <a className={styles.EntryPoint}>
              <h3>Components</h3>
              <p>
                Reusable elements and styles, packaged through code, for
                building admin interfaces
              </p>
            </a>
          </Link>

          <Link href="/tokens/colors">
            <a className={styles.EntryPoint}>
              <h3>Tokens</h3>
              <p>
                Coded names that represent design decisions for color, spacing,
                typography, and more
              </p>
            </a>
          </Link>

          <Link href="/icons">
            <a className={styles.EntryPoint}>
              <h3>Icons</h3>
              <p>
                Over 400 carefully designed icons focused on commerce and
                entrepreneurship
              </p>
            </a>
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
              <Link href="https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode">
                Install
              </Link>
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
          <div
            className={className(
              styles.Promo,
              styles.PolarisForVSCode,
              'dark-mode',
            )}
          >
            <div className={styles.Text}>
              <h3>Polaris Sandbox</h3>
              <p>
                Create compositions with Polaris components using our sandbox
                environment in Playroom.
              </p>
              <Link href="/sandbox?code=N4Igxg9gJgpiBcIA8BhAhgJygHQHYAJ8BnGSXKTATwDEIIAXGDAQTHoEsJciBeYAbWBlGuevHwByACLsiAW1lEJAXwC6yvIQAOGdnKq0GTVhy58hXEWMkBRAB5aIGevgBKMR85UbcAPk34qJhQAHQAEjBosBj4aGyc3HyC%2BMIwouISACoMaAA2%2BADKeTBK%2BGrK%2BBz0uTA82CBFNUT1-gSEgQAKEI4AbkwB7bHxfXwAZnkkPoOEcRw9aPROfAPTSABCAK70iwRQsmC5EEQbGDD4Wrlo7H4r0-gAauwwAO6Fxc1td0gA9JvbXK07lNplwUIcSHwABQASnwPF8%2BGAymBhEBqxMCQAMrIXOxGHJeAILKI0tYJABxDBHIhvJoqAA0iNS6UkADkYC5GiUVOp8N80YQfl1ekw0T90FhwpFomKJaECqRTDdPoFMjA7PQUJYrrhRbd8ABNCAbFJoAgbEjEd74U6eeg0xbEGBna6jJz6JWxABGxpclGNMTAFsWciYREAmAT6pzRGletAkKD4LgpXSMXRoYgbMAAC1iNKI1ogfRiHFDjK9lBS2bNutyjKc%2BAr%2BqI9DQo1GIRWPzVGq1oh1era4uCIQV8QBASCkrHnqqNTqIGyrfyXJpa1OaAA1lAIM9cC0u%2B4iAGwDBsS39adjydT6y0KHzERrgBzDaXDAZAs1CSMi4nPKfu83j6niMAEkk%2BqEMAkHtF%2BJQZAA8lgYY-jBMxyMaLISAAqgUUgACQAAwhIRhGoSqdwnLkGS2k49rfNGKH0jByjMRR7TQexgxwUQGTuPQJzcORdyDPemFkgAtLhBEAEwAKzEaRwkiYQVE0R4dFEN8pwCRgQlsSprH6uol5pNEACS%2BJQqBciwvCiIwWQLaIjxjJiRsoiMlRFQ8PgNkANwwTpgn4JCaGBEeJ5njiISWWB4WqRguR8N5CVDKeRBPl67C5HilCYmgXowMlwAAAaPC8tIlPgboxPhwA8copUoip%2BACq1SAFK2YCbu1rWBF1cSbrF%2BI1TluS%2BA17zKD8g09SNYF9R1c3DXFciTe5ogzd8K0LetaWzd1vXhT8kU3tFLZ7UthDQoF7HIvq-KTt8cqjoqCSyiOM4JJUeLzvUUiRMMCwwImtHOM0ICZl6UAbKD7VIOe9BLYjMVrb4HRoP6WxED8SNXfqqOXejS55FVa6Vig1a4LWeNo-iCPfEjYovV970TkOr3fcmc61PUrJGAeKpID2mratcg53Jk2ZnDxNoaRDsSnLE8w5YVNRJrguSVuwoz4NjMQtk4Lo0jzMuFNm3S65Q%2BoXGaSYxNm7DPjLGCdsL3yi32rYSxgLNc%2BzyrDlgvggPSID0DLoZEAg-AgIcYDFPAaQgKo4fPOwUCRzH8D8OoQA">
                Try it out
              </Link>
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
                    <source src="/images/sandbox-usage.mp4" type="video/mp4" />
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
