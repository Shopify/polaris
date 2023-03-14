import {className} from '../../utils/various';
import styles from './ExampleWrapper.module.scss';

type Props = {
  children: React.ReactNode;
  renderFrameActions: () => React.ReactNode;
};

const ExampleWrapper = ({children, renderFrameActions}: Props) => (
  <div className={styles.ExampleFrame}>
    {children}

    <div className={className([styles.Buttons, 'light-mode'])}>
      {renderFrameActions()}
    </div>
  </div>
);

export default ExampleWrapper;
