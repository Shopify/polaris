import {Tab} from '@headlessui/react';
import {useContext} from 'react';
import {StateContext} from '../App/App';
import styles from './AppStateEditor.module.scss';

interface Props {}

function AppStateEditor({}: Props) {
  const {state, dispatch} = useContext(StateContext);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

  function mock() {
    const endpoint =
      'https://mock.shop/api?query=%7B%20products(first%3A%2020)%20%7B%20edges%20%7B%20node%20%7B%20id%20title%20description%20featuredImage%20%7B%20id%20url%20%7D%20variants(first%3A%203)%20%7B%20edges%20%7B%20node%20%7B%20price%20%7B%20amount%20currencyCode%20%7D%20%7D%20%7D%20%7D%20%7D%20%7D%20%7D%7D';
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        data.data.products.edges.forEach((edge: any, i: any) => {
          const {
            title,
            description,
            featuredImage: {url},
          } = edge.node;
          dispatch({
            type: 'UPDATE_APP_STATE',
            sheetId: state.appState.sheets[0].id,
            rowIndex: i,
            columnIndex: 0,
            temporaryState: false,
            value: title,
          });
          dispatch({
            type: 'UPDATE_APP_STATE',
            sheetId: state.appState.sheets[0].id,
            rowIndex: i,
            columnIndex: 1,
            temporaryState: false,
            value: description,
          });
          dispatch({
            type: 'UPDATE_APP_STATE',
            sheetId: state.appState.sheets[0].id,
            rowIndex: i,
            columnIndex: 2,
            temporaryState: false,
            value: url,
          });
        });
      });
  }

  return (
    <div className={styles.AppStateEditor}>
      <Tab.Group>
        <Tab.List className={styles.Tabs}>
          {state.appState.sheets.map((sheet) => (
            <Tab key={sheet.id}>{sheet.name}</Tab>
          ))}
          <button
            onClick={() =>
              dispatch({
                type: 'ADD_APP_STATE_SHEET',
              })
            }
            aria-label="Add tab"
          >
            +
          </button>
        </Tab.List>

        <button className={styles.MockData} onClick={() => mock()}>
          🪄 Get Product data
        </button>

        <Tab.Panels>
          {state.appState.sheets.map((sheet) => (
            <Tab.Panel key={sheet.id}>
              <div className={styles.Columns}>
                {sheet.columns.map((column, columnIndex) => (
                  <div key={column.name} className={styles.Column}>
                    <div className={styles.ColumnHeader}>
                      <span>{alphabet[columnIndex]}</span>
                      {column.name}
                    </div>
                    <div className={styles.Rows}>
                      {column.rows.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.Row}>
                          <input
                            type="text"
                            value={row.value}
                            onChange={(evt) =>
                              dispatch({
                                type: 'UPDATE_APP_STATE',
                                sheetId: sheet.id,
                                columnIndex,
                                rowIndex,
                                temporaryState: false,
                                value: evt.target.value,
                              })
                            }
                          />
                          <span className={styles.TemporaryValue}>
                            {row.temporaryValue}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default AppStateEditor;
