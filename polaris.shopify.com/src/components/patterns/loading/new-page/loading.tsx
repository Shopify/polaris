import {useEffect, useRef, useState} from 'react';
import {Tab} from '@headlessui/react';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import {useRouter} from 'next/router';

import SandboxContainer from '../../../../../src/components/SandboxContainer';

const initialSearchParams =
  '?code=N4Igxg9gJgpiBcIA8BlA1jANjALhAdgAoCGA5jAAQAOATgJYC2xNAngIJg50EB8AOvgoUkAGWIsIAVxz9BQ4WInSAdChidu%2BWfPlIAwsygUAzuq4EYUbTt3osuAgCFoLACowAHjgoB6azqQfAxorARthYKNTDQtQuXCkdy89AhxiOnwYGn9w4TtsPHwAETpjKkxxJO9jOgAvGABePhBjJkxMZt8chPyHfGcoN09vPzDcwKqU-DSMrO7hIMN5-UMTM01LeaFE4amZzOyx3LyMAoISsoqhrxM6xubW4nbO0fjx3sKB65GthcnU9IHZaLEI5QKKKQ4VTrXhHBTiSHQmKCaIEKDMFjLSK-FYhJHmLRwhL-aaAuZE96nPoXcqVYa3epNFptDogLoUnpUz4uKoUTCzYwNYAAJgAvuy3gkfCT9uTJboQVB8ZocZFlbD5QEPk4efT%2BZlBcAAIzi17HQJqtTI4HYim4qKSABGUEkmw5EUM6sJmt0MrJhx9Wq551KtO%2BDPuzKerIlxyD9m5g15%2BpghrFsbjE12ANmAfNiq9qs9VoJv222v6upuKbTppxBZLKrtirBPghKkbGu2bYR0lkgQrJHIPBAABoQDgABYwBiphAAbRAmAgYCeMHgMHwIAAuuOAO50KBT4wLgAsAE4AAzb0VAA';

export default function LoadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
                  <iframe
                    id="main"
                    ref={iframeRef}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0,
                    }}
                    src={`/playroom${initialSearchParams}`}
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
