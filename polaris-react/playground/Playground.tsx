import React, {isValidElement, useEffect} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {BlockStack, Page, Button, Icon} from '../src';

import classes from './DetailsPage.module.css';

export const Playground = {
  tags: ['skip-tests'],
  render() {
    const [count, setCount] = React.useState(0);
    const [leftContent, setLeftContent] = React.useState<React.ReactNode[]>([]);
    const [rightContent, setRightContent] = React.useState<React.ReactNode[]>(
      [],
    );
    const styles = {
      TopBar: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        color: 'white',
        backgroundColor: 'black',
        padding: '8px 16px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      Slot: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 0px',
        transition: 'right 150ms ease-in-out',
      },
      Center: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 1 250px',
      },
    };

    return (
      <Page title="Playground">
        <div style={styles.TopBar}>
          <div style={{...styles.Slot, justifyContent: 'end'}}>
            {leftContent.map((content) => (
              <div
                className={classes.LeftContent}
                key={reactChildrenText(content)}
                data-key={reactChildrenText(content)}
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
        <button
          onClick={() => {
            setCount(count + 1);
            setLeftContent((content) => [
              <Button key={count} icon={SearchIcon}>
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
              <Button key={count} icon={SearchIcon}>
                {count.toString()}
              </Button>,
            ]);
          }}
        >
          add right content
        </button>
        --------------------------
        <BlockStack gap="200">
          <FlexBasis />
          <KnownWidths />
          <ShitExample />
          <AnimatedGrid />
        </BlockStack>
      </Page>
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
    <div style={{display: 'flex', gap: 8, width: '100%'}}>
      <span>
        <Icon source={SearchIcon} />
      </span>
      <input
        type="text"
        placeholder="Search"
        autoComplete="off"
        style={{width: '100%'}}
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
