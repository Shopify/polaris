import { AppProvider, Stack,Thumbnail,Caption,DropZone,Page } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import { useState,useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
function DropZoneWithDropOnPageExample() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const uploadMessage = !uploadedFiles && <DropZone.FileUpload />;

  return (
    <Page
      breadcrumbs={[{content: 'Products'}]}
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <DropZone dropOnPage onDrop={handleDropZoneDrop}>
        {uploadedFiles}
        {uploadMessage}
      </DropZone>
    </Page>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <DropZoneWithDropOnPageExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    