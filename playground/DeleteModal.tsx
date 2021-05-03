import React, {useRef} from 'react';

import {Modal, TextStyle} from '../src';
// import {withI18n, WithI18nProps} from '@shopify/react-i18n';
// import compose from '@shopify/react-compose';

export interface Props {
  // activatorButton?: HTMLElement | null;
  activator?: React.RefObject<HTMLElement> | React.ReactElement;
  title: string;
  open: boolean;
  loading: boolean;
  onClose(): void;
  onDelete(): void;
  resourceName: string;
}

export function DeleteModal(props: Props) {
  const {
    // activatorButton,
    activator,
    title,
    open,
    onClose,
    onDelete,
    loading,
    resourceName,
  } = props;

  // console.log('DeleteModal activatorButton!', activatorButton);
  // forceUpdate();

  // useEffect(() => {}, [activatorButton]);

  // const activator = useRef<HTMLElement>(null);

  // console.log('activator in DeleteModal', activator);
  // setTimeout(() => {
  //   console.log('DeleteModal activator delayed', activator);
  // }, 5000);

  return (
    <Modal
      activator={activator}
      title={title}
      open={open}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
        {
          content: resourceName,
          onAction: onDelete,
          loading,
          destructive: true,
        },
      ]}
      onClose={onClose}
    >
      <Modal.Section>{title}</Modal.Section>
    </Modal>
  );
}

// export default DeleteModal;
