import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <div>
      <h1>Hello, Cube test!</h1>
      {[...Array(1).keys()].map((id) => (
        <Cube key={id}>A cube</Cube>
      ))}
      <Cube display="flex" flexDirection="column" gap="10px">
        <Cube height="40px" padding="4px" backgroundColor="#aaf0d1" />
        <Cube height="40px" padding="4px" backgroundColor="#ca9bf7">
          <Cube display="flex" flexDirection="column">
            <Cube height="40px" padding="4px" backgroundColor="#b2fba5" />
            <Cube height="40px" padding="4px" backgroundColor="#aa9499" />
          </Cube>
        </Cube>
      </Cube>
    </div>
  );
}
