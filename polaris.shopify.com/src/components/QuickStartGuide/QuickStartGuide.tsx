import React, { useState } from "react";
import { QuickGuide, QuickGuideRow } from "../../types";
import Select from "../Select";

import styles from "./QuickStartGuide.module.scss";

export interface Props {
  data: QuickGuide[];
}

const QuickStartGuide = ({ data }: Props) => {
  const [guideIndex, setGuideIndex] = useState("0");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGuideIndex(event.target.value);
  };

  const contributionTypes = data.map(({ title }, index) => ({
    label: title,
    value: String(index),
  }));

  const tableMarkup = (
    <table
      title="Contribution quick start guide"
      className={styles.QuickStartGuide__Table}
    >
      <tbody>
        {data[Number(guideIndex)].rows.map(
          (row: QuickGuideRow, index: number) => {
            return (
              <tr key={`row-${index}`}>
                <th>{row.question}</th>
                <td dangerouslySetInnerHTML={{ __html: row.answer }}></td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );

  const descriptionListMarkup = (
    <dl className={styles.QuickStartGuide__List}>
      {data[Number(guideIndex)].rows.map(
        (row: QuickGuideRow, index: number) => {
          return (
            <div
              className={styles["QuickStartGuide__List--ItemWrapper"]}
              key={`row-${index}`}
            >
              <dt>{row.question}</dt>
              <dd dangerouslySetInnerHTML={{ __html: row.answer }}></dd>
            </div>
          );
        }
      )}
    </dl>
  );

  return (
    <div className={styles.QuickStartGuide}>
      <Select
        labelHidden
        id="Contribution-Type-Select"
        label="Contribution type"
        options={contributionTypes}
        onChange={handleChange}
      />

      <div className={styles.QuickStartGuide__Card}>
        {tableMarkup}
        {descriptionListMarkup}
      </div>
    </div>
  );
};

export default QuickStartGuide;
