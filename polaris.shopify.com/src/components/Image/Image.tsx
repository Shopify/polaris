import NextJSImage from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import styles from "./Image.module.scss";

interface Props extends ImageProps {}

function Image({ ...rest }: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <NextJSImage
      className={[styles.Image, hasLoaded ? styles.hasLoaded : null].join(" ")}
      alt=""
      onLoad={() => setHasLoaded(true)}
      {...rest}
    />
  );
}

export default Image;
