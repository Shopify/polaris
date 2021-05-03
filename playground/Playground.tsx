import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {Button, Page, PageActions, Modal} from '../src';

import {DeleteModal} from './DeleteModal';

export function Playground() {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const pageActionsRef = useRef<HTMLDivElement>(null);
  // Define ref for primary action
  const saveRef = useRef<HTMLButtonElement>(null);
  // Define ref for secondary action
  // const deleteRef = useRef<HTMLButtonElement>(null);

  const [deleteButtonRef, setDeleteButtonRef] = useState<RefObject<
    HTMLButtonElement
  > | null>(null);
  const deleteBtnCallback = useCallback((element) => {
    // console.log('Yep we have a ref', element);
    // deleteRef.current = element;
    setDeleteButtonRef({current: element});
  }, []);
  // const empty = <></>;
  // const [deleteModal, setDeleteModal] = useState(empty);

  // const generateDeleteModal = () => {
  //   return (
  //     <DeleteModal
  //       activator={deleteRef}
  //       title="Delete moi"
  //       open={isDeleteModalVisible}
  //       loading={deleteInProgress}
  //       resourceName="URL Redirect"
  //       onClose={closeModal}
  //       onDelete={handleRedirectDelete}
  //     />
  //   );
  // };
  // useEffect(() => {
  //   console.log('Activator', deleteRef);
  //   const deleteModal = (
  //     <DeleteModal
  //       activator={deleteRef}
  //       title="Delete moi"
  //       open={isDeleteModalVisible}
  //       loading={deleteInProgress}
  //       resourceName="URL Redirect"
  //       onClose={closeModal}
  //       onDelete={handleRedirectDelete}
  //     />
  //   );
  //   setDeleteModal(deleteModal);
  // }, [deleteRef]);

  function closeModal() {
    // console.log('closeModal, got anything?', deleteRef.current);
    setDeleteModalVisible(false);
  }

  async function handleRedirectDelete() {
    setDeleteInProgress(true);
    setTimeout(() => {
      setDeleteInProgress(false);
      closeModal();
    }, 3000);
  }
  function submit() {
    console.log('Submit me');
  }

  const activatorJSX = (
    <Button
      onClick={() => {
        setCrapModalOpen(true);
      }}
    >
      Click Me
    </Button>
  );
  const [isCrapModalOpen, setCrapModalOpen] = useState(false);

  return (
    <Page title="Playground">
      <DeleteModal
        activator={deleteButtonRef}
        title="Delete moi"
        open={isDeleteModalVisible}
        loading={deleteInProgress}
        resourceName="URL Redirect"
        onClose={closeModal}
        onDelete={handleRedirectDelete}
      />
      <div ref={pageActionsRef}>
        <PageActions
          // primaryAction={{
          //   content: 'Save',
          //   disabled: false,
          //   onAction: submit,
          //   loading: false,
          //   // attempt to pass in ref
          // }}
          secondaryActions={[
            {
              content: 'Delete',
              outline: true,
              destructive: true,
              onAction: () => setDeleteModalVisible(true),
              ref: deleteBtnCallback,
            },
          ]}
        />
      </div>
      <Button>Text</Button>

      <Modal
        activator={activatorJSX}
        open={isCrapModalOpen}
        title="Craptastic"
        onClose={() => {
          setCrapModalOpen(false);
        }}
      />
    </Page>
  );
}

// Also eventually want to do for <Page {...pageProps}>
// pageProps.primaryAction = {
//   content: i18n.translate('RedirectList.createRedirect'),
//   url: url.redirectsNew(),
// };
// const importAction = useImportModal
//   ? {
//       content: i18n.translate('RedirectList.import'),
//       onAction: () => {
//         setImportModalOpen(true);
//       },
//     }
//   : {
//       content: i18n.translate('RedirectList.import'),
//       url: url.redirectsImportsNew(),
//     };
// pageProps.secondaryActions = [
//   {
//     content: i18n.translate('RedirectList.export'),
//     onAction: () => {
//       setExportModalVisible(true);
//     },
//   },
//   importAction,
// ];
