import React, {useEffect, useState} from 'react';
import styles from './Loading.scss';

const INITIAL_STEP = 10;
const STUCK_THRESHOLD = 99;

export function Loading() {
  const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    let animation: number;
    let step = INITIAL_STEP;
    let currentProgress = 0;
    let previousProgress = 0;

    const increment = () => {
      if (currentProgress >= STUCK_THRESHOLD) {
        return;
      }

      currentProgress = Math.min(currentProgress + step, 100);
      const nextProgress = Math.floor(currentProgress) / 100;

      if (nextProgress !== previousProgress) {
        setProgress(nextProgress);
        previousProgress = nextProgress;
      }

      step = INITIAL_STEP ** -(currentProgress / 25);

      animation = requestAnimationFrame(increment);
    };

    increment();

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  const customStyles = {
    transform: `scaleX(${progress})`,
  };

  return (
    <div className={styles.Loading}>
      <div
        className={styles.Level}
        style={customStyles}
        aria-valuenow={progress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
}
