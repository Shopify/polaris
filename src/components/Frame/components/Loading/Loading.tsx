import React, {useEffect, useState} from 'react';

import {useI18n} from '../../../../utilities/i18n';

import styles from './Loading.scss';

export function Loading() {
  const i18n = useI18n();

  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (progress >= 100 || animating) {
      return;
    }

    requestAnimationFrame(() => {
      const step = Math.max((100 - progress) / 10, 1);
      setAnimating(true);
      setProgress(progress + step);
    });
  }, [progress, animating]);

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
