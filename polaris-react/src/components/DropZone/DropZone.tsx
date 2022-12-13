import React, {
  createRef,
  useState,
  useRef,
  useCallback,
  FunctionComponent,
  useMemo,
  useEffect,
  Component,
} from 'react';
import {UploadMajor, CircleAlertMajor} from '@shopify/polaris-icons';

import {debounce} from '../../utilities/debounce';
import {classNames, variationName} from '../../utilities/css';
import {capitalize} from '../../utilities/capitalize';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Labelled, LabelledProps} from '../Labelled';
import {useI18n} from '../../utilities/i18n';
import {isServer} from '../../utilities/target';
import {useUniqueId} from '../../utilities/unique-id';
import {useComponentDidMount} from '../../utilities/use-component-did-mount';
import {useToggle} from '../../utilities/use-toggle';
import {Box} from '../Box';
import {AlphaStack} from '../AlphaStack';

import {FileUpload} from './components';
import {DropZoneContext} from './context';
import {
  fileAccepted,
  getDataTransferFiles,
  defaultAllowMultiple,
  createAllowMultipleKey,
} from './utils';
import styles from './DropZone.scss';

export type DropZoneFileType = 'file' | 'image' | 'video';

export interface DropZoneProps {
  /** Label for the file input */
  label?: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
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
  type?: DropZoneFileType;
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
   * Allows multiple files to be uploaded at once
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
  /** Allows child content to adjust height */
  variableHeight?: boolean;
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

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const DropZone: React.FunctionComponent<DropZoneProps> & {
  FileUpload: typeof FileUpload;
} = function DropZone({
  dropOnPage,
  label,
  labelAction,
  labelHidden,
  children,
  disabled = false,
  outline = true,
  accept,
  active,
  overlay = true,
  allowMultiple = defaultAllowMultiple,
  overlayText,
  errorOverlayText,
  id: idProp,
  type = 'file',
  onClick,
  error,
  openFileDialog,
  variableHeight,
  onFileDialogClose,
  customValidator,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onDragEnter,
  onDragOver,
  onDragLeave,
}: DropZoneProps) {
  const node = useRef<HTMLDivElement>(null);
  const dragTargets = useRef<EventTarget[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adjustSize = useCallback(
    debounce(
      () => {
        if (!node.current) {
          return;
        }
        if (variableHeight) {
          setMeasuring(false);
          return;
        }

        let size = 'large';
        const width = node.current.getBoundingClientRect().width;

        if (width < 100) {
          size = 'small';
        } else if (width < 160) {
          size = 'medium';
        }

        setSize(size);
        measuring && setMeasuring(false);
      },
      50,
      {trailing: true},
    ),
    [],
  );

  const [dragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useToggle(false);
  const [size, setSize] = useState('large');
  const [measuring, setMeasuring] = useState(true);

  const i18n = useI18n();

  const getValidatedFiles = useCallback(
    (files: File[] | DataTransferItem[]) => {
      const acceptedFiles: File[] = [];
      const rejectedFiles: File[] = [];

      Array.from(files as File[]).forEach((file: File) => {
        !fileAccepted(file, accept) ||
        (customValidator && !customValidator(file))
          ? rejectedFiles.push(file)
          : acceptedFiles.push(file);
      });

      if (!allowMultiple) {
        acceptedFiles.splice(1, acceptedFiles.length);
        rejectedFiles.push(...acceptedFiles.slice(1));
      }

      return {files, acceptedFiles, rejectedFiles};
    },
    [accept, allowMultiple, customValidator],
  );

  const handleDrop = useCallback(
    (event: DragEvent) => {
      stopEvent(event);
      if (disabled) return;

      const fileList = getDataTransferFiles(event);

      const {files, acceptedFiles, rejectedFiles} = getValidatedFiles(fileList);

      dragTargets.current = [];

      setDragging(false);
      setInternalError(rejectedFiles.length > 0);

      onDrop && onDrop(files as File[], acceptedFiles, rejectedFiles);
      onDropAccepted && acceptedFiles.length && onDropAccepted(acceptedFiles);
      onDropRejected && rejectedFiles.length && onDropRejected(rejectedFiles);

      (event.target as HTMLInputElement).value = '';
    },
    [disabled, getValidatedFiles, onDrop, onDropAccepted, onDropRejected],
  );

  const handleDragEnter = useCallback(
    (event: DragEvent) => {
      stopEvent(event);
      if (disabled) return;

      const fileList = getDataTransferFiles(event);

      if (event.target && !dragTargets.current.includes(event.target)) {
        dragTargets.current.push(event.target);
      }

      if (dragging) return;

      const {rejectedFiles} = getValidatedFiles(fileList);

      setDragging(true);
      setInternalError(rejectedFiles.length > 0);

      onDragEnter && onDragEnter();
    },
    [disabled, dragging, getValidatedFiles, onDragEnter],
  );

  const handleDragOver = useCallback(
    (event: DragEvent) => {
      stopEvent(event);
      if (disabled) return;
      onDragOver && onDragOver();
    },
    [disabled, onDragOver],
  );

  const handleDragLeave = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (disabled) return;

      dragTargets.current = dragTargets.current.filter((el: Node) => {
        const compareNode = dropOnPage && !isServer ? document : node.current;

        return el !== event.target && compareNode && compareNode.contains(el);
      });

      if (dragTargets.current.length > 0) return;

      setDragging(false);
      setInternalError(false);

      onDragLeave && onDragLeave();
    },
    [dropOnPage, disabled, onDragLeave],
  );

  useEffect(() => {
    const dropNode = dropOnPage ? document : node.current;

    if (!dropNode) return;

    dropNode.addEventListener('drop', handleDrop);
    dropNode.addEventListener('dragover', handleDragOver);
    dropNode.addEventListener('dragenter', handleDragEnter);
    dropNode.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('resize', adjustSize);

    return () => {
      dropNode.removeEventListener('drop', handleDrop);
      dropNode.removeEventListener('dragover', handleDragOver);
      dropNode.removeEventListener('dragenter', handleDragEnter);
      dropNode.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('resize', adjustSize);
    };
  }, [
    dropOnPage,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    adjustSize,
  ]);

  useComponentDidMount(() => {
    adjustSize();
  });

  const id = useUniqueId('DropZone', idProp);
  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);

  const overlayTextWithDefault =
    overlayText === undefined
      ? i18n.translate(
          `Polaris.DropZone.${allowMultipleKey}.overlayText${typeSuffix}`,
        )
      : overlayText;

  const errorOverlayTextWithDefault =
    errorOverlayText === undefined
      ? i18n.translate(`Polaris.DropZone.errorOverlayText${typeSuffix}`)
      : errorOverlayText;

  const labelValue =
    label ||
    i18n.translate(`Polaris.DropZone.${allowMultipleKey}.label${typeSuffix}`);
  const labelHiddenValue = label ? labelHidden : true;

  const inputAttributes = {
    id,
    accept,
    disabled,
    type: 'file' as const,
    multiple: allowMultiple,
    onChange: handleDrop,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const classes = classNames(
    styles.DropZone,
    outline && styles.hasOutline,
    focused && styles.focused,
    (active || dragging) && styles.isDragging,
    disabled && styles.isDisabled,
    (internalError || error) && styles.hasError,
    !variableHeight && styles[variationName('size', size)],
    measuring && styles.measuring,
  );

  const dragOverlay =
    (active || dragging) &&
    !internalError &&
    !error &&
    overlay &&
    overlayMarkup(UploadMajor, 'interactive', overlayTextWithDefault);

  const dragErrorOverlay =
    dragging &&
    (internalError || error) &&
    overlayMarkup(CircleAlertMajor, 'critical', errorOverlayTextWithDefault);

  const context = useMemo(
    () => ({
      disabled,
      focused,
      size,
      type: type || 'file',
      measuring,
      allowMultiple,
    }),
    [disabled, focused, measuring, size, type, allowMultiple],
  );

  return (
    <DropZoneContext.Provider value={context}>
      <Labelled
        id={id}
        label={labelValue}
        action={labelAction}
        labelHidden={labelHiddenValue}
      >
        <Box
          ref={node}
          aria-disabled={disabled}
          onClick={handleClick}
          onDragStart={stopEvent}
          background="surface"
          borderRadius="1"
          position="relative"
        >
          <div className={classes}>
            {dragOverlay}
            {dragErrorOverlay}
            <Text variant="bodySm" as="span" visuallyHidden>
              <DropZoneInput
                {...inputAttributes}
                openFileDialog={openFileDialog}
                onFileDialogClose={onFileDialogClose}
              />
            </Text>
            <div className={styles.Container}>{children}</div>
          </div>
        </Box>
      </Labelled>
    </DropZoneContext.Provider>
  );

  function overlayMarkup(
    icon: FunctionComponent,
    color: 'critical' | 'interactive',
    text: string,
  ) {
    return (
      <div className={styles.Overlay}>
        <AlphaStack gap="2">
          {size === 'small' && <Icon source={icon} color={color} />}
          {(size === 'medium' || size === 'large') && (
            <Text variant="bodySm" as="p" fontWeight="bold">
              {text}
            </Text>
          )}
        </AlphaStack>
      </div>
    );
  }

  function open() {
    const fileInputNode = node.current && node.current.querySelector(`#${id}`);
    fileInputNode &&
      fileInputNode instanceof HTMLElement &&
      fileInputNode.click();
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (disabled) return;

    return onClick ? onClick(event) : open();
  }
};

function stopEvent(event: DragEvent | React.DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}

DropZone.FileUpload = FileUpload;

interface DropZoneInputProps {
  id: string;
  accept?: string;
  disabled: boolean;
  type: DropZoneFileType;
  multiple: boolean;
  openFileDialog?: boolean;
  onChange(event: DragEvent | React.ChangeEvent<HTMLInputElement>): void;
  onFocus(): void;
  onBlur(): void;
  onFileDialogClose?(): void;
}

// Due to security reasons, browsers do not allow file inputs to be opened artificially.
// For example `useEffect(() => { ref.click() })`. Oddly enough react class-based components bi-pass this.
class DropZoneInput extends Component<DropZoneInputProps, never> {
  private fileInputNode = createRef<HTMLInputElement>();

  componentDidMount() {
    this.props.openFileDialog && this.triggerFileDialog();
  }

  componentDidUpdate() {
    this.props.openFileDialog && this.triggerFileDialog();
  }

  render() {
    const {openFileDialog, onFileDialogClose, ...inputProps} = this.props;

    return (
      <input {...inputProps} ref={this.fileInputNode} autoComplete="off" />
    );
  }

  private triggerFileDialog = () => {
    this.open();
    this.props.onFileDialogClose && this.props.onFileDialogClose();
  };

  private open = () => {
    if (!this.fileInputNode.current) return;
    this.fileInputNode.current.click();
  };
}
