import styles from "./ReadmeContent.module.scss";

interface Props {
  title?: string;
  githubUrl?: string;
  children: React.ReactNode;
}

function ReadmeContent({ title, githubUrl, children }: Props) {
  return (
    <div className={styles.ReadmeContent}>
      {(title || githubUrl) && (
        <div className={styles.TopBar}>
          {title} {githubUrl && <a href={githubUrl}>{githubUrl}</a>}
        </div>
      )}
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default ReadmeContent;
