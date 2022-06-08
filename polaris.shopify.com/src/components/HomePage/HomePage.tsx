import Link from "next/link";
import { className } from "../../utils/various";
import { LinkButton } from "../Button/Button";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./HomePage.module.scss";

interface Props {}

function HomePage({}: Props) {
  return (
    <div className={styles.HomePage}>
      <div className={styles.Intro}>
        <MaxPageWidthDiv className={styles.IntroContent}>
          <h1>A design system built for commerce</h1>
          <Link href="/resources">Explore the system</Link>
        </MaxPageWidthDiv>
      </div>

      <div className={styles.Hero}></div>
    </div>
  );
}

export default HomePage;
