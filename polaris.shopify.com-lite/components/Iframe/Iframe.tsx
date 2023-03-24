'use client';

import {useDebounce} from '@/hooks';
import {tokens, Tokens} from '@shopify/polaris-tokens';
import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './Iframe.module.scss';

/*
About this component:

It renders an iframe. If a minWidth has been requested, it will render the
iframe with that exact width and then "transform: scale(...)" it so that it fits
the container. That way, the contents of the iframe believes it is being
rendered in at a bigger width (like desktop). This allows us to render Polaris
examples at a specific breakpoint, regardless of the users screen size.
*/

interface Props extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  minBreakpoint?: keyof Tokens['breakpoints'];
  aspectRatio?: string;
}

function convertRemStringToPixels(remString: string) {
  const rem = parseFloat(remString.replace('rem', ''));
  return typeof window !== 'undefined'
    ? rem *
        parseFloat(window.getComputedStyle(document.documentElement).fontSize)
    : 16 * rem;
}

function Iframe({
  src,
  title,
  minBreakpoint,
  aspectRatio = '16/9',
  ...iframeProps
}: Props) {
  const minIframeWidth = minBreakpoint
    ? convertRemStringToPixels(tokens['breakpoints'][minBreakpoint])
    : null;
  const [containerWidth, setContainerWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  if (aspectRatio && !aspectRatio.match(/^[0-9]+\s?\/\s?[0-9]+$/)) {
    throw new Error('Ratio must be in the format of "int/int", e.g "16/9"');
  }

  useEffect(() => {
    setContainerWidth(containerRef?.current?.getBoundingClientRect().width);
    const listener = () => {
      if (
        containerRef.current &&
        containerRef.current?.clientWidth !== containerWidth
      ) {
        setContainerWidth(containerRef?.current?.getBoundingClientRect().width);
      }
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  const onClientAndShouldScale =
    minIframeWidth && containerWidth && containerWidth < minIframeWidth;

  let containerStyles = {};
  let iframeStyles = {};

  const ratio = useMemo(
    () =>
      aspectRatio.split('/').map((value) => parseFloat(value)) as [
        number,
        number,
      ],
    [aspectRatio],
  );

  if (onClientAndShouldScale) {
    containerStyles = {
      height: Math.round(containerWidth / (ratio[0] / ratio[1])),
    };

    iframeStyles = {
      scale: containerWidth / minIframeWidth,
      transformOrigin: '0 0',
      width: minIframeWidth,
      height: Math.round(minIframeWidth / (ratio[0] / ratio[1])),
      maxWidth: 'unset',
      transition: 'transform .1s linear',
    };
  } else {
    containerStyles = {
      width: '100%',
    };

    iframeStyles = {
      width: '100%',
      aspectRatio,
    };
  }

  return (
    <div className={styles.Iframe} ref={containerRef} style={containerStyles}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={iframeStyles}
        {...iframeProps}
      ></iframe>
    </div>
  );
}

export default Iframe;
