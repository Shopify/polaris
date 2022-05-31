import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./HomePage.module.scss";

interface Props {}

function HomePage({}: Props) {
  return (
    <div className={styles.HomePage}>
      <MaxPageWidthDiv>
        <h1>A Design System built for Commerce</h1>
        <p>
          Polaris lets you build experiences for million of merchants. Be a part
          of changing commerce. For everyone, everywhere.
        </p>

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
