import Link from "next/link";
import { useRouter } from "next/router";
import Grid from "../Grid";
import styles from "./SectionHead.module.scss";

interface Props {
  title: string;
  navItems: {
    url: string;
    label: string;
  }[];
}

function SectionHead({ title, navItems }: Props) {
  const router = useRouter();

  return (
    <Grid>
      <Grid.Column start={1} end={25}>
        <div className={styles.Wrapper}>
          <h3 className={styles.Title}>{title}</h3>
          <ul className={styles.Nav}>
            {navItems.map(({ url, label }) => {
              const ariaCurrentAttribute =
                router.asPath === url ? "page" : false;
              return (
                <li key={url} aria-current={ariaCurrentAttribute}>
                  <Link href={url} passHref>
                    <a>{label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Grid.Column>
    </Grid>
  );
}

const Icon = () => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 14V6h-2V4h2.5c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H16v-2h2z"
      fill="#fff"
    />
    <path
      d="M17.7 18.3c-.2-.2-.4-.3-.7-.3h-2c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7V3c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h2c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.4-.3-.7-.3h-2c-.7 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8H9c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7 0 .3.1.5.3.7.2.2.4.3.7.3h2c.3 0 .5.1.7.3.2.2.3.4.3.7v14c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3H9c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7 0 .3.1.5.3.7.2.2.4.3.7.3h2c.7 0 1.5-.3 2-.8.5.5 1.2.8 2 .8h2c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7zM2 14V6h8V4H1.5C.7 4 0 4.7 0 5.5v9c0 .8.7 1.5 1.5 1.5H10v-2H2zm4-4a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
      fill="#fff"
    />
  </svg>
);

export default SectionHead;
