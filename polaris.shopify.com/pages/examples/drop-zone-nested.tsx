import {
  DropZone,
  LegacyStack,
  Thumbnail,
  LegacyCard,
  Text,
} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NestedDropZoneExample() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((dropFiles: File[]) => {
    setFiles((files) => [...files, ...dropFiles]);
  }, []);

  const handleDropZoneClick = useCallback(() => {}, []);

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
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
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  return (
    <DropZone outline={false} onDrop={handleDrop}>
      <LegacyCard sectioned>
        <DropZone onClick={handleDropZoneClick}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </LegacyCard>
    </DropZone>
  );
}

export default withPolarisExample(NestedDropZoneExample);
