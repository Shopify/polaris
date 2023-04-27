import {
  useSandpack,
  SandpackCodeEditor,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import lzString from 'lz-string';

function compressParams(code: Record<string, any>) {
  return lzString.compressToEncodedURIComponent(JSON.stringify(code));
}

const CustomIframe = () => {
  const {sandpack} = useSandpack();
  const {files} = sandpack;
  return (
    <iframe
      style={{
        width: '100%',
      }}
      title="embedded-sandpack"
      src={`/sandpack-two?files=${compressParams(files)}`}
    />
  );
};

export default function SandpackFrame() {
  return (
    <SandpackProvider template="react">
      <CustomIframe />
      <SandpackCodeEditor />
    </SandpackProvider>
  );
}
