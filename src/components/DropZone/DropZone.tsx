import * as React from 'react';
import * as PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind, debounce} from '@shopify/javascript-utilities/decorators';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

import Icon from '../Icon';
import Stack from '../Stack';
import Caption from '../Caption';
import DisplayText from '../DisplayText';
import VisuallyHidden from '../VisuallyHidden';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import FileUpload from './components/FileUpload/';

import IconDragDrop from './icons/drag-drop.svg';
import IconAlertCircle from './icons/alert-circle.svg';

import {fileAccepted, getDataTransferFiles} from './utils';
import {DropZoneContext} from './types';

import * as styles from './DropZone.scss';

export type Type = 'file' | 'image';

export interface State {
  size: string;
  type: string;
  error?: boolean;
  dragging: boolean;
  overlayText?: string;
  errorOverlayText?: string;
}

export interface Props {
  /** Allowed file types */
  accept?: string;
  /**
   * Whether is a file or an image
   * @default 'file'
   */
  type?: Type;
  /** Sets an active state */
  active?: boolean;
  /** Sets an error state */
  error?: boolean;
  /**
   * Displays an outline border
   * @default true
   */
  outline?: boolean;
  /**
   * Displays an overlay on hover
   * @default true
   */
  overlay?: boolean;
  /** Text that appears in the overlay */
  overlayText?: string;
  /** Text that appears in the overlay when set in error state */
  errorOverlayText?: string;
  /**
   * Allows multiple files to be uploaded
   * @default true
   */
  allowMultiple?: boolean;
  /** Sets a disabled state */
  disabled?: boolean;
  /** The child elements to render in the dropzone. */
  children?: string | React.ReactNode;
  /** Allows a file to be dropped anywhere on the page */
  dropOnPage?: boolean;
  /** Adds custom validations */
  customValidator?(file: File): boolean;
  /** Callback triggered on click */
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  /** Callback triggered on any file drop */
  onDrop?(files: File[], acceptedFiles: File[], rejectedFiles: File[]): void;
  /** Callback triggered when at least one of the files dropped was accepted */
  onDropAccepted?(acceptedFiles: File[]): void;
  /** Callback triggered when at least one of the files dropped was rejected */
  onDropRejected?(rejectedFiles: File[]): void;
  /** Callback triggered when one or more files are dragging over the drag area */
  onDragOver?(): void;
  /** Callback triggered when one or more files entered the drag area */
  onDragEnter?(): void;
  /** Callback triggered when one or more files left the drag area */
  onDragLeave?(): void;
  /** Public method to trigger the default file picker */
  open?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class DropZone extends React.Component<CombinedProps, State> {
  public static FileUpload: any = FileUpload;
  public static childContextTypes = {
    size: PropTypes.string,
    type: PropTypes.string,
  };
  public static defaultProps: Partial<CombinedProps> = {
    type: 'file',
    outline: true,
    overlay: true,
    allowMultiple: true,
  };

  context: Partial<DropZoneContext>;

  private node: HTMLElement | null = null;
  private dropNode: HTMLElement | HTMLDocument | null = null;
  private dragTargets: EventTarget[] = [];
  private fileInputNode: HTMLInputElement;

  constructor(props: CombinedProps) {
    super(props);

    const {type = 'file'} = props;
    const {polaris: {intl: {translate}}} = props;
    const suffix = capitalize(type);

    this.state = {
      type,
      size: 'large',
      dragging: false,
      error: false,
      overlayText: translate(`Polaris.DropZone.overlayText${suffix}`),
      errorOverlayText: translate(`Polaris.DropZone.errorOverlayText${suffix}`),
    };
  }

  getChildContext(): DropZoneContext {
    return {
      size: this.state.size,
      type: this.state.type,
    };
  }

  updateStateFromProps(props: CombinedProps) {
    const {error, type, overlayText, errorOverlayText} = this.state;

    if (error !== props.error) {
      this.setState({error: props.error});
    }

    if (props.type && type !== props.type) {
      this.setState({type: props.type});
    }

    if (props.overlayText && overlayText !== props.overlayText) {
      this.setState({overlayText: props.overlayText});
    }

    if (props.errorOverlayText && errorOverlayText !== props.errorOverlayText) {
      this.setState({errorOverlayText: props.errorOverlayText});
    }
  }

  componentWillReceiveProps(props: CombinedProps) {
    this.updateStateFromProps(props);
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  render() {
    const {dragging, error, size, overlayText, errorOverlayText} = this.state;
    const {
      children,
      disabled,
      outline,
      accept,
      active,
      overlay,
      allowMultiple,
    } = this.props;

    const inputAttributes: object = {
      accept,
      disabled,
      type: 'file',
      multiple: allowMultiple,
      ref: this.setInputNode,
      onChange: this.handleDrop,
      autoComplete: 'off',
    };

    const classes = classNames(
      styles.DropZone,
      outline && styles.hasOutline,
      (active || dragging) && styles.isDragging,
      error && styles.hasError,
      size && size === 'large' && styles.sizeLarge,
      size && size === 'medium' && styles.sizeMedium,
      size && size === 'small' && styles.sizeSmall,
    );

    const dragOverlay =
      (active || dragging) && !error && overlay ? (
        <div className={styles.Overlay}>
          <Stack vertical spacing="tight">
            <Icon source={IconDragDrop} color="indigo" />
            {size === 'large' && (
              <DisplayText size="small" element="p">
                {overlayText}
              </DisplayText>
            )}
            {size === 'medium' && <Caption>{overlayText}</Caption>}
          </Stack>
        </div>
      ) : null;

    const dragErrorOverlay =
      dragging && error ? (
        <div className={styles.Overlay}>
          <Stack vertical spacing="tight">
            <Icon source={IconAlertCircle} color="red" />
            {size === 'large' && (
              <DisplayText size="small" element="p">
                {errorOverlayText}
              </DisplayText>
            )}
            {size === 'medium' && <Caption>{errorOverlayText}</Caption>}
          </Stack>
        </div>
      ) : null;

    return (
      <div
        ref={this.setNode}
        className={classes}
        aria-disabled={disabled}
        onClick={this.handleClick}
        onDragStart={handleDragStart}
      >
        {dragOverlay}
        {dragErrorOverlay}
        <div className={styles.Container}>{children}</div>
        <VisuallyHidden>
          <input {...inputAttributes} />
        </VisuallyHidden>
      </div>
    );
  }

  componentDidMount() {
    this.dragTargets = [];
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({error: this.props.error});

    if (!this.dropNode) {
      return;
    }

    addEventListener(this.dropNode, 'drop', this.handleDrop);
    addEventListener(this.dropNode, 'dragover', this.handleDragOver);
    addEventListener(this.dropNode, 'dragenter', this.handleDragEnter);
    addEventListener(this.dropNode, 'dragleave', this.handleDragLeave);
    addEventListener(window, 'resize', this.adjustSize);
  }

  componentWillUnmount() {
    if (!this.dropNode) {
      return;
    }

    removeEventListener(this.dropNode, 'drop', this.handleDrop);
    removeEventListener(this.dropNode, 'dragover', this.handleDragOver);
    removeEventListener(this.dropNode, 'dragenter', this.handleDragEnter);
    removeEventListener(this.dropNode, 'dragleave', this.handleDragLeave);
    removeEventListener(window, 'resize', this.adjustSize);
  }

  @autobind
  public open() {
    this.fileInputNode.click();
  }

  @autobind
  @debounce(50, {trailing: true})
  private adjustSize() {
    if (!this.node) {
      return;
    }

    let size = 'large';
    const width = this.node.getBoundingClientRect().width;

    if (width < 114) {
      size = 'small';
    } else if (width < 300) {
      size = 'medium';
    }

    this.setState({size});
  }

  @autobind
  private getValidatedFiles(files: File[] | DataTransferItem[]) {
    const {accept, allowMultiple, customValidator} = this.props;

    const acceptedFiles: File[] = [];
    const rejectedFiles: File[] = [];

    Array.from(files as File[]).forEach((file: File) => {
      if (
        !fileAccepted(file, accept) ||
        (customValidator && !customValidator(file))
      ) {
        rejectedFiles.push(file);
      } else {
        acceptedFiles.push(file);
      }
    });

    if (!allowMultiple) {
      acceptedFiles.splice(1, acceptedFiles.length);
      rejectedFiles.push(...acceptedFiles.slice(1));
    }

    return {
      files,
      acceptedFiles,
      rejectedFiles,
    };
  }

  @autobind
  private setNode(node: HTMLElement | null) {
    const {dropOnPage} = this.props;

    this.node = node;
    this.dropNode = dropOnPage ? document : node;

    this.adjustSize();
  }

  @autobind
  private setInputNode(node: HTMLInputElement) {
    this.fileInputNode = node;
  }

  @autobind
  private handleClick(event: React.MouseEvent<HTMLElement>) {
    const {onClick, disabled} = this.props;

    if (disabled) {
      return;
    }

    return onClick ? onClick(event) : this.open();
  }

  @autobind
  private handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const {disabled, onDrop, onDropAccepted, onDropRejected} = this.props;

    if (disabled) {
      return;
    }

    const fileList = getDataTransferFiles(event);

    const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(
      fileList,
    );

    this.dragTargets = [];

    this.setState({dragging: false, error: rejectedFiles.length > 0});

    if (onDrop) {
      onDrop(files as File[], acceptedFiles, rejectedFiles);
    }

    if (onDropAccepted && acceptedFiles.length) {
      onDropAccepted(acceptedFiles);
    }

    if (onDropRejected && rejectedFiles.length) {
      onDropRejected(rejectedFiles);
    }
  }

  @autobind
  private handleDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const {dragging} = this.state;
    const {disabled, onDragEnter} = this.props;

    if (disabled) {
      return;
    }

    const fileList = getDataTransferFiles(event);

    if (event.target && this.dragTargets.indexOf(event.target) === -1) {
      this.dragTargets.push(event.target);
    }

    if (dragging) {
      return false;
    }

    const {rejectedFiles} = this.getValidatedFiles(fileList);

    this.setState({dragging: true, error: rejectedFiles.length > 0});

    if (onDragEnter) {
      onDragEnter();
    }
  }

  @autobind
  private handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const {disabled, onDragOver} = this.props;

    if (disabled) {
      return;
    }

    if (onDragOver) {
      onDragOver();
    }

    return false;
  }

  @autobind
  private handleDragLeave(event: DragEvent) {
    event.preventDefault();

    const {disabled, onDragLeave} = this.props;

    if (disabled) {
      return;
    }

    this.dragTargets = this.dragTargets.filter((el: Node) => {
      return el !== event.target && this.dropNode && this.dropNode.contains(el);
    });

    if (this.dragTargets.length > 0) {
      return;
    }

    this.setState({dragging: false, error: false});

    if (onDragLeave) {
      onDragLeave();
    }
  }
}

function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  event.stopPropagation();
}

export default withAppProvider<Props>()(DropZone);
