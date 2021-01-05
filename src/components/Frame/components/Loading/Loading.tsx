import React, {useEffect, useState} from 'react';

import {useI18n} from '../../../../utilities/i18n';

import styles from './Loading.scss';

const INITIAL_STEP = 10;
const STUCK_THRESHOLD = 99;

export function Loading() {
  const i18n = useI18n();

  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(INITIAL_STEP);

  useEffect(() => {
    if (progress >= STUCK_THRESHOLD) {
      return;
    }

    setProgress(Math.min(progress + step, 100));
    setStep(INITIAL_STEP ** -(progress / 25));
  }, [progress, step]);

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
      <div className={styles.Level} style={customStyles} />
    </div>
  );
}
