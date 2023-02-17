import styles from './UpdateBanner.module.scss';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';
import Markdown from '../Markdown';
import {Box, Text} from '@shopify/polaris';

interface Props {
  message?: string;
  width?: string;
}

function UpdateBanner({message, width = '100%'}: Props) {
  if (!message) {
    return null;
  }
  return (
    <Box width={width}>
      <div className={styles.Banner}>
        <Icon source={FlagMajor} width={20} height={20} />
        <Markdown>{message}</Markdown>
      </div>
    </Box>
  );
}

export default UpdateBanner;
