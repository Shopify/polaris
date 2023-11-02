import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <div>
      <h1>Hello, Cube test!</h1>
      {[...Array(1).keys()].map((id) => (
        <Cube key={id}>A cube</Cube>
      ))}
    </div>
  );
}
