import React, {useEffect, useState} from 'react';

import {useI18n} from '../../../../utilities/i18n';

import styles from './Loading.scss';

const INITIAL_STEP = 10;
const STUCK_THRESHOLD = 99;

export function Loading() {
  const i18n = useI18n();

  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(INITIAL_STEP);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (progress >= STUCK_THRESHOLD || animating) {
      return;
    }

    requestAnimationFrame(() => {
      const newProgress = Math.min(progress + step, 100);
      setAnimating(true);
      setProgress(newProgress);
      setStep(10);
    });
  }, [progress, step, animating]);

  const customStyles = {
    transform: `scaleX(${Math.floor(progress) / 100})`,
  };

  return (
    <div
      className={styles.Loading}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
      aria-label={i18n.translate('Polaris.Loading.label')}
    >
      <div
        className={styles.Level}
        style={customStyles}
        onTransitionEnd={() => setAnimating(false)}
      />
    </div>
  );
}
