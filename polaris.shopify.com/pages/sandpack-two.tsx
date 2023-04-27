import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import lzString from 'lz-string';

function decompressParams(code: string) {
  try {
    const decompressedCode = lzString.decompressFromEncodedURIComponent(code);
    return decompressedCode ? JSON.parse(decompressedCode) : {};
  } catch (e) {
    console.error(e);
    return {};
  }
}

export default function SandpackEmbed() {
  const {query} = useRouter();
  const [files, setFiles] = useState(null);
  console.log(files);

  useEffect(() => {
    const {files: fileParam} = query;
    const files =
      typeof fileParam === 'string' ? decompressParams(fileParam) : null;
    setFiles(files);
  }, [query]);
  return (
    <SandpackProvider template="react" files={files || {}}>
      {/* SandpackPreview will load infinitely if its not rendered as a child of SandboxLayout
            https://github.com/codesandbox/sandpack/issues/851 */}
      <SandpackLayout>
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
