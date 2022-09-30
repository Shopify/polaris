import {useRef} from 'react';
import {Dialog} from '@headlessui/react';
import styles from './SandboxDialog.module.scss';
import Longform from '../Longform';
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
      <div className="styles-for-site-but-not-polaris-examples">
        <Dialog.Panel className={styles.DialogPanel}>
          <p style={{textAlign: 'right'}}>
            <Button
              small
              className={styles.CloseButton}
              onClick={() => setIsOpen(false)}
            >
              ╳
            </Button>
          </p>
          <div
            className={styles.SandboxVideo}
            // @ts-expect-error Why doesn't TS support CSS variables?
            style={{'--aspect-ratio': '1140 / 730'}}
            ref={videoRef}
          >
            <video muted loop autoPlay playsInline>
              <source src="/images/sandbox-usage.mp4" type="video/mp4" />
            </video>
          </div>
          <Longform firstParagraphIsLede={false}>
            <Dialog.Title>
              Effortless prototyping with Polaris components.
            </Dialog.Title>
            <p>
              <ul>
                <li>No setup required</li>
                <li>
                  Polaris components autocomplete and React hooks are fully
                  supported
                </li>
                <li>Preview breakpoints automatically</li>
                <li>Share your compositions via a shareable URL</li>
              </ul>
            </p>
            <p>
              Tell us what functionality you’d like the sandbox to have.{' '}
              <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request%2C+untriaged&template=FEATURE_REQUEST.md&title=%5BSandbox%5D%20">
                Submit a GitHub issue with your idea
              </a>
              .{' '}
            </p>
            <p style={{textAlign: 'right'}}>
              <Button
                primary
                className={styles.CloseButton}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </p>
          </Longform>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SandboxHelpDialog;
