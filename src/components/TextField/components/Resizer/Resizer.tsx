import React from 'react';
import {EventListener} from '../../../EventListener';
import styles from '../../TextField.scss';

export interface ResizerProps {
  contents?: string;
  currentHeight?: number | null;
  minimumLines?: number;
  onHeightChange(height: number): void;
}

export class Resizer extends React.PureComponent<ResizerProps, never> {
  private contentNode = React.createRef<HTMLDivElement>();
  private minimumLinesNode = React.createRef<HTMLDivElement>();
  private animationFrame: number | null = null;

  componentDidMount() {
    this.handleHeightCheck();
  }

  componentDidUpdate() {
    this.handleHeightCheck();
  }

  componentWillUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  render() {
    const {contents, minimumLines} = this.props;

    const minimumLinesMarkup = minimumLines ? (
      <div
        testID="MinimumLines"
        ref={this.minimumLinesNode}
        className={styles.DummyInput}
        dangerouslySetInnerHTML={{
          __html: getContentsForMinimumLines(minimumLines),
        }}
      />
    ) : null;

    return (
      <div testID="ResizerWrapper" aria-hidden className={styles.Resizer}>
        <EventListener event="resize" handler={this.handleHeightCheck} />
        <div
          testID="ContentsNode"
          ref={this.contentNode}
          className={styles.DummyInput}
          dangerouslySetInnerHTML={{__html: getFinalContents(contents)}}
        />
        {minimumLinesMarkup}
      </div>
    );
  }

  private handleHeightCheck = () => {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      const contentNode = this.contentNode.current;
      const minimumLinesNode = this.minimumLinesNode.current;

      if (!contentNode || !minimumLinesNode) {
        return;
      }

      const newHeight = Math.max(
        contentNode.offsetHeight,
        minimumLinesNode.offsetHeight,
      );
      const {currentHeight, onHeightChange} = this.props;

      if (newHeight !== currentHeight) {
        onHeightChange(newHeight);
      }
    });
  };
}

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
  '\r': '',
};

const REPLACE_REGEX = new RegExp(
  `[${Object.keys(ENTITIES_TO_REPLACE).join()}]`,
  'g',
);

function replaceEntity(entity: keyof typeof ENTITIES_TO_REPLACE) {
  return ENTITIES_TO_REPLACE[entity];
}

function getContentsForMinimumLines(minimumLines: number) {
  let content = '';

  for (let line = 0; line < minimumLines; line++) {
    content += '<br>';
  }

  return content;
}

function getFinalContents(contents?: string) {
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
}
