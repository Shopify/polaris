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

          <svg
            width={718 * 1.5}
            height={440 * 1.5}
            viewBox="0 0 718 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.Hero}
          >
            <g clipPath="url(#clip0_34_1756)">
              <mask id="path-1-inside-1_34_1756" fill="white">
                <path d="M0 70H718V73H0V70Z" />
              </mask>
              <path
                d="M0 71H718V69H0V71Z"
                fill="rgba(0,0,0,.1)"
                mask="url(#path-1-inside-1_34_1756)"
              />
              <mask id="path-3-inside-2_34_1756" fill="white">
                <path d="M0 126H718V129H0V126Z" />
              </mask>
              <path
                d="M0 127H718V125H0V127Z"
                fill="rgba(0,0,0,.1)"
                mask="url(#path-3-inside-2_34_1756)"
              />
              <mask id="path-5-inside-3_34_1756" fill="white">
                <path d="M0 367H718V370H0V367Z" />
              </mask>
              <path
                d="M0 368H718V366H0V368Z"
                fill="rgba(0,0,0,.1)"
                mask="url(#path-5-inside-3_34_1756)"
              />
              <mask id="path-7-inside-4_34_1756" fill="white">
                <path d="M109 440L109 0L112 -7.67283e-08L112 440L109 440Z" />
              </mask>
              <path
                d="M110 440L110 -2.55758e-08L108 2.55758e-08L108 440L110 440Z"
                fill="rgba(0,0,0,.1)"
                mask="url(#path-7-inside-4_34_1756)"
              />
              <mask id="path-9-inside-5_34_1756" fill="white">
                <path d="M608 440L608 0L611 -7.67283e-08L611 440L608 440Z" />
              </mask>
              <path
                d="M609 440L609 -2.55758e-08L607 2.55758e-08L607 440L609 440Z"
                fill="rgba(0,0,0,.1)"
                mask="url(#path-9-inside-5_34_1756)"
              />
              <rect
                x="110.5"
                y="71.5"
                width="497"
                height="297"
                rx="18.5"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength="1"
              />
              <rect
                x="564.5"
                y="85.5"
                width="28"
                height="28"
                rx="14"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength="1"
              />
              <rect
                x="253.5"
                y="85.5"
                width="109"
                height="28"
                rx="14"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength="1"
              />
              <path
                d="M260 127.5H479C482.59 127.5 485.5 130.41 485.5 134V368.5H253.5V134C253.5 130.41 256.41 127.5 260 127.5Z"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength="1"
              />
              <rect
                x="495.5"
                y="127.5"
                width="97"
                height="169"
                rx="6.5"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength="1"
              />
              <line
                x1="235.5"
                y1="70"
                x2="235.5"
                y2="367"
                stroke="black"
                strokeWidth="3"
                pathLength="1"
              />
            </g>
            <defs>
              <clipPath id="clip0_34_1756">
                <rect width="718" height="440" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
