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
            Polaris lets you build experiences for million of merchants. Be a
            part of changing commerce. For everyone, everywhere.
          </p>
        </MaxPageWidthDiv>
      </div>

      <div className={styles.HeroGraphic}>
        <div className={styles.Components}>
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

export default HomePage;
