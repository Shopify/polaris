//@ts-nocheck
import { useState, useEffect } from "react";
import {tokens, TokenGroup} from '@shopify/polaris-tokens';

const { motion } = tokens;

import { useCopyToClipboard } from "../../utils/hooks";
import styles from "./FrameVisualizer.module.scss";

export function getEasingTokens(motion: TokenGroup) {
  return Object.fromEntries(
    Object.entries(motion).filter(
      ([token]) => (token.includes("linear") || token.includes("ease")
    )
  ))
}

export function getDurationTokens(motion: TokenGroup) {
  return Object.fromEntries(
    Object.entries(motion).filter(
      ([token]) => (token.includes("duration")
    )
  ))
}

const getEasingName = (easing: string) => {
  const foundEasing = Object.entries(getEasingTokens(motion))
    .find(easingEntry => easing === easingEntry[1].value)

  return foundEasing && foundEasing[0]
}

export function FrameVisualizer({id, duration, easing} : {id: string, duration: number, easing: string}) {
  const fps = 60;
  const containerWidth = 600 - 80 - 40; // TODO – make dynamic (container width - container padding - frame width)
	const delayIncrement = -1000/fps; // E.g. -16.667
	const count = duration/1000*fps + 1; // E.g. when duration = 1000 and fps = 60 then count = 60 (1 frame added to simulate "initial state")
  const lastPosition = -(duration - 0.000001); // E.g. -299.999999 to force the last frame to position itself at end the frame sequence (-300ms delay == 0ms delay)
	const frames = Array.from({length: count});

  const easingName = getEasingName(easing)

  const cssOutput = `.my-polaris-transition {
    transition-timing-function: ${easingName ? `var(--p-${easingName})` : easing};
    transition-duration: var(--p-duration-${duration});
}`;

  const [copy, didJustCopy] = useCopyToClipboard(cssOutput);
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsPlaying(false);
  //   }, duration);
  //   return () => clearTimeout(timer);
  // }, [isPlaying]);

  // const handlePlay = () => {
  //   setIsPlaying(true);
  // }

  return (
    <>
      {/* <button onClick={handlePlay}>PLAY</button> */}
      <div className={styles.Frames /* + `${isPlaying ? " "+styles.IsPlaying : ""}` */}>
        {frames.map((_, i) =>
				  <div className={styles.Frame} key={i} style={{
            // transitionDelay: (i===frames.length-1 ? -lastPosition : -delayIncrement * i) + "ms",
            animationName: "frame-demo-slide",
					  animationDuration: duration + "ms",
					  animationTimingFunction: easing,
					  animationDelay: (i===frames.length-1 ? lastPosition : delayIncrement * i) + "ms"
					}}></div>
				)}
			</div>
      <div className={styles.CSSOutput}>
        <pre><code>{cssOutput}</code></pre>
        <button
          onClick={copy}
          onKeyUp={(evt) => {
            if (evt.code === "Enter" || evt.code === "Space") {
              copy();
              evt.preventDefault();
            }
          }}
        >Copy
        </button>
      </div>
      <style jsx>
        {`
          @keyframes frame-demo-slide {
            from { transform: translateX(0px);}
            to { transform: translateX(${containerWidth}px);}
          }
        `}
      </style>
    </>
  );
}
