import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <div>
      <h1>Hello, Cube test!</h1>
      {[...Array(1).keys()].map((id) => (
        <Cube key={id}>A cube</Cube>
      ))}
      <Cube display="flex" flexDirection="row" rowGap="300">
        <Cube
          blockSize={{xs: '1000'}}
          paddingBlockStart="400"
          paddingBlockEnd="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          backgroundColor="bg-fill-critical"
        />
        <Cube
          inlineSize="100"
          paddingBlockStart="400"
          paddingBlockEnd="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
          backgroundColor="avatar-four-bg-fill"
        >
          <Cube display="flex" flexDirection="column">
            <Cube
              blockSize="1200"
              paddingBlockStart="400"
              paddingBlockEnd="400"
              paddingInlineStart="400"
              paddingInlineEnd="400"
              backgroundColor="backdrop-bg"
            />
            <Cube
              blockSize="800"
              paddingBlockStart="400"
              paddingBlockEnd="400"
              paddingInlineStart="400"
              paddingInlineEnd="400"
              backgroundColor="bg-fill-hover"
            />
          </Cube>
        </Cube>
      </Cube>
    </div>
  );
}
