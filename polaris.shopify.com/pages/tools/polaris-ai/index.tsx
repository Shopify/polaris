import styles from './PolarisAI.module.scss';
import Longform from '../../../src/components/Longform';
import StatusBadge from '../../../src/components/StatusBadge';
import {StatusName} from '../../../src/types';
import {useState, KeyboardEventHandler, ReactNode} from 'react';
import Markdown from '../../../src/components/Markdown';
import PatternsExample from '../../../src/components/PatternsExample';
import {
  MagicMajor,
  CircleAlertMajor,
  AutomationMajor,
  HintMajor,
  RiskMajor,
} from '@shopify/polaris-icons';

type CompletionType =
  | {
      prompt?: string;
      completion?: string;
      sources?: [string];
    }
  | undefined;

type DefaultScreenDataKeys = 'examples' | 'capabilities' | 'limitations';

type DefaultScreenData = {
  [k in DefaultScreenDataKeys]: {
    title: string;
    content: string[];
    icon: ReactNode;
  };
};

const defaultScreenData: DefaultScreenData = {
  examples: {
    icon: <HintMajor />,
    title: 'Examples',
    content: [
      'What does the Alpha Stack component do?',
      'Can I set the horizontal direction of Bleed?',
      'Is there a color for destructive buttons?',
    ],
  },
  capabilities: {
    icon: <AutomationMajor />,
    title: 'Capabilities',
    content: [
      'Trained on entire Polaris documentation',
      'Can answer questions from shopify.dev too',
      'Gives actionable next steps for diving deeper',
    ],
  },
  limitations: {
    icon: <RiskMajor />,
    title: 'Limitations',
    content: [
      'May occasionally generate incorrect information',
      'May occasionally produce harmful instructions or biased content',
      'Limited knowledge of world and events after 2021',
    ],
  },
};

const PolarisAI = () => {
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState<CompletionType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUi, setIsUi] = useState(false);

  const handleSubmitPrompt = async () => {
    setIsLoading(true);

    if (prompt.indexOf('/ui') >= 0) {
      setIsUi(true);
    }

    fetch(`/api/prompts?p=${encodeURIComponent(prompt)}`)
      .then((data) => data.json())
      .then((json) => {
        const {completion, mostSimilar} = json;
        console.log(completion);
        setCompletion({
          prompt,
          completion,
          sources: mostSimilar,
        });
        setIsLoading(false);
      });
  };

  const handleSlash = (evt) => {
    evt.stopPropagation();
    console.log('HAHA SERCH!');
  };

  const handlePressEnter: KeyboardEventHandler<HTMLDivElement> = (evt) => {
    switch (evt.code) {
      case 'Enter':
        handleSubmitPrompt();
        break;
      case 'Slash':
        handleSlash(evt);
        break;
    }
  };

  return (
    <Longform>
      <div className={styles.PolarisAIContainer}>
        <BetaMessage />

        {isLoading && <Loading />}
        {(!completion || !completion.completion) && !isLoading && (
          <DefaultScreen />
        )}
        {completion && completion.completion && (
          <div className={styles.PromptAnswer}>
            {/* {answer} */}
            <Markdown
              components={
                isUi && {
                  code: ({inline, children, className}) =>
                    inline ? (
                      <code>{children}</code>
                    ) : (
                      <PatternsExample
                        example={{
                          code: children.toString(),
                        }}
                        patternName="An example"
                        showCode
                      />
                    ),
                }
              }
            >
              {completion.completion}
            </Markdown>
            {/* <TypingAnimation message={answer} /> */}
            <div className={styles.AISources}>
              {completion.sources && (
                <p className={styles.SourceTitle}>Sources:</p>
              )}
              <div className={styles.AISourceList}>
                {completion.sources &&
                  completion.sources.map((source) => {
                    return source && <p key={source}>{source}</p>;
                  })}
              </div>
            </div>
          </div>
        )}
        <input
          className={styles.PromptInput}
          placeholder="Enter a prompt..."
          type="search"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyUp={handlePressEnter}
          onKeyDown={handlePressEnter}
        />
      </div>
    </Longform>
  );
};

const Loading = () => (
  <div className={styles.AILoading}>
    <p className={styles.AILoadingMessage}>Generating your response</p>
    <p>This may take a few seconds</p>
  </div>
);

const DefaultScreen = () => {
  const idk = Object.keys(defaultScreenData).map((type) => {
    const data = defaultScreenData[type];
    let markup;

    markup = data.content.map((content) => {
      if (type === 'examples') {
        return (
          <button
            key={content}
            className={styles.AIBox}
            data-question={content}
          >
            {content}
          </button>
        );
      }

      return (
        <div key={content} className={styles.AIBox}>
          {content}
        </div>
      );
    });

    return (
      <div key={type} className={styles.AIExamplePrompts}>
        <div>
          <div className={styles.AIIcon}>{data.icon}</div>
          <p>{data.title}</p>
        </div>
        {markup}
      </div>
    );
  });
  return <div className={styles.AICannedContainer}>{idk}</div>;
};

const BetaMessage = () => {
  return (
    <div className={styles.DocsAIMessage}>
      <button className={styles.DocsAIToggle} onClick={() => console.log('ai')}>
        <span className={styles.DocsAIHeading}>Docs AI </span>
        <StatusBadge status={{message: '', value: StatusName.Beta}} />
      </button>
      <span>Learn more about how to use this tool.</span>
    </div>
  );
};

export default PolarisAI;
