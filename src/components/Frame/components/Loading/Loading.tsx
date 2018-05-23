import * as React from 'react';
import * as styles from './Loading.scss';

export interface Props {}

export interface State {
  progress: number;
  step: number;
  animation: number | null;
}

const INITIAL_STEP = 10;
const STUCK_THRESHOLD = 99;

export default class Loading extends React.Component<Props, State> {
  state = {
    progress: 0,
    step: INITIAL_STEP,
    animation: null,
  };

  componentDidMount() {
    this.increment();
  }

  componentWillUnmount() {
    const {animation} = this.state;

    if (animation != null) {
      cancelAnimationFrame(animation);
    }
  }

  render() {
    const {progress} = this.state;

    const customStyles = {
      transform: `scaleX(${Math.floor(progress) / 100})`,
    };

    return (
      <div className={styles.Loading}>
        <div className={styles.Level} style={customStyles} />
      </div>
    );
  }

  private increment() {
    const {progress, step} = this.state;

    if (progress >= STUCK_THRESHOLD) {
      return;
    }

    const animation = requestAnimationFrame(() => this.increment());

    this.setState({
      progress: Math.min(progress + step, 100),
      step: INITIAL_STEP ** -(progress / 25),
      animation,
    });
  }
}
