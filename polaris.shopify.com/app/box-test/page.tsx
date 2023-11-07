import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <div>
      <h1>Hello, Cube test!</h1>
      {[...Array(1).keys()].map((id) => (
        <Cube key={id}>A cube</Cube>
      ))}
      <Cube display="flex" flexDirection="row" gap="20px">
        <Cube width="40px" padding="4px" backgroundColor="bg" />
        <Cube width="40px" padding="4px" backgroundColor="avatar-four-bg-fill">
          <Cube display="flex" flexDirection="column">
            <Cube height="40px" padding="4px" backgroundColor="#b2fba5" />
            <Cube height="40px" padding="4px" backgroundColor="#aa9499" />
          </Cube>
        </Cube>
      </Cube>
    </div>
  );
}
