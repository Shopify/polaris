import {Status} from '../../types';
import {className as classNames, variationName} from '../../utils/various';
import styles from './StatusBadge.module.scss';

interface Props {
  status: Status;
}

type Tone = 'info' | 'success' | 'warning' | 'critical' | 'attention' | 'new';

const StatusToneMapping: {[S in Status]: Tone} = {
  Alpha: 'info',
  Beta: 'success',
  Deprecated: 'critical',
  Information: 'info',
  Legacy: 'warning',
  New: 'new',
  Warning: 'warning',
};

function StatusBadge({status}: Props) {
  const className = classNames(
    styles.StatusBadge,
    styles[variationName('tone', StatusToneMapping[status])],
  );

  return <div className={className}>{status}</div>;
}

export default StatusBadge;
