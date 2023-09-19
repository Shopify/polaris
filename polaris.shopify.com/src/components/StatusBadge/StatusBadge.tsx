import {Status, StatusToneMapping} from '../../types';
import {className as classNames, variationName} from '../../utils/various';
import styles from './StatusBadge.module.scss';

interface Props {
  status: Status;
}

function StatusBadge({status}: Props) {
  const className = classNames(
    styles.StatusBadge,
    styles[variationName('tone', StatusToneMapping[status])],
  );

  return <div className={className}>{status}</div>;
}

export default StatusBadge;
