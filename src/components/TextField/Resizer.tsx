import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import EventListener from '../EventListener';
import * as styles from './TextField.scss';

export interface Props {
  contents?: string,
  currentHeight?: number | null,
  onHeightChange(height: number): void,
}

export default class Resizer extends React.PureComponent<Props, {}> {
  private resizer: HTMLElement;

  componentDidMount() {
    this.handleHeightCheck();

    if (process.env.NODE_ENV === 'development') {
      // We need to defer the calculation in development so the
      // styles have time to be injected.
      setTimeout(this.handleHeightCheck, 0);
    }
  }

  componentDidUpdate() {
    this.handleHeightCheck();
  }

  render() {
    const {contents} = this.props;

    return (
      <div
        aria-hidden
        className={styles.Resizer}
        ref={this.setResizer}
      >
        <EventListener event="resize" handler={this.handleHeightCheck} />
        <div
          className={styles.DummyInput}
          dangerouslySetInnerHTML={{__html: getFinalContents(contents)}}
        />
      </div>
    );
  }

  @autobind
  private handleHeightCheck() {
    const newHeight = this.resizer.scrollHeight;
    const {currentHeight} = this.props;

    if (newHeight !== currentHeight) {
      this.props.onHeightChange(newHeight);
      this.setState({height: this.resizer.scrollHeight});
    }
  }

  @autobind
  private setResizer(node: HTMLElement) {
    this.resizer = node;
  }
}

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
};

const REPLACE_REGEX = /[\n&<>]/g;

function replaceEntity(entity: keyof typeof ENTITIES_TO_REPLACE) {
  return ENTITIES_TO_REPLACE[entity] || entity;
}

function getFinalContents(contents?: string) {
  return contents
    ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
    : '<br>';
}
