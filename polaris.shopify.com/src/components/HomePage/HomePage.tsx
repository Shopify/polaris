import Link from "next/link";
import Container from "../Container";
import styles from "./HomePage.module.scss";

interface Props {}

function HomePage({}: Props) {
  return (
    <div className={styles.HomePage}>
      <div className={styles.Intro}>
        <Container className={styles.IntroContent}>
          <h1>A design system built for commerce</h1>
          <Link href="/resources">Explore the system</Link>
        </Container>
      </div>

      <div className={styles.Hero}></div>
    </div>
  );
}

export default HomePage;
