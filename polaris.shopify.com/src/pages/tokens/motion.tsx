import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import motion from "../../../../polaris-react/src/tokens/token-groups/motion.json";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { navItems } from "../../data/tokensNav";
import { useState } from "react";
import Button from "../../components/Button";
import { useEffect } from "react";
import Nav from "../../components/Nav";
import { getTitleForTitleTag } from "../../utils/various";

const Components: NextPage = () => {
  const [easeExamplesAreResetting, setEaseExamplesAreResetting] =
    useState(true);
  const [durationExamplesAreResetting, setDurationExamplesAreResetting] =
    useState(true);

  // Disable motion...
  const resetEaseExamples = () => setEaseExamplesAreResetting(true);
  const resetDurationExamples = () => setDurationExamplesAreResetting(true);

  // ...and enable it again on the next render
  useEffect(
    () => setEaseExamplesAreResetting(false),
    [easeExamplesAreResetting]
  );
  useEffect(
    () => setDurationExamplesAreResetting(false),
    [durationExamplesAreResetting]
  );

  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Motion tokens")}</title>
      </Head>

      <Longform>
        <h1>Motion tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        <h2>Easings</h2>
        <Button onClick={resetEaseExamples}>Play again</Button>

        <div style={{ marginTop: 20 }}>
          {Object.entries(motion)
            .filter(([name]) => name.includes("ease"))
            .map(([name, value]) => {
              return (
                <Token
                  key={value}
                  name={name}
                  description=""
                  value={value}
                  bigGap
                  renderPreview={() => (
                    <div
                      style={{
                        display: "flex",
                        width: 150,
                        height: 50,
                        background: "#fafafa",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          background: "currentColor",
                          animation: easeExamplesAreResetting
                            ? "none"
                            : `ease-preview 2s .5s ${value} both`,
                        }}
                      ></div>
                    </div>
                  )}
                ></Token>
              );
            })}
        </div>

        <h2>Duration</h2>
        <Button onClick={resetDurationExamples}>Play again</Button>

        <div style={{ marginTop: 20 }}>
          {Object.entries(motion)
            .filter(([name]) => name.includes("duration"))
            .map(([name, value]) => {
              return (
                <Token
                  key={value}
                  name={name}
                  description=""
                  value={value}
                  bigGap
                  renderPreview={() => (
                    <div
                      style={{
                        display: "flex",
                        width: 150,
                        height: 50,
                        background: "#fafafa",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          background: "currentColor",
                          animation: durationExamplesAreResetting
                            ? "none"
                            : `ease-preview ${value} .5s ease both`,
                        }}
                      ></div>
                    </div>
                  )}
                ></Token>
              );
            })}
        </div>
      </Longform>
      <style jsx>
        {`
          @keyframes ease-preview {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translatex(148px);
            }
          }
        `}
      </style>
    </Page>
  );
};

export default Components;
