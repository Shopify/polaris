import NextJSImage from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import { className } from "../../utils/various";
import styles from "./Image.module.scss";

interface Props extends ImageProps {}

function Image({ ...rest }: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <NextJSImage
      className={className(styles.Image, hasLoaded && styles.hasLoaded)}
      alt=""
      onLoad={() => setHasLoaded(true)}
      {...rest}
    />
  );
}

export default Image;
