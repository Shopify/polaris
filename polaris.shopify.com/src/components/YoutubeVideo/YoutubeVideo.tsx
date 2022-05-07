import styles from "./YoutubeVideo.module.scss";

interface Props {
  id: string;
}

function YoutubeVideo({ id }: Props) {
  return (
    <div className={styles.YoutubeVideo}>
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} />
      {/* <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder={0}
        allowFullScreen
      ></iframe> */}
    </div>
  );
}

export default YoutubeVideo;
