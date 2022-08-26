import {Dialog} from '@headlessui/react';
import styles from './SandboxDialog.module.scss';
import Longform from '../Longform';

function SandboxHelpDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className={styles.PreventBackgroundInteractions}></div>
      <div className="dark-mode styles-for-site-but-not-polaris-examples">
        <Dialog.Panel className={styles.DialogPanel}>
          <Longform>
            <h2>How to use</h2>
            <p>Effortless prototyping with Polaris Sandbox</p>
            <div className={styles.SandboxVideo}>
              <video muted loop autoPlay playsInline width="1140" height="730">
                <source src="/images/sandbox-usage.mp4" type="video/mp4" />
              </video>
            </div>
            <ul>
              <li>
                No setup required, all Polaris components included. Just start
                typing!
                {/* <auto-complete-example-3s.gif> */}
              </li>
              <li>
                Preview at every breakpoint automatically
                {/* <scroll-preview-pane-2s.gif> */}
              </li>
              <li>
                Instantly shareable URL
                {/* <copy-URL-2s.gif> */}
              </li>
              <li>
                Fully supports all React hooks
                {/* <use-state-example-4s.gif> */}
              </li>
            </ul>
            <p>
              This is just the beginning!
              <br />
              As we continue to grow the Polaris tooling ecosystem, we&apos;ll
              also improve the Polaris Sandbox.
            </p>
          </Longform>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SandboxHelpDialog;
