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

  const tableRowMarkup = data[Number(guideIndex)].rows.map(
    (row: QuickGuideRow, index: number) => {
      return (
        <tr key={`row-${index}`}>
          <th>{row.question}</th>
          <td dangerouslySetInnerHTML={{ __html: row.answer }}></td>
        </tr>
      );
    }
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
        <div className={styles["QuickStartGuide__TableWrapper"]}>
          <table
            title="Contribution quick start guide"
            className={styles.QuickStartGuide__Table}
          >
            <tbody>{tableRowMarkup}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
