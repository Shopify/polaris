import { className } from "../../utils/various";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./HomePage.module.scss";

interface Props {}

function HomePage({}: Props) {
  return (
    <div className={styles.HomePage}>
      <div className={styles.Intro}>
        <MaxPageWidthDiv>
          <h1>A design system built for commerce</h1>
          <p>
            Polaris lets you build experiences for millions of merchants. Be a
            part of changing commerce. For everyone, everywhere.
          </p>
        </MaxPageWidthDiv>
      </div>

      <div className={styles.HeroGraphic}>
        <div className={className(styles.Set, styles.Components)}>
          {[...Array(5)].map((_, n) => {
            return (
              <div
                key={n}
                className={className(styles.Component, styles.HomeCard)}
              >
                <PolarisCard>
                  <PolarisCard.Section>Reach more shoppers</PolarisCard.Section>
                  <PolarisCard.Section>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </PolarisCard.Section>
                  <PolarisCard.Section>
                    <PolarisButton>Primary action</PolarisButton>
                  </PolarisCard.Section>
                </PolarisCard>
              </div>
            );
          })}
        </div>

        <div className={className(styles.Set, styles.Tokens)}>
          {[...Array(100)].map((_, n) => {
            const rows = 4;
            const columns = 20;
            const row = Math.floor(n / columns);
            const hues = [-1, 215, 165, 145, 50];
            const column = n % columns;
            const backgroundColor = `hsl(${hues[row]}deg, ${
              hues[row] === -1 ? 0 : 70
            }%, ${column * 5}%)`;
            return (
              <div
                key={n}
                style={{ backgroundColor }}
                className={styles.Token}
              ></div>
            );
          })}
        </div>

        <div className={styles.Icons}>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
          <div className={styles.Component}></div>
        </div>
      </div>

      <MaxPageWidthDiv>
        <h2>Contributors</h2>
        {[...Array(32)].map((_, n) => (
          <div key={n}></div>
        ))}

        <h2>{`What's new`}</h2>
        <h3>New component: Thingie</h3>
        <p>
          Lorem ipsum dolor et amet consecteur lorem ipsum dolor et amet
          consecteur dolor et amet consecteur lorem ipsum dolor et amet
          consecteur.
        </p>

        <h3>New component: Thingie</h3>
        <p>
          Lorem ipsum dolor et amet consecteur lorem ipsum dolor et amet
          consecteur dolor et amet consecteur lorem ipsum dolor et amet
          consecteur.
        </p>

        <h3>New component: Thingie</h3>
        <p>
          Lorem ipsum dolor et amet consecteur lorem ipsum dolor et amet
          consecteur dolor et amet consecteur lorem ipsum dolor et amet
          consecteur.
        </p>
      </MaxPageWidthDiv>
    </div>
  );
}

function PolarisCard({ children }: { children: React.ReactNode }) {
  return <div className={styles.PolarisCard}>{children}</div>;
}

function PolarisCardSection({ children }: { children: React.ReactNode }) {
  return <div className={styles.PolarisCardSection}>{children}</div>;
}

function PolarisButton({ children }: { children: React.ReactNode }) {
  return <div className={styles.PolarisButton}>{children}</div>;
}

PolarisCard.Section = PolarisCardSection;

export default HomePage;
