import React, {RefObject, useCallback, useState} from 'react';

import {Page, PageActions} from '../src';

import {DeleteModal} from './DeleteModal';

export function Playground() {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);

  const [deleteButtonRef, setDeleteButtonRef] = useState<RefObject<
    HTMLButtonElement
  > | null>(null);
  const deleteBtnCallback = useCallback((element) => {
    setDeleteButtonRef({current: element});
  }, []);
  const [saveButtonRef, setSaveButtonRef] = useState<RefObject<
    HTMLButtonElement
  > | null>(null);
  const saveBtnCallback = useCallback((element) => {
    setSaveButtonRef({current: element});
  }, []);

  return (
    <Page title="Playground">
      <DeleteModal
        activator={deleteButtonRef ?? undefined}
        title="Delete me"
        open={isDeleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
        }}
      />
      <DeleteModal
        activator={saveButtonRef ?? undefined}
        title="Save me"
        open={isSaveModalVisible}
        onClose={() => {
          setSaveModalVisible(false);
        }}
      />
      <PageActions
        primaryAction={{
          content: 'Save',
          disabled: false,
          onAction: () => setSaveModalVisible(true),
          ref: saveBtnCallback,
        }}
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
