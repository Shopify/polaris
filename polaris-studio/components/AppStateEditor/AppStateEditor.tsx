import { Tab } from "@headlessui/react";
import { useContext } from "react";
import { StateContext } from "../App/App";
import styles from "./AppStateEditor.module.scss";

interface Props {}

function AppStateEditor({}: Props) {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div className={styles.AppStateEditor}>
      <Tab.Group>
        <Tab.List className={styles.Tabs}>
          {state.appState.sheets.map((sheet) => (
            <Tab key={sheet.id}>{sheet.name}</Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {state.appState.sheets.map((sheet) => (
            <Tab.Panel key={sheet.id}>
              <div className={styles.Columns}>
                {sheet.columns.map((column, columnIndex) => (
                  <div key={column.name} className={styles.Column}>
                    <div className={styles.ColumnHeader}>{column.name}</div>
                    <div className={styles.Rows}>
                      {column.rows.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.Row}>
                          <input
                            type="text"
                            value={row.value}
                            onChange={(evt) =>
                              dispatch({
                                type: "UPDATE_APP_STATE",
                                sheetId: sheet.id,
                                columnIndex,
                                rowIndex,
                                value: evt.target.value,
                              })
                            }
                          />
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
