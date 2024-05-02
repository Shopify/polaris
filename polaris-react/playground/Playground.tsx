import React, {isValidElement, useEffect} from 'react';
import {GlobeIcon, SearchIcon} from '@shopify/polaris-icons';

import {BlockStack, Page, Button, Icon, Box, Text, Collapsible} from '../src';

import classes from './DetailsPage.module.css';

export const Playground = {
  tags: ['skip-tests'],
  render() {
    const [count, setCount] = React.useState(0);
    const [viewMode, setViewMode] = React.useState(true);
    const [leftContent, setLeftContent] = React.useState<React.ReactNode[]>([]);
    const [rightContent, setRightContent] = React.useState<React.ReactNode[]>(
      [],
    );

    const styles = {
      TopBar: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'black',
        minHeight: 56,
      },
      Dynamic: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        color: 'white',
        padding: '8px 16px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        flex: 1,
      },
      Slot: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 0px',
      },
      Static: {
        display: 'flex',
        alignItems: 'center',
      },
      StaticButton: {
        display: 'flex',
        gap: viewMode ? 4 : 0,
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      },
      StaticText: {
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      },
      Center: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 1 480px',
        transition: 'flex-basis 150ms ease-in-out',
      },
    } as const;

    return (
      <div>
        <div style={styles.TopBar}>
          <Brand />
          <div style={styles.Dynamic}>
            <div style={{...styles.Slot, justifyContent: 'end'}}>
              <div style={styles.Static}>
                <button
                  onClick={() => setViewMode((viewMode) => !viewMode)}
                  style={styles.StaticButton}
                >
                  <div>
                    <Icon source={GlobeIcon} tone="base" />
                  </div>
                  <Collapsible id="static" open={viewMode} variant="horizontal">
                    <p style={styles.StaticText}>View mode</p>
                  </Collapsible>
                </button>
              </div>
              {leftContent.map((content) => (
                <div
                  className={classes.LeftContent}
                  key={reactChildrenText(content)}
                >
                  {content}
                </div>
              ))}
            </div>
            <div style={styles.Center}>{inputMarkup()}</div>
            <div style={styles.Slot}>
              {rightContent.map((content) => (
                <div
                  className={classes.RightContent}
                  key={reactChildrenText(content)}
                >
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Box paddingBlock="600">
          <button
            onClick={() => {
              setCount(count + 1);
              setLeftContent((content) => [
                <Button key={count} icon={SearchIcon} variant="primary">
                  {count.toString()}
                </Button>,
                ...content,
              ]);
            }}
          >
            add left content
          </button>
          <button
            onClick={() => {
              setCount(count + 1);
              setRightContent((content) => [
                ...content,
                <Button key={count} icon={SearchIcon} variant="primary">
                  {count.toString()}
                </Button>,
              ]);
            }}
          >
            add right content
          </button>
        </Box>

        <div style={{display: 'none'}}>
          <p className="">Previous examples</p>
          --------------------------
          <BlockStack gap="200">
            <FlexBasis />
            <KnownWidths />
            <ShitExample />
            <AnimatedGrid />
          </BlockStack>
        </div>
      </div>
    );
  },
};

function FlexBasis() {
  const topBarRef = React.useRef<HTMLDivElement>(null);
  const [renderMeasurer, setRenderMeasurer] = React.useState(true);
  const dynamicSlotRef = React.useRef<HTMLDivElement>(null);
  const initialContentRef = React.useRef<HTMLDivElement>(null);
  const cumulativeWidthRef = React.useRef(0);
  const leftContentContainerRef = React.useRef<HTMLDivElement>(null);
  const rightContentRef = React.useRef<HTMLDivElement>(null);
  const [leftContent, setLeftContent] = React.useState<React.ReactNode[]>([]);

  useEffect(() => {
    setRenderMeasurer(false);
    cumulativeWidthRef.current = initialContentRef.current?.offsetWidth ?? 0;
  }, []);

  const styles = {
    TopBar: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'white',
      padding: '8px 16px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    Left: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      backgroundColor: 'lightpink',
      flex: `1 1 ${
        initialContentRef.current?.offsetWidth
          ? `${initialContentRef.current?.offsetWidth}px`
          : 'auto'
      }`,
    },
    Center: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'lightgreen',
      transition: 'flex-basis 150ms ease-in-out',
      flex: `0 1 ${
        initialContentRef.current
          ? 250 - initialContentRef.current?.offsetWidth
          : 250
      }px`,
    },
    Right: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      backgroundColor: 'lightblue',
      flex: `1 1 ${rightContentRef.current?.offsetWidth}px`,
    },
  };

  const leftContentMarkup = <Button icon={SearchIcon} />;

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <div style={styles.TopBar} ref={topBarRef}>
        <div style={styles.Left} ref={leftContentContainerRef}>
          {renderMeasurer ? (
            <div style={{visibility: 'hidden'}} ref={initialContentRef}>
              {leftContent.length ? leftContent : leftContentMarkup}
            </div>
          ) : null}
          {leftContent.length ? leftContent : 'blank'}
        </div>
        <div style={styles.Center} ref={dynamicSlotRef}>
          {inputMarkup()}
        </div>
        <div style={styles.Right}>
          rightrightrightrightrightrightrightrightright
        </div>
      </div>
      <button
        onClick={() => {
          setLeftContent((leftContent) => [leftContentMarkup, ...leftContent]);
        }}
      >
        add left content
      </button>
    </Page>
  );
}

function AnimatedGrid() {
  const [toggleLeft, setToggleLeft] = React.useState(false);
  const [toggleRight, setToggleRight] = React.useState(false);
  const [leftContent, setLeftContent] = React.useState<React.ReactNode>();
  const [rightContent, setRightContent] = React.useState<React.ReactNode>();

  const styles = {
    Grid: {
      display: 'grid',
      gridTemplateColumns: getTemplateColumns(leftContent, rightContent),
      transition: 'grid-template-columns 150ms ease-in-out',
    },
    Left: {
      backgroundColor: 'red',
      paddingInlineEnd: 8,
    },
    Center: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
    Right: {
      backgroundColor: 'green',
      paddingInlineStart: 8,
    },
    Content: {
      minWidth: '200px',
      color: 'white',
    },
  };

  return (
    <>
      <div style={styles.Grid}>
        <div style={styles.Left}>{leftContent}</div>
        <div style={styles.Center}>
          <div style={styles.Content}>Search</div>
        </div>
        <div style={styles.Right}>{rightContent}</div>
      </div>
      <button
        onClick={() => {
          setLeftContent((leftContent) =>
            leftContent ? null : <div key="left">Left</div>,
          );
          setToggleLeft(!toggleLeft);
        }}
      >
        Toggle Left
      </button>
      <button
        onClick={() => {
          setRightContent((rightContent) =>
            rightContent ? null : <div key="right">Right</div>,
          );
          setToggleRight(!toggleRight);
        }}
      >
        Toggle Right
      </button>
    </>
  );
}

function getTemplateColumns(
  leftContent: React.ReactNode,
  rightContent: React.ReactNode,
) {
  return `${leftContent ? '.25fr' : '0fr'} 1fr ${
    rightContent ? '.25fr' : '0fr'
  }`;
}

function ShitExample() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousWidthRef = React.useRef<number>(
    contentRef.current?.offsetWidth ?? 0,
  );
  const [count, setCount] = React.useState(0);
  const [leftContent, setLeftContent] = React.useState<React.ReactNode[]>([]);
  const [rightContent, setRightContent] = React.useState<React.ReactNode[]>([]);

  const styles = {
    TopBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 56,
      padding: '0 20px',
      backgroundColor: '#f8f8f8',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      borderRadius: 4,
    },
    Left: {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'red',
      // transform: `scaleX(${previousWidthRef.current ? 1 : 0})`,
      transition: 'transform 1s ease-in-out',
    },
    Center: {
      display: 'flex',
      alignItems: 'center',
    },
    Right: {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'blue',
      // transform: `scaleX(${previousWidthRef.current ? 1 : 0})`,
      transition: 'transform 1s ease-in-out',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      padding: 20,
      gap: 8,
    },
  };

  const contentMarkup = <div ref={contentRef}>{count ** count}</div>;
  return (
    <BlockStack gap="200">
      <div style={styles.TopBar}>
        <div style={styles.Left}>{leftContent}</div>
        <div style={styles.Center}>center content</div>
        <div style={styles.Right}>{rightContent}</div>
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={() => {
            previousWidthRef.current += contentRef.current?.offsetWidth ?? 0;
            setCount((count) => count + 1);
            setLeftContent((leftContent) => [...leftContent, contentMarkup]);
          }}
        >
          add left content
        </button>
        <button
          onClick={() => {
            previousWidthRef.current += contentRef.current?.offsetWidth ?? 0;
            setCount((count) => count + 1);
            setRightContent((rightContent) => [...rightContent, contentMarkup]);
          }}
        >
          add right content
        </button>
      </div>
    </BlockStack>
  );
}

function KnownWidths() {
  const [leftWidths, setLeftWidths] = React.useState<number[]>([]);
  const [rightWidths, setRightWidths] = React.useState<number[]>([]);
  const totalLeftWidth = leftWidths.reduce((acc, width) => acc + width, 0);
  const totalRightWidth = rightWidths.reduce((acc, width) => acc + width, 0);

  const styles = {
    TopBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    Left: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'lightpink',
      flexGrow: 0,
      transition: 'width 150ms ease-in-out',
      width: totalLeftWidth,
      maxWidth: '100%',
    },
    Center: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      backgroundColor: 'lightgreen',
      transition: 'margin 150ms ease-in-out',
      marginLeft: totalLeftWidth * -1,
      marginRight: totalRightWidth * -1,
      maxWidth: 100,
    },
    Right: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      flexGrow: 0,
      transition: 'width 150ms ease-in-out',
      width: totalRightWidth,
      maxWidth: '100%',
    },
  };

  return (
    <>
      <div style={styles.TopBar}>
        <div style={styles.Left}>{leftWidths.length ? 'left' : null}</div>
        <div style={styles.Center}>center</div>
        <div style={styles.Right}>{rightWidths.length ? 'right' : null}</div>
      </div>
      <button
        onClick={() =>
          setLeftWidths((widths) => [
            ...widths,
            Math.round(Math.random() * 100 * 100) / 100,
          ])
        }
      >
        add left width
      </button>
      <button
        onClick={() =>
          setRightWidths((widths) => [
            ...widths,
            Math.round(Math.random() * 100 * 100) / 100,
          ])
        }
      >
        add right width
      </button>
    </>
  );
}

function inputMarkup() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        width: '100%',
        borderRadius: 6,
        padding: 4,
        border: '0.75px solid #4c4c4c',
      }}
    >
      <label htmlFor="search">
        <Text as="span" visuallyHidden>
          Search
        </Text>
        <span>
          <Icon source={SearchIcon} />
        </span>
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search"
        autoComplete="off"
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'white',
        }}
      />
    </div>
  );
}

const reactChildrenText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;

  return isValidElement(children)
    ? reactChildrenText(children?.props?.children)
    : '';
};

function Brand() {
  return (
    <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.8956 8.39159C26.876 8.25021 26.751 8.17175 26.6473 8.16321C26.5443 8.15466 24.5277 8.12436 24.5277 8.12436C24.5277 8.12436 22.8411 6.50548 22.6745 6.3408C22.5079 6.17611 22.1825 6.22583 22.056 6.26312C22.0544 6.26389 21.7392 6.36022 21.2087 6.52257C21.1199 6.23826 20.9895 5.88869 20.8032 5.53757C20.2028 4.40498 19.3233 3.80605 18.2608 3.8045C18.2592 3.8045 18.2584 3.8045 18.2568 3.8045C18.183 3.8045 18.1099 3.81149 18.036 3.8177C18.0046 3.78042 17.9731 3.74391 17.9401 3.70817C17.4772 3.21878 16.8838 2.9803 16.1726 3.00127C14.8004 3.04011 13.4337 4.01968 12.3255 5.75974C11.5459 6.984 10.9525 8.52209 10.7843 9.71295C9.20858 10.1954 8.10673 10.5325 8.08237 10.5403C7.28702 10.7873 7.26187 10.8114 7.15813 11.5524C7.08111 12.1125 5 28.0186 5 28.0186L22.4403 31L29.9992 29.1426C29.9992 29.1426 26.9153 8.53297 26.8956 8.39159ZM20.3356 6.7898C19.934 6.91253 19.4774 7.05236 18.9822 7.20384C18.972 6.51714 18.8895 5.56165 18.5657 4.7359C19.607 4.93088 20.1195 6.09532 20.3356 6.7898ZM18.0698 7.48349C17.1558 7.76315 16.1584 8.06843 15.158 8.3745C15.4393 7.30949 15.973 6.24913 16.6284 5.55388C16.8721 5.29521 17.2131 5.00701 17.6171 4.84232C17.9967 5.62535 18.0792 6.73387 18.0698 7.48349ZM16.2001 3.90393C16.5223 3.89694 16.7935 3.96685 17.0253 4.11755C16.6544 4.30787 16.296 4.58131 15.9596 4.93787C15.088 5.86228 14.42 7.29706 14.1536 8.68134C13.3229 8.93536 12.5102 9.18472 11.762 9.4131C12.2344 7.23414 14.0821 3.96452 16.2001 3.90393Z"
          fill="#95BF47"
        />
        <path
          d="M26.6482 8.16418C26.5452 8.15564 24.5286 8.12534 24.5286 8.12534C24.5286 8.12534 22.842 6.50646 22.6754 6.34178C22.6133 6.28041 22.5292 6.24856 22.4412 6.23535L22.4419 30.9994L30.0001 29.1428C30.0001 29.1428 26.9162 8.53395 26.8965 8.39257C26.8769 8.25119 26.7511 8.17273 26.6482 8.16418Z"
          fill="#5E8E3E"
        />
        <path
          d="M18.2512 12.0055L17.3734 15.2518C17.3734 15.2518 16.3941 14.8113 15.2333 14.8836C13.531 14.99 13.5129 16.0511 13.5302 16.3176C13.623 17.7695 17.4873 18.0864 17.7042 21.4873C17.8748 24.1626 16.2684 25.9928 13.9538 26.1373C11.1756 26.3105 9.64624 24.6909 9.64624 24.6909L10.2349 22.2159C10.2349 22.2159 11.7745 23.3641 13.0068 23.2872C13.8116 23.2367 14.0992 22.5896 14.0702 22.132C13.9491 20.2382 10.8023 20.35 10.6035 17.2381C10.4361 14.6195 12.1761 11.9659 16.0153 11.7266C17.4944 11.6326 18.2512 12.0055 18.2512 12.0055Z"
          fill="white"
        />
      </svg>
      <p style={{fontWeight: 600}}>Spectrally yours</p>
    </div>
  );
}
