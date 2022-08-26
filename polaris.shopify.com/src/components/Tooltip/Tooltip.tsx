import {cloneElement, useState} from 'react';
import {
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from '@floating-ui/react-dom-interactions';
import styles from './Tooltip.module.scss';

interface Props {
  ariaLabel: string;
  renderContent: () => React.ReactNode;
  children: JSX.Element;
}

export const Tooltip = ({children, ariaLabel, renderContent}: Props) => {
  const [open, setOpen] = useState(false);

  const {x, y, reference, floating, strategy, context, placement} = useFloating(
    {
      placement: 'top',
      open,
      onOpenChange: setOpen,
      middleware: [offset(5), flip(), shift({padding: 8})],
      whileElementsMounted: autoUpdate,
    },
  );

  const {getReferenceProps, getFloatingProps} = useInteractions([
    useHover(context, {move: false}),
    useFocus(context),
    useRole(context, {role: 'tooltip'}),
    useDismiss(context, {referencePress: true}),
  ]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ref: reference, ...children.props}),
      )}
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            className: styles.Tooltip,
            style: {
              position: strategy,
              top: y ?? '',
              left: x ?? '',
            },
          })}
          data-placement={placement}
          aria-label={ariaLabel}
        >
          <div className={styles.Content}>{renderContent()}</div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
