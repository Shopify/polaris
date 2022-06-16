import styles from "./SiteLaunchBanner.module.scss";

interface Props {}

function SiteLaunchBanner({}: Props) {
  return (
    <div className={styles.SiteLaunchBanner}>
      <span className={styles.Emoji}>👋</span>
      <p>{`Welcome to the beta version of the new Polaris website!`}</p>
      <ul>
        <li>
          <a href="#">Visit the old site</a>
        </li>
        <li>
          <a href="#">Provide feedback</a>
        </li>
      </ul>
    </div>
  );
}

export default SiteLaunchBanner;
