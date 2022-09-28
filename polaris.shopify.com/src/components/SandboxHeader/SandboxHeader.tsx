import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';

import {StatusName} from '../../types';
import {ClipboardMinor} from '@shopify/polaris-icons';
import Container from '../Container';
import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';
import {StableButton} from '../Button';

import styles from './SandboxHeader.module.scss';
import StatusBadge from '../StatusBadge';

function CopyURLButton({url}: {url: string}) {
  const [copy, didJustCopy] = useCopyToClipboard(url);

  return (
    <StableButton small className={styles.CopyURLButton} onClick={copy}>
      <Icon source={ClipboardMinor} width="1em" height="1em" />
      {didJustCopy ? 'Copied!' : 'Copy URL'}
    </StableButton>
  );
}

interface Props {
  darkMode: DarkMode;
  currentPath?: string;
  url: string;
  setHelpIsOpen: (open: boolean) => void;
}

function SandboxHeader({currentPath = '', url, setHelpIsOpen}: Props) {
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);

  useEffect(() => {
    const mainContent = document.querySelector('#main');
    setShowSkipToContentLink(mainContent !== null);
  }, [currentPath]);
  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
        <div className={styles.LogoContainer}>
          <Link href="/">
            <a className={styles.Logo}>
              <Image
                src="/images/shopify-logo.svg"
                layout="fixed"
                width={24}
                height={24}
                alt="Shopify logo"
              />
              Polaris
            </a>
          </Link>
        </div>

        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <div className={styles.Title}>
          <h1 className={styles.TitleHeader}>
            Polaris Sandbox{' '}
            <StatusBadge status={{value: StatusName.Alpha, message: 'Alpha'}} />
          </h1>
          <div className={styles.TitleTagline}>
            Effortless prototyping with Polaris components.{' '}
            <a href="#" onClick={() => setHelpIsOpen(true)}>
              Learn more
            </a>
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <CopyURLButton url={url} />
        </div>
      </Container>
    </div>
  );
}

export default SandboxHeader;
