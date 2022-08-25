import {ClipboardMinor} from '@shopify/polaris-icons';
import {Tab} from '@headlessui/react';
import {useState} from 'react';
import Prism from 'prismjs';

import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';
import styles from './Code.module.scss';
import Tooltip from '../Tooltip';

interface Props {
  code:
    | {
        title: string;
        code: string;
      }
    | {
        title: string;
        code: string;
      }[];
}

function Code({code}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.Code}>
      {Array.isArray(code) ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className={styles.TopBar}>
            <Tab.List className={styles.Tabs}>
              {code.map(({title}) => (
                <Tab key={title} className={styles.Tab}>
                  {title}
                </Tab>
              ))}
            </Tab.List>
            {code[selectedIndex] && (
              <CopyButton code={code[selectedIndex].code} />
            )}
          </div>

          <Tab.Panels>
            {code.map(({title, code}) => (
              <Tab.Panel key={title}>
                <HighlightedCode code={code} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <>
          <div className={styles.TopBar}>
            <div className={styles.Tabs}>
              <div className={styles.Tab}>{code.title}</div>
            </div>
            <CopyButton code={code.code} />
          </div>
          <HighlightedCode code={code.code} />
        </>
      )}
    </div>
  );
}

function HighlightedCode({code}: {code: string}) {
  return (
    <pre>
      <code
        className={styles.ActualCode}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            code,
            Prism.languages.javascript,
            'javascript',
          ),
        }}
      ></code>
    </pre>
  );
}

function CopyButton({code}: {code: string}) {
  const [copy, didJustCopy] = useCopyToClipboard(code);

  return (
    <div className={styles.CopyButtonWrapper}>
      <Tooltip
        ariaLabel="Copy to clipboard"
        renderContent={() => <p>{didJustCopy ? 'Copied' : 'Copy'}</p>}
      >
        <button
          type="button"
          className={styles.CopyButton}
          onClick={copy}
          aria-label="Copy to clipboard"
        >
          <Icon source={ClipboardMinor} width={16} height={16} />
        </button>
      </Tooltip>
    </div>
  );
}

export default Code;
