'use client';

import {ClipboardMinor} from '@shopify/polaris-icons';
import {Fragment, useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

// import {useCopyToClipboard} from '../../utils/hooks';
// import Icon from '../Icon';
import styles from './Code.module.scss';
import {className} from '@/utils';
import {CodeBlock, CodeBlockLanguage} from '@/types';
import {Tabs, Tab} from '../Tabs';
// import Tooltip from '../Tooltip';

interface Props {
  snippets: CodeBlock['snippets'];
}

function Code({snippets}: Props) {
  if (snippets.length > 1) {
    return (
      <div className={className(styles.Code, 'dark-mode')}>
        <Tabs tabs={snippets.map(({id, label}) => label)} boxed={false}>
          {snippets.map(({id, code, language}) => (
            <Tab>
              <HighlightedCode code={code} language={language} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  } else if (snippets.length === 1) {
    return (
      <div className={className(styles.Code, 'dark-mode')}>
        {/* <CopyButton code={code.code} /> */}
        <HighlightedCode
          code={snippets[0].code}
          language={snippets[0].language}
        />
      </div>
    );
  }
  return null;
}

function HighlightedCode({
  code,
  language,
}: {
  code: string;
  language: CodeBlockLanguage;
}) {
  return (
    <pre>
      <SyntaxHighlighter
        // eslint-disable-next-line react/no-children-prop
        children={String(code).replace(/\n$/, '')}
        language={language}
        codeTagProps={{className: styles.ActualCode}}
        useInlineStyles={false}
        PreTag={'span'}
      />
    </pre>
  );
}

// export function CopyButton({code}: {code: string}) {
//   const [copy, didJustCopy] = useCopyToClipboard(code);

//   return (
//     <div className={styles.CopyButtonWrapper}>
//       <Tooltip
//         ariaLabel="Copy to clipboard"
//         renderContent={() => <p>{didJustCopy ? 'Copied' : 'Copy'}</p>}
//       >
//         <button
//           type="button"
//           className={styles.CopyButton}
//           onClick={copy}
//           aria-label="Copy to clipboard"
//         >
//           <Icon source={ClipboardMinor} width={16} height={16} />
//         </button>
//       </Tooltip>
//     </div>
//   );
// }

export default Code;
