import React, { useState } from "react";

import { useQueryParams, useMedia } from "../../utils/hooks";
import { QuickGuide, QuickGuideRow } from "../../types";

import Select from "../Select";

import styles from "./QuickStartGuide.module.scss";

export interface Props {
  data: QuickGuide[];
}

const QuickStartGuide = ({ data }: Props) => {
  const useDescriptionList = useMedia("screen and (max-width: 500px)");
  const { routerIsReady, currentParams, setQueryParams } = useQueryParams();

  const queryParamValues: string[] = data.map(({ queryParam }) => queryParam);
  const contributionTypes = data.map(({ title }, index) => {
    return { label: title, value: String(index) };
  });

  const defaultGuideIndex =
    routerIsReady && currentParams?.quickGuide
      ? queryParamValues.indexOf(currentParams.quickGuide as string)
      : "0";

  const [guideIndex, setGuideIndex] = useState(defaultGuideIndex);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextIndex: string = event.target.value;
    setGuideIndex(nextIndex);
    setQueryParams({ quickGuide: `${queryParamValues[Number(nextIndex)]}` });
  };

  const tableMarkup = (
    <table
      id="Contribution-Quick-Guide-Table"
      className={styles.QuickStartGuide__Table}
      title={`Contribution quick start guide: ${
        contributionTypes[Number(guideIndex)].label
      }`}
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
    <dl
      id="Contribution-Quick-Guide-List"
      className={styles.QuickStartGuide__List}
      title={`Contribution quick start guide: ${
        contributionTypes[Number(guideIndex)].label
      }`}
    >
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

  const ariaControlsId = useDescriptionList
    ? "Contribution-Quick-Guide-List"
    : "Contribution-Quick-Guide-Table";

  return (
    <div className={styles.QuickStartGuide}>
      <Select
        labelHidden
        id="Contribution-Type-Select"
        label="Contribution type"
        selected={contributionTypes[Number(guideIndex)].value}
        ariaControls={ariaControlsId}
        options={contributionTypes}
        onChange={handleChange}
      />

      <div
        role="region"
        aria-live="polite"
        className={styles.QuickStartGuide__Card}
      >
        {tableMarkup}
        {descriptionListMarkup}
      </div>
    </div>
  );
};

export default QuickStartGuide;
