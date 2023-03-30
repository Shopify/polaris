'use client';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {CodeBlock, CodeBlockLanguage} from '@/types';
import {Tabs, Tab} from '../Tabs';
import Button from '../Button';
import {useCopyToClipboard} from '@/hooks';
import styles from './Code.module.scss';

interface Props {
  snippets: CodeBlock['snippets'];
}

function Code({snippets}: Props) {
  if (snippets.length > 1) {
    return (
      <div className={styles.Code}>
        <Tabs tabs={snippets.map(({id, label}) => ({id, label}))} boxed={false}>
          {snippets.map(({id, code, language}) => (
            <Tab key={id}>
              <HighlightedCode code={code} language={language} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  } else if (snippets.length === 1) {
    return (
      <div className={styles.Code}>
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
