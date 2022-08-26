import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';

import {ClipboardMinor, QuestionMarkMinor} from '@shopify/polaris-icons';
import Container from '../Container';
import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

import styles from './SandboxHeader.module.scss';
import SandboxHelpDialog from '../SandboxHelpDialog';

function IconButtonWithTooltip({
  icon,
  ariaLabel,
  tooltipContent,
  buttonClassName,
  onClick,
}: {
  icon: any;
  ariaLabel: any;
  tooltipContent: any;
  buttonClassName: any;
  onClick: any;
}) {
  return (
    <Tooltip
      ariaLabel={ariaLabel}
      renderContent={() => <p>{tooltipContent}</p>}
    >
      <button
        type="button"
        className={buttonClassName}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <Icon source={icon} width={16} height={16} />
      </button>
    </Tooltip>
  );
}

function CopyButton({url}: {url: string}) {
  const [copy, didJustCopy] = useCopyToClipboard(url);

  return (
    <IconButtonWithTooltip
      icon={ClipboardMinor}
      ariaLabel="Copy to clipboard"
      tooltipContent={didJustCopy ? 'Copied' : 'Copy'}
      buttonClassName={styles.TooltipButton}
      onClick={copy}
    />
  );
}

interface Props {
  darkMode: DarkMode;
  currentPath?: string;
  url: string;
}

function HelpDialogButton({onClick}: {onClick: () => void}) {
  return (
    <IconButtonWithTooltip
      icon={QuestionMarkMinor}
      ariaLabel="Open how to use dialog"
      tooltipContent="How to use"
      buttonClassName={styles.TooltipButton}
      onClick={onClick}
    />
  );
}

function PlaygroundHeader({darkMode, currentPath = '', url}: Props) {
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mainContent = document.querySelector('#main');
    setShowSkipToContentLink(mainContent !== null);
  }, [currentPath]);
  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
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

        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <span>Welcome to the Polaris Playground ALPHA</span>
        <div className={styles.HeaderBtnWrapper}>
          <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
            {darkMode.value ? (
              <div className={styles.LightModeIcon}>💡</div>
            ) : (
              <div className={styles.DarkModeIcon}>🌙</div>
            )}
          </button>
          <CopyButton url={url} />
          <HelpDialogButton onClick={() => setIsOpen(true)} />
          <SandboxHelpDialog {...{isOpen, setIsOpen}} />
        </div>
      </Container>
    </div>
  );
}

export default PlaygroundHeader;
