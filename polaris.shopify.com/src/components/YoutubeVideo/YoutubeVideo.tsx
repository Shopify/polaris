import styles from "./YoutubeVideo.module.scss";

interface Props {
  id: string;
}

function YoutubeVideo({ id }: Props) {
  return (
    <div className={styles.YoutubeVideo}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder={0}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YoutubeVideo;
