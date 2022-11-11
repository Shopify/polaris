import {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import Longform from '../Longform';
import Page from '../Page';
import styles from './PatternPage.module.scss';

export default function PatternPage() {
  const tabsList = ['UX', 'BUILD', 'SHOWCASE'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const pattern = null;
  // useEffect(() => {
  //   setSelectedIndex(0);
  // }, [pattern]);
  return (
    <Page>
      <Longform>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <Tab.List>
            <div className={styles.ExamplesList} id="examples">
              {tabsList.map((listItem) => {
                return (
                  <Tab key={listItem}>
                    <span>{listItem}</span>
                  </Tab>
                );
              })}
            </div>
            <Tab.Panels></Tab.Panels>
          </Tab.List>
        </Tab.Group>
        {'Hello World'}
      </Longform>
    </Page>
  );
}
