import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import debounce from 'lodash/debounce';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {
  DragDropMajorMonotone,
  CircleAlertMajorMonotone,
} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {capitalize} from '../../utilities/capitalize';
import {Icon} from '../Icon';
import {Stack} from '../Stack';
import {Caption} from '../Caption';
import {DisplayText} from '../DisplayText';
import {VisuallyHidden} from '../VisuallyHidden';
import {Labelled, Action} from '../Labelled';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';

import {FileUpload} from './components';
import {DropZoneContext} from './context';

import {fileAccepted, getDataTransferFiles} from './utils';

import styles from './DropZone.scss';

export type Type = 'file' | 'image';

interface State {
  id: string;
  dragging: boolean;
  error?: boolean;
  errorOverlayText?: string;
  focused: boolean;
  numFiles: number;
  overlayText?: string;
  size: string;
  measuring: boolean;
  type?: string;
}

export interface DropZoneProps {
  /** Label for the file input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for file input */
  id?: string;
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
  /** Sets the default file dialog state */
  openFileDialog?: boolean;
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
  /** Callback triggered when the file dialog is canceled */
  onFileDialogClose?(): void;
}

type CombinedProps = DropZoneProps & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('DropZone');

class DropZone extends React.Component<CombinedProps, State> {
  public static FileUpload: typeof FileUpload = FileUpload;
  public static defaultProps: Partial<CombinedProps> = {
    type: 'file',
    outline: true,
    overlay: true,
    allowMultiple: true,
  };

  static getDerivedStateFromProps(nextProps: CombinedProps, prevState: State) {
    const {id, error, type, overlayText, errorOverlayText} = prevState;
    const newState: any = {};

    if (nextProps.id != null && id !== nextProps.id) {
      newState.id = nextProps.id || id;
    }

    if (nextProps.error != null && error !== nextProps.error) {
      newState.error = nextProps.error;
    }

    if (nextProps.type != null && type !== nextProps.type) {
      newState.type = nextProps.type;
    }

    if (
      nextProps.overlayText != null &&
      overlayText !== nextProps.overlayText
    ) {
      newState.overlayText = nextProps.overlayText;
    }

    if (
      nextProps.errorOverlayText != null &&
      errorOverlayText !== nextProps.errorOverlayText
    ) {
      newState.errorOverlayText = nextProps.errorOverlayText;
    }

    return Object.keys(newState).length ? newState : null;
  }

  private node = React.createRef<HTMLDivElement>();
  private dragTargets: EventTarget[] = [];
  private fileInputNode = React.createRef<HTMLInputElement>();

  private adjustSize = debounce(
    () => {
      if (!this.node.current) {
        return;
      }

      let size = 'extraLarge';
      const width = this.node.current.getBoundingClientRect().width;

      if (width < 100) {
        size = 'small';
      } else if (width < 160) {
        size = 'medium';
      } else if (width < 300) {
        size = 'large';
      }

      this.setState({
        size,
        measuring: false,
      });
    },
    50,
    {trailing: true},
  );

  constructor(props: CombinedProps) {
    super(props);

    const {
      polaris: {intl},
      type,
    } = props;
    const suffix = capitalize(type);

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      id: props.id || getUniqueID(),
      dragging: false,
      error: false,
      errorOverlayText: intl.translate(
        `Polaris.DropZone.errorOverlayText${suffix}`,
      ),
      focused: false,
      numFiles: 0,
      overlayText: intl.translate(`Polaris.DropZone.overlayText${suffix}`),
      size: 'extraLarge',
      measuring: true,
      type,
    };
  }

  get dropNode() {
    return this.props.dropOnPage ? document : this.node.current;
  }

  render() {
    const {
      id,
      dragging,
      focused,
      error,
      size,
      type,
      overlayText,
      errorOverlayText,
      measuring,
    } = this.state;
    const {
      label,
      labelAction,
      labelHidden,
      children,
      disabled = false,
      outline,
      accept,
      active,
      overlay,
      allowMultiple,
      polaris: {intl},
    } = this.props;

    const inputAttributes: object = {
      id,
      accept,
      disabled,
      type: 'file',
      multiple: allowMultiple,
      ref: this.fileInputNode,
      onChange: this.handleDrop,
      autoComplete: 'off',
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const classes = classNames(
      styles.DropZone,
      outline && styles.hasOutline,
      focused && styles.focused,
      (active || dragging) && styles.isDragging,
      disabled && styles.isDisabled,
      error && styles.hasError,
      size && size === 'extraLarge' && styles.sizeExtraLarge,
      size && size === 'large' && styles.sizeLarge,
      size && size === 'medium' && styles.sizeMedium,
      size && size === 'small' && styles.sizeSmall,
      measuring && styles.measuring,
    );

    const dragOverlay =
      (active || dragging) && !error && overlay ? (
        <div className={styles.Overlay}>
          <Stack vertical spacing="tight">
            <Icon source={DragDropMajorMonotone} color="indigo" />
            {size === 'extraLarge' && (
              <DisplayText size="small" element="p">
                {overlayText}
              </DisplayText>
            )}
            {(size === 'medium' || size === 'large') && (
              <Caption>{overlayText}</Caption>
            )}
          </Stack>
        </div>
      ) : null;

    const dragErrorOverlay =
      dragging && error ? (
        <div className={styles.Overlay}>
          <Stack vertical spacing="tight">
            <Icon source={CircleAlertMajorMonotone} color="red" />
            {size === 'extraLarge' && (
              <DisplayText size="small" element="p">
                {errorOverlayText}
              </DisplayText>
            )}
            {(size === 'medium' || size === 'large') && (
              <Caption>{errorOverlayText}</Caption>
            )}
          </Stack>
        </div>
      ) : null;

    const labelValue = label
      ? label
      : intl.translate('Polaris.DropZone.FileUpload.label');
    const labelHiddenValue = label ? labelHidden : true;

    const context = {
      disabled,
      focused,
      size,
      type: type || 'file',
      measuring,
    };

    return (
      <DropZoneContext.Provider value={context}>
        <Labelled
          id={id}
          label={labelValue}
          action={labelAction}
          labelHidden={labelHiddenValue}
        >
          <div
            ref={this.node}
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
        </Labelled>
      </DropZoneContext.Provider>
    );
  }

  componentDidMount() {
    this.dragTargets = [];

    this.setState({error: this.props.error});

    if (!this.dropNode) {
      return;
    }

    addEventListener(this.dropNode, 'drop', this.handleDrop);
    addEventListener(this.dropNode, 'dragover', this.handleDragOver);
    addEventListener(this.dropNode, 'dragenter', this.handleDragEnter);
    addEventListener(this.dropNode, 'dragleave', this.handleDragLeave);
    addEventListener(window, 'resize', this.adjustSize);

    this.adjustSize();

    if (this.props.openFileDialog) {
      this.triggerFileDialog();
    }
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

  componentDidUpdate() {
    if (this.props.openFileDialog) {
      this.triggerFileDialog();
    }
  }

  private triggerFileDialog = () => {
    this.open();

    if (this.props.onFileDialogClose) {
      this.props.onFileDialogClose();
    }
  };

  private open = () => {
    if (!this.fileInputNode.current) {
      return;
    }

    this.fileInputNode.current.click();
  };

  private getValidatedFiles = (files: File[] | DataTransferItem[]) => {
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
  };

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const {numFiles} = this.state;
    const {onClick, disabled, allowMultiple} = this.props;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }

    return onClick ? onClick(event) : this.open();
  };

  private handleFocus = () => {
    this.setState({focused: true});
  };

  private handleBlur = () => {
    this.setState({focused: false});
  };

  private handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      disabled,
      onDrop,
      onDropAccepted,
      onDropRejected,
      allowMultiple,
    } = this.props;
    const {numFiles} = this.state;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }

    const fileList = getDataTransferFiles(event);

    const {files, acceptedFiles, rejectedFiles} = this.getValidatedFiles(
      fileList,
    );

    this.dragTargets = [];

    this.setState((prev) => ({
      dragging: false,
      error: rejectedFiles.length > 0,
      numFiles: prev.numFiles + acceptedFiles.length,
    }));

    if (onDrop) {
      onDrop(files as File[], acceptedFiles, rejectedFiles);
    }

    if (onDropAccepted && acceptedFiles.length) {
      onDropAccepted(acceptedFiles);
    }

    if (onDropRejected && rejectedFiles.length) {
      onDropRejected(rejectedFiles);
    }
    (event.target as HTMLInputElement).value = '';
  };

  private handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const {dragging, numFiles} = this.state;
    const {disabled, onDragEnter, allowMultiple} = this.props;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }

    const fileList = getDataTransferFiles(event);

    if (event.target && !this.dragTargets.includes(event.target)) {
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
  };

  private handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const {numFiles} = this.state;
    const {disabled, onDragOver, allowMultiple} = this.props;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }

    if (onDragOver) {
      onDragOver();
    }

    return false;
  };

  private handleDragLeave = (event: DragEvent) => {
    event.preventDefault();

    const {numFiles} = this.state;
    const {disabled, onDragLeave, allowMultiple} = this.props;

    if (disabled || (!allowMultiple && numFiles > 0)) {
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
  };
}

function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  event.stopPropagation();
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<DropZoneProps>()(DropZone);
