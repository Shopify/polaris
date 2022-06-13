import NextJSImage from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import { className } from "../../utils/various";
import styles from "./Image.module.scss";

interface Props extends ImageProps {
  fadeIn?: boolean;
}

function Image({ fadeIn = true, ...rest }: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <NextJSImage
      className={className(
        styles.Image,
        hasLoaded && styles.hasLoaded,
        fadeIn && styles.fadeIn
      )}
      alt=""
      onLoad={() => setHasLoaded(true)}
      {...rest}
    />
  );
}

export default Image;
