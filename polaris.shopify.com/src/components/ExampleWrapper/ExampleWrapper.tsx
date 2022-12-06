import styles from './ExampleWrapper.module.scss';
import {className} from '../../utils/various';
type Props = {
  children: React.ReactNode;
  renderFrameActions: () => React.ReactNode;
};
const ExampleWrapper: React.ComponentType<Props> = ({
  children,
  renderFrameActions,
}) => {
  return (
    <div className={styles.ExampleFrame}>
      {children}
      <div className={className(styles.Buttons, 'light-mode')}>
        {renderFrameActions()}
      </div>
    </div>
  );
};

export default ExampleWrapper;
