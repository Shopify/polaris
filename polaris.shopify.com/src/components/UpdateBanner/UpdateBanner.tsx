import styles from './UpdateBanner.module.scss';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';
import Markdown from '../Markdown';
import {Box} from '../Box';

interface Props {
  message?: string;
  className?: string;
}

function UpdateBanner({message, className}: Props) {
  if (!message) {
    return null;
  }
  return (
    <Box className={[styles.Banner, className]}>
      <Icon source={FlagMajor} width={20} height={20} />
      <Markdown>{message}</Markdown>
    </Box>
  );
}

export default UpdateBanner;
