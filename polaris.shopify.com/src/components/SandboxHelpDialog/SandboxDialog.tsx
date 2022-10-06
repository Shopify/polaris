import {useRef} from 'react';
import {Dialog} from '@headlessui/react';
import styles from './SandboxDialog.module.scss';
import Button from '../Button';

function SandboxHelpDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const videoRef = useRef(null);
  return (
    <Dialog
      initialFocus={videoRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className={styles.PreventBackgroundInteractions}></div>
      <div className="styles-for-site-but-not-polaris-examples light-mode">
        <Dialog.Panel className={styles.DialogPanel}>
          <div className={styles.SandboxVideo} ref={videoRef}>
            <video muted loop autoPlay playsInline width={1000} height={1500}>
              <source src="/images/sandbox-usage.mp4" type="video/mp4" />
            </video>
          </div>

          <div>
            <Dialog.Title>
              Effortless
              <br /> prototyping with
              <br /> Polaris components.
            </Dialog.Title>

            <ul>
              <li>No setup required</li>
              <li>
                Polaris components autocomplete and React hooks are fully
                supported
              </li>
              <li>Preview breakpoints automatically</li>
              <li>Share your compositions via a shareable URL</li>
            </ul>

            <p>
              Tell us what functionality you’d like the sandbox to have.{' '}
              <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request%2C+untriaged&template=FEATURE_REQUEST.md&title=%5BSandbox%5D%20">
                Submit a GitHub issue with your idea
              </a>
              .
            </p>

            <Button
              primary
              className={styles.CloseButton}
              onClick={() => setIsOpen(false)}
            >
              Get started
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SandboxHelpDialog;
