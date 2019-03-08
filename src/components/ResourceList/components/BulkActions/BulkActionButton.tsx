import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {classNames} from '@shopify/react-utilities';
import {DisableableAction, Icon, UnstyledLink} from '@shopify/polaris';

import * as styles from './BulkActions.scss';

export type Props = {
  disclosure?: boolean;
  handleMeasurement?(width: number): void;
} & DisableableAction;

export default class BulkActionButton extends React.PureComponent<
  Props,
  never
> {
  componentDidMount() {
    const {handleMeasurement} = this.props;
    if (handleMeasurement) {
      const bulkActionButtonNode = findDOMNode(this);
      const width =
        (bulkActionButtonNode instanceof Element &&
          bulkActionButtonNode.getBoundingClientRect().width) ||
        0;
      handleMeasurement(width);
    }
  }

  render() {
    const {
      url,
      external,
      onAction,
      content,
      disclosure,
      accessibilityLabel,
      disabled,
    } = this.props;

    const disclosureIconMarkup = disclosure ? (
      <span className={styles.ActionIcon}>
        <Icon source="caretDown" />
      </span>
    ) : null;

    const contentMarkup = disclosureIconMarkup ? (
      <span className={styles.ActionContent}>
        <span>{content}</span>
        {disclosureIconMarkup}
      </span>
    ) : (
      content
    );

    if (url) {
      return (
        <UnstyledLink
          external={external}
          url={url}
          className={styles.Button}
          aria-label={accessibilityLabel}
        >
          {contentMarkup}
        </UnstyledLink>
      );
    }

    const className = classNames(styles.Button, disabled && styles.disabled);

    return (
      <button
        type="button"
        className={className}
        onClick={onAction}
        aria-label={accessibilityLabel}
        disabled={disabled}
      >
        {contentMarkup}
      </button>
    );
  }
}
