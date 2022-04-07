import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Page from "../../components/Page";
import colors from "../../../../polaris-react/src/tokens/token-groups/color.light.json";
import { Tab } from "@headlessui/react";
import styles from "../../styles/tokens.module.scss";
import Grid from "../../components/Grid";
import Section from "../../components/Section";
import { createLineAttribute } from "../../utils/lines";
import SectionHead from "../../components/SectionHead";
import ComponentPreview from "../../components/ComponentPreview";
import { LineConfig } from "../../types";

const untypedColors: { [key: string]: string } = { ...colors };

const Components: NextPage = () => {
  const [currentSurfaceRole, setCurrentSurfaceRole] = useState("success");
  const [currentInteractiveRole, setCurrentInteractiveRole] =
    useState("default");
  const [currentActionRole, setCurrentActionRole] = useState("primary");
  const [currentDecorativeRole, setCurrentDecorativeRole] = useState("one");

  return (
    <Page>
      <Head>
        <title>Tokens</title>
      </Head>

      <Section>
        <SectionHead
          title="Tokens"
          navItems={[
            { label: "Colors", url: "/tokens/colors" },
            { label: "Typography", url: "/tokens/typography" },
            { label: "Spacing", url: "/tokens/spacing" },
            { label: "Shape", url: "/tokens/shape" },
            { label: "Depth", url: "/tokens/depth" },
            { label: "Motion", url: "/tokens/motion" },
            { label: "Z-Index", url: "/tokens/zindex" },
          ]}
        />

        <TokenSection title="Backgrounds and fills">
          <TokenSection.Preview>
            <ComponentPreview
              src={`/previews/tokens/surfaces#${
                currentSurfaceRole === "highlight" ? "info" : currentSurfaceRole
              }`}
              id="banner"
            />
          </TokenSection.Preview>

          <TokenSection.Tokens
            currentTab={currentSurfaceRole}
            onTabChange={(value) => setCurrentSurfaceRole(value)}
            tabs={[
              {
                value: "success",
                label: "Success",
                tokens: [
                  {
                    name: "surface-success",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Badge",
                    toOrigin: "right",
                  },
                  {
                    name: "surface-success-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "right",
                  },
                  {
                    name: "border-success",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "edge",
                  },
                  {
                    name: "border-success-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Button",
                    toOrigin: "edge",
                  },
                  {
                    name: "icon-success",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Ribbon .Polaris-Icon",
                  },
                ],
              },
              {
                value: "highlight",
                label: "Highlight",
                tokens: [
                  {
                    name: "surface-highlight",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Badge",
                    toOrigin: "right",
                  },
                  {
                    name: "surface-highlight-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "right",
                  },
                  {
                    name: "border-highlight",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "edge",
                  },
                  {
                    name: "border-highlight-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Button",
                    toOrigin: "edge",
                  },
                  {
                    name: "icon-highlight",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Ribbon .Polaris-Icon",
                  },
                ],
              },
              {
                value: "warning",
                label: "Warning",
                tokens: [
                  {
                    name: "surface-warning",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Badge",
                    toOrigin: "right",
                  },
                  {
                    name: "surface-warning-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "right",
                  },
                  {
                    name: "border-warning",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "edge",
                  },
                  {
                    name: "border-warning-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Button",
                    toOrigin: "edge",
                  },
                  {
                    name: "icon-warning",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Ribbon .Polaris-Icon",
                  },
                ],
              },
              {
                value: "critical",
                label: "Critical",
                tokens: [
                  {
                    name: "surface-critical",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Badge",
                    toOrigin: "right",
                  },
                  {
                    name: "surface-critical-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "right",
                  },
                  {
                    name: "border-critical",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "edge",
                  },
                  {
                    name: "border-critical-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Button",
                    toOrigin: "edge",
                  },
                  {
                    name: "icon-critical",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Ribbon .Polaris-Icon",
                  },
                ],
              },
              {
                value: "netrual",
                label: "Neutral",
                tokens: [
                  {
                    name: "surface-neutral",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Badge",
                    toOrigin: "right",
                  },
                  {
                    name: "surface-neutral-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "right",
                  },
                  {
                    name: "border",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner",
                    toOrigin: "edge",
                  },
                  {
                    name: "border-subdued",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Button",
                    toOrigin: "edge",
                  },
                  {
                    name: "icon",
                    iframeSelector: "#banner",
                    elementSelector: ".Polaris-Banner__Ribbon .Polaris-Icon",
                  },
                ],
              },
            ]}
          />
        </TokenSection>

        <TokenSection title="Text">
          <TokenSection.Preview>
            <ComponentPreview src="/previews/tokens/text" id="text" />
          </TokenSection.Preview>

          <TokenSection.Tokens
            currentTab={currentSurfaceRole}
            onTabChange={(value) => setCurrentSurfaceRole(value)}
            tabs={[
              {
                value: "all",
                label: "All",
                tokens: [
                  {
                    name: "text",
                    iframeSelector: "#text",
                    elementSelector: "#text",
                  },
                  {
                    name: "text-subdued",
                    iframeSelector: "#text",
                    elementSelector: "#subdued",
                  },
                  // {
                  //   name: "text-disabled",
                  //   iframeSelector: "#text",
                  //   elementSelector: "#subdued",
                  // },
                  {
                    name: "text-success",
                    iframeSelector: "#text",
                    elementSelector: "#positive",
                  },
                  {
                    name: "text-critical",
                    iframeSelector: "#text",
                    elementSelector: "#negative",
                  },
                  {
                    name: "text-warning",
                    iframeSelector: "#text",
                    elementSelector: "#warning",
                  },
                  { name: "text-primary", selector: "#preview-text-primary" },
                ],
              },
            ]}
          />
        </TokenSection>

        <TokenSection title="Actions">
          <TokenSection.Preview>
            <ComponentPreview src="/previews/tokens/action" id="action" />
          </TokenSection.Preview>

          <TokenSection.Tokens
            currentTab={currentActionRole}
            onTabChange={(value) => setCurrentActionRole(value)}
            tabs={[
              {
                value: "primary",
                label: "Primary",
                tokens: [
                  {
                    name: "action-primary",
                    iframeSelector: "#action",
                    elementSelector: ".Polaris-Button",
                    toOrigin: "right",
                  },
                  {
                    name: "action-primary-hovered",
                    iframeSelector: "#action",
                    elementSelector: "#TODO",
                  },
                  {
                    name: "action-primary-pressed",
                    iframeSelector: "#action",
                    elementSelector: "#TODO",
                  },
                  {
                    name: "action-primary-depressed",
                    iframeSelector: "#action",
                    elementSelector: "#TODO",
                  },
                  {
                    name: "action-primary-disabled",
                    iframeSelector: "#action",
                    elementSelector: "#TODO",
                  },
                  {
                    name: "text-on-primary",
                    iframeSelector: "#action",
                    elementSelector: ".Polaris-Button",
                  },
                ],
              },
              {
                value: "secondary",
                label: "Secondary",
                tokens: [
                  { name: "action-secondary", selector: "#action" },
                  { name: "action-secondary-hovered", selector: "#TODO" },
                  { name: "action-secondary-pressed", selector: "#TODO" },
                  { name: "action-secondary-depressed", selector: "#TODO" },
                  { name: "action-secondary-disabled", selector: "#TODO" },
                  { name: "text", selector: "#action" },
                ],
              },
              {
                value: "critical",
                label: "Critical",
                tokens: [
                  { name: "action-critical", selector: "#action" },
                  { name: "action-critical-hovered", selector: "#TODO" },
                  { name: "action-critical-pressed", selector: "#TODO" },
                  { name: "action-critical-depressed", selector: "#TODO" },
                  { name: "action-critical-disabled", selector: "#TODO" },
                  { name: "text-on-critical", selector: "#action" },
                ],
              },
            ]}
          />
        </TokenSection>
        {/*
        <TokenSection title="Interactive">
          <TokenSection.Preview>...</TokenSection.Preview>

          <TokenSection.Tokens
            currentTab={currentInteractiveRole}
            onTabChange={(value) => setCurrentInteractiveRole(value)}
            tabs={[
              {
                value: "default",
                label: "Default",
                tokens: [
                  { name: "interactive", selector: "#TODO" },
                  { name: "interactive-disabled", selector: "#TODO" },
                  { name: "interactive-hovered", selector: "#TODO" },
                  { name: "interactive-pressed", selector: "#TODO" },
                  { name: "text-on-interactive", selector: "#TODO" },
                  { name: "icon-on-interactive", selector: "#TODO" },
                ],
              },
              {
                value: "critical",
                label: "Critical",
                tokens: [
                  { name: "interactive-critical", selector: "#TODO" },
                  { name: "interactive-critical-disabled", selector: "#TODO" },
                  { name: "interactive-critical-hovered", selector: "#TODO" },
                  { name: "interactive-critical-pressed", selector: "#TODO" },
                  { name: "text-on-interactive", selector: "#TODO" },
                  { name: "icon-on-interactive", selector: "#TODO" },
                ],
              },
            ]}
          />
        </TokenSection>

        <TokenSection title="Decorative">
          <TokenSection.Tokens
            currentTab={currentSurfaceRole}
            onTabChange={(value) => setCurrentSurfaceRole(value)}
            tabs={[
              {
                value: "neutral",
                label: "Neutral",
                tokens: [
                  { name: "action-critical", selector: "#action-critical" },
                ],
              },
            ]}
          />
        </TokenSection> */}
      </Section>
    </Page>
  );
};

export class TokenSection extends React.Component<{
  title: string;
  children: React.ReactNode;
}> {
  static Preview = Preview;
  static Tokens = Tokens;

  render() {
    return <Grid center>{this.props.children}</Grid>;
  }
}

interface TokenDetails extends LineConfig {
  name: keyof typeof colors;
}

function Tokens({
  tabs,
  onTabChange,
  currentTab,
}: {
  tabs: {
    value: string;
    label: string;
    tokens: TokenDetails[];
  }[];
  currentTab: string;
  onTabChange: (value: string) => void;
}) {
  const selectedIndex = tabs.findIndex((tab) => tab.value === currentTab);

  function handleTabChange(index: number) {
    const tabValue = tabs[index].value;
    onTabChange(tabValue);
  }

  return (
    <Grid.Column start={16} end={25}>
      <div className={styles.ColorList}>
        <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
          <div className={styles.TokenTabs} hidden={tabs.length <= 1}>
            <Tab.List>
              {tabs.map((tab) => (
                <Tab key={tab.value}>{tab.label}</Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.value}>
                {tab.tokens.map((token) => (
                  <TokenPreview key={token.name} {...token} />
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Grid.Column>
  );
}

function TokenPreview({ name, ...lineConfig }: TokenDetails) {
  const isStateful =
    name.includes("hovered") ||
    name.includes("pressed") ||
    name.includes("depressed") ||
    (name.includes("disabled") && !name.startsWith("text"));

  const fullSize = 40;
  const smallSize = 16;
  const size = isStateful ? smallSize : fullSize;

  const value = colors[name];

  return (
    <div className={styles.TokenPreview}>
      <div
        style={{
          minWidth: fullSize,
          maxWidth: fullSize,
          height: size,
          display: "flex",
          justifyContent: "right",
        }}
      >
        <div
          {...createLineAttribute({
            fromOrigin: "edge",
            ...lineConfig,
          })}
          style={{
            minWidth: size,
            maxWidth: size,
            height: size,
            borderRadius: 2,
            background: value,
          }}
        ></div>
      </div>
      <p>
        <span style={{ opacity: 0.4 }}>--p-</span>
        {name}
      </p>
    </div>
  );
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Grid.Column start={1} end={15}>
      <div className={styles.Preview}>
        <div className={styles.PreviewContent}>{children}</div>
      </div>
    </Grid.Column>
  );
}

export default Components;
