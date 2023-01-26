import {useState} from 'react';
import Page from '../../src/components/Page';
import ComponentExamples from '../../src/components/ComponentExamples';
import {Listbox} from '@headlessui/react';

import styles from './Learn.module.scss';

const people = [
  {id: 1, name: 'Durward Reynolds', unavailable: false},
  {id: 2, name: 'Kenton Towne', unavailable: false},
  {id: 3, name: 'Therese Wunsch', unavailable: false},
  {id: 4, name: 'Benedict Kessler', unavailable: true},
  {id: 5, name: 'Katelyn Rohan', unavailable: false},
];

const filters = {
  Topics: ['Layout', 'Patterns', 'Tokens', 'Components', 'App Development'],
  Focus: ['Development', 'UX', 'Content'],
  Difficulty: ['Beginner', 'Intermediate', 'Advanced'],
};

function Filters(props) {
  const {filtersObj} = props;
  const [selectedFilter, setSelectedFilter] = useState(people[0]);

  return (
    <>
      <h3>Filters</h3>
      <div className={styles.Filters}>
        {Object.keys(filters).map((filterName) => {
          const filterOptions = filtersObj[filterName];
          return (
            <div className={styles.ListBoxContainer} key={filterName}>
              <Listbox value={null} onChange={setSelectedFilter}>
                <Listbox.Button className={styles.ListboxButton}>
                  {filterName}
                </Listbox.Button>
                <Listbox.Options className={styles.ListboxOptions}>
                  {filterOptions.map((f) => {
                    return (
                      <Listbox.Option
                        className={styles.ListboxOption}
                        key={f}
                        value={f}
                      >
                        {f}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Listbox>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function LearnPage() {
  return (
    <Page title="Polaris Training Hub" showTOC={false}>
      <div className={styles.Learn}>
        <p className={styles.lede}>
          Welcome to the Shopify Polaris Design System training hub! Here,
          you'll find a variety of resources to help you master the design
          system and build high-quality admin experiences. From interactive
          examples to training videos, we've got everything you need to get
          started. Whether you're a designer, developer, content designer, or
          Shopify app developer, our resources are tailored to suit your needs
          and level of expertise. Whether you're a complete beginner or an
          advanced user, our training hub has something for everyone. Start
          exploring today and take your skills to the next level with Shopify
          Polaris!
        </p>
        <p>
          Completely new to Polaris and need some help getting started? Complete
          our Beginner's Learning Journey to get up and running with the Polaris
          suite of tools quickly.
        </p>

        <Filters filtersObj={filters} />
      </div>
    </Page>
  );
}
