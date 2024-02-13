import {useState, useEffect, Fragment} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {ClipboardIcon, EditIcon} from '@shopify/polaris-icons';
import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';
import SandboxHelpDialog from '../SandboxHelpDialog';

import styles from './SandboxHeader.module.scss';

interface Props {
  copyUrl: string;
  editUrl?: string;
}

const MS_DELAY_BEFORE_SHOW_ONBOARDING = 500;

function SandboxHeader({copyUrl, editUrl}: Props) {
  const [copy, didJustCopy] = useCopyToClipboard(copyUrl);
  const [isHelpOpen, setHelpIsOpen] = useState(false);

  // After the page has rendered at least once, we might show the help dialog
  // (so it animates onto the screen nicely)
  useEffect(() => {
    const helpTimeout = setTimeout(() => {
      const hasAlreadyBeenOnboarded = localStorage.getItem('onboarded');
      if (hasAlreadyBeenOnboarded) {
        return;
      }
      localStorage.setItem('onboarded', 'true');
      setHelpIsOpen(true);
    }, MS_DELAY_BEFORE_SHOW_ONBOARDING);
    return () => clearTimeout(helpTimeout);
  }, []);

  return (
    <Fragment>
      <div className={styles.Header}>
        <Link href="/" className={styles.Logo}>
          <Image
            src="/images/shopify-logo.svg"
            width={24}
            height={24}
            alt="Shopify logo"
          />
          Polaris Sandbox
        </Link>

        <div className={styles.Buttons}>
          <button onClick={() => setHelpIsOpen(true)}>Learn more</button>
          <button className={styles.CopyURLButton} onClick={copy}>
            <Icon source={ClipboardIcon} width="1em" height="1em" />
            {didJustCopy ? 'Copied!' : 'Copy URL'}
          </button>
          {editUrl ? (
            <Link href={editUrl}>
              <Icon source={EditIcon} width="1em" height="1em" />
              Edit
            </Link>
          ) : null}
        </div>
      </div>
      <SandboxHelpDialog {...{isOpen: isHelpOpen, setIsOpen: setHelpIsOpen}} />
    </Fragment>
  );
}

export default SandboxHeader;
