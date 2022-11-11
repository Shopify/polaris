import {useEffect, useRef, useState} from 'react';
import {Tab} from '@headlessui/react';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import Button from '../../../../../src/components/Button';
import {useRouter} from 'next/router';

import SandboxContainer from '../../../../../src/components/SandboxContainer';

const codeExamples = [
  {
    name: 'Index skeleton page',
    code: 'N4Igxg9gJgpiBcIA8BlA1jANjALhAdgAoCGA5jAAQAOATgJYC2xNAngIJg50EB8AOvgoUkAGWIsIAVxz9BQ4WInSAdChidu%2BWfPlIAwsygUAzuq4EYUbTt3osuAgCFoLACowAHjgoB6azqQfAxorARthYKNTDQtQuXCkdy89AhxiOnwYGn9w4TtsPHwAETpjKkxxJO9jOgAvGABePhBjJkxMZt8chPyHfGcoN09vPzDcwKqU-DSMrO7hIMN5-UMTM01LeaFE4amZzOyx3LyMAoISsoqhrxM6xubW4nbO0fjx3sKB65GthcnU9IHZaLEI5QKKKQ4VTrXhHBTiSHQmKCaIEKDMFjLSK-FYhJHmLRwhL-aaAuZE96nPoXcqVYa3epNFptDogLoUnpUz4uKoUTCzYwNYAAJgAvuy3gkfCT9uTJboQVB8ZocZFlbD5QEPk4efT%2BZlBcAAIzi17HQJqtTI4HYim4qKSABGUEkmw5EUM6sJmt0MrJhx9Wq551KtO%2BDPuzKerIlxyD9m5g15%2BpghrFsbjE12ANmAfNiq9qs9VoJv222v6upuKbTppxBZLKrtirBPghKkbGu2bYR0lkgQrJHIPBAABoQDgABYwBiphAAbRAmAgYCeMHgMHwIAAuuOAO50KBT4wLgAsAE4AAzb0VAA',
  },
  {
    name: 'Detail view skeleton page',
    code: 'N4Igxg9gJgpiBcIA8BlA1jANjALhAdgAoCGA5jAAQ4CWO2AvADoiEBO0ArmDgM7MUAHVtQC2xVgE8Agt2oEAfI3wUKSADLEJEDjkXKVqjVp0A6FDFkKlBg0gDC4qBR4WaBGFD02bqDNjz4AELQEgAqMAAeOBQA9F7eSDEOrJ7WCclOLpb4HlS0DMwAkmLkfCDx3qroWLgEwVBhkdFxaT5JjhW2Gc6ucjlONHQwTCAAauLUxPi8zJ0%2B1f51IeFRsXOq7SmdiUbaOGa9Vvoq6pp7B9k9kPhQ4hLr9o55QyMoxNg8FGAAFlM5mGV1icMhc3PggbYFrUgssmhRMNQcjx6MAAEwAXzWrQSmygoL6EMeKXxR0q8z80PqjVWCKRKIAjJiWsccSDzNkHriHt1BgUQAB5VikKbUABexDB-B4HAARlAOB5CWzDuDsZVfDUAlSVtFaTBkWimYTcSTVSyfMqOWqElCtbCaYj9SiMVjzbYTeywZyMtsYrtTJ6CWkdmcdHpEraCCRyPIQAAaEA4b4wET6hAAbRAmAgYHeMHgMHwIAAugmAO7UKBJngZgAsAE4AAzF9FAA',
  },
  {
    name: 'Generic skeleton page',
    code: 'N4IgLgFgpgtlDOIBcBtEAbA9gYwIbqiSgDsQBdAGhAHcBLAE0kVQBYBOABjIF8g',
  },
];

export default function LoadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [codeExample, setCodeExample] = useState(codeExamples[0]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const searchValue = useRef('');

  useEffect(() => {
    /**
     * We want to mirror the iframes url in the parent (aka browser) to support URL sharing.
     * the iframes onload handler isn't invoked when the iframes url changes so we're polling here instead.
     */
    const iframeUrlPoll = setInterval(() => {
      if (
        iframeRef?.current?.contentWindow &&
        iframeRef.current.contentWindow.location.search !== searchValue.current
      ) {
        searchValue.current = iframeRef.current.contentWindow.location.search;
        const iframeQueryObj = Object.fromEntries(
          new URLSearchParams(searchValue.current),
        );

        console.log(iframeQueryObj);
      }
    }, 200);
    return () => clearInterval(iframeUrlPoll);
  }, [router]);

  return (
    <Page title="Navigating to a new page">
      <div>Status: Great</div>
      <a href="#">GitHub discussions</a>
      <Longform>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <Tab.List>
            <div className={styles.ExamplesList} id="examples">
              <Tab key="UX">
                <span>UX</span>
              </Tab>
              <Tab key="BUILD">
                <span>BUILD</span>
              </Tab>
              <Tab key="SHOWCASE">
                <span>SHOWCASE</span>
              </Tab>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <Markdown
                  text={`
## Merchant insight

Merchants typically have a specific goal in mind when navigating to a new page. The loading experience should provide an accurate preview of the page, so that merchants can anticipate what’s to come and stay focused on the goal.
                  `}
                />
                <div>[Preview slideshow]</div>
                <Markdown
                  text={`
## Merchant preferences

- <details><summary>Loading state layouts that match the pages' layouts</summary>
  Hello world
  </details>
- <details><summary>Placeholder content that makes loading content clear</summary>
  Hello world
  </details>
- <details><summary>Having button and controls interactive during loading</summary>
  Hello world
  </details>
- <details><summary>Getting spinners only when really needed</summary>
  Hello world
  </details>
- <details><summary>Seeing a lot of static content in the loading state</summary>
  Hello world
  </details>
                  `}
                />
              </Tab.Panel>
              <Tab.Panel>
                <SandboxContainer>
                  <div className={styles.codeExampleButtons}>
                    {codeExamples.map((example, index) => (
                      <Button
                        key={example.name}
                        pill
                        primary={codeExample.name === codeExamples[index].name}
                        onClick={() => {
                          setCodeExample(example);
                        }}
                      >
                        {example.name}
                      </Button>
                    ))}
                  </div>
                  <iframe
                    id="main"
                    ref={iframeRef}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0,
                    }}
                    src={`/playroom?code=${codeExample.code}`}
                    width="100%"
                    height="100%"
                  />
                </SandboxContainer>
              </Tab.Panel>
              <Tab.Panel>showcase</Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </Longform>
    </Page>
  );
}
