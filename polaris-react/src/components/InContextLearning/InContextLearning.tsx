import React from 'react';
import styles from './InContextLearning.scss';
import {Header} from "./components"

export function InContextLearning() {
  return(
    <div className={styles.InContextLearning}>
      <div>
        <Header onClose={() => {}}>Placeholder title</Header>
      </div>
    </div>
  )
}
