'use client';

import {ClipboardMinor} from '@shopify/polaris-icons';
import {Fragment, useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

// import {useCopyToClipboard} from '../../utils/hooks';
// import Icon from '../Icon';
import styles from './Code.module.scss';
import {CodeBlock, CodeBlockLanguage} from '@/types';
import {Tabs, Tab} from '../Tabs';
import Button from '../Button';
import {useCopyToClipboard} from '@/hooks';
import {className} from '@/utils';
// import Tooltip from '../Tooltip';

interface Props {
  snippets: CodeBlock['snippets'];
}

function Code({snippets}: Props) {
  if (snippets.length > 1) {
    return (
      <div className={styles.Code}>
        <Tabs tabs={snippets.map(({label}) => label)} boxed={false}>
          {snippets.map(({id, code, language}) => (
            <Tab key={id}>
              <div className="dark-mode">
                <HighlightedCode code={code} language={language} />
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  } else if (snippets.length === 1) {
    return (
      <div className={className(styles.Code, 'dark-mode')}>
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
    <div className={styles.HighlightedCode}>
      <CopyButton code={code} />
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
    </div>
  );
}

export function CopyButton({code}: {code: string}) {
  const [copy, didJustCopy] = useCopyToClipboard();

  return (
    <div className={styles.CopyButtonWrapper}>
      <Button
        label="Copy"
        ariaLabel="Copy code"
        icon="copy"
        didJustCopy={didJustCopy}
        onClick={() => copy(code)}
      />
    </div>
  );
}

export default Code;
