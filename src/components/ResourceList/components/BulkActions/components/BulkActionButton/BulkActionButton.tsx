import React, {createRef} from 'react';
import {DisableableAction} from '../../../../../../types';
import {Button} from '../../../../../Button';
import styles from '../../BulkActions.scss';

export type BulkActionButtonProps = {
  disclosure?: boolean;
  handleMeasurement?(width: number): void;
} & DisableableAction;

export class BulkActionButton extends React.PureComponent<
  BulkActionButtonProps,
  never
> {
  private bulkActionButton = createRef<HTMLDivElement>();

  componentDidMount() {
    const {handleMeasurement} = this.props;
    if (handleMeasurement && this.bulkActionButton.current) {
      const width = this.bulkActionButton.current.getBoundingClientRect().width;
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

    return (
      <div className={styles.BulkActionButton} ref={this.bulkActionButton}>
        <Button
          external={external}
          url={url}
          aria-label={accessibilityLabel}
          onClick={onAction}
          disabled={disabled}
          disclosure={disclosure}
        >
          {content}
        </Button>
      </div>
    );
  }
}
