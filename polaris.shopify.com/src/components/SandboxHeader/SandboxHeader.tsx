import Link from 'next/link';
import Image from 'next/image';

import {ClipboardMinor} from '@shopify/polaris-icons';
import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';

import styles from './SandboxHeader.module.scss';

interface Props {
  url: string;
  setHelpIsOpen: (open: boolean) => void;
}

function SandboxHeader({url, setHelpIsOpen}: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(url);

  return (
    <div className={styles.Header}>
      <Link href="/">
        <a className={styles.Logo}>
          <Image
            src="/images/shopify-logo.svg"
            layout="fixed"
            width={24}
            height={24}
            alt="Shopify logo"
          />
          Polaris Sandbox
        </a>
      </Link>

      <div className={styles.Buttons}>
        <button onClick={() => setHelpIsOpen(true)}>Learn more</button>
        <button className={styles.CopyURLButton} onClick={copy}>
          <Icon source={ClipboardMinor} width="1em" height="1em" />
          {didJustCopy ? 'Copied!' : 'Copy URL'}
        </button>
      </div>
    </div>
  );
}

export default SandboxHeader;
