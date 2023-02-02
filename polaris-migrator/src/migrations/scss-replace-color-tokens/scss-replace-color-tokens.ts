import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {isSassFunction} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function scssReplaceColorTokens(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

interface PluginOptions extends Options {}

function plugin(_options: PluginOptions = {}): Plugin {
  return {
    postcssPlugin: 'scss-replace-color-tokens',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      if (!isKeyOf(propertyMaps, decl.prop)) return;

      const replacementMap = propertyMaps[decl.prop];
      const parsed = valueParser(decl.value);

      parsed.walk((node) => {
        if (!isSassFunction('var', node)) return;

        for (const argNode of node.nodes) {
          if (
            argNode.type !== 'word' ||
            !argNode.value.startsWith('--p-') ||
            !isKeyOf(replacementMap, argNode.value)
          ) {
            continue;
          }

          argNode.value = replacementMap[argNode.value];
        }
      });

      decl.value = parsed.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
}

const colorMap = {
  '--p-text': '--p-color-text',
};

// const backgroundColorMap = {};

// const borderColorMap = {};

// const fillColorMap = {};

const propertyMaps = {
  color: colorMap,
  // background: backgroundColorMap,
  // 'background-color': backgroundColorMap,
  // border: borderColorMap,
  // 'border-color': borderColorMap,
  // fill: fillColorMap,
};

export const unCategorizedMaps = {
  '--p-background': '--p-color-bg-app',
  '--p-background-hovered': '--p-color-bg-app-hover',
  '--p-background-pressed': '--p-color-bg-app-active',
  '--p-background-selected': '--p-color-bg-app-selected',
  '--p-surface': '--p-color-bg',
  '--p-surface-dark': '--p-color-bg-inverse',
  '--p-surface-neutral': '--p-color-bg-strong',
  '--p-surface-neutral-hovered': '--p-color-bg-strong-hover',
  '--p-surface-neutral-pressed': '--p-color-bg-strong-active',
  '--p-surface-neutral-disabled': '--p-color-bg-disabled',
  '--p-surface-neutral-subdued': '--p-color-bg-subdued',
  '--p-surface-neutral-subdued-dark': '--p-color-bg-inverse',
  '--p-surface-subdued': '--p-color-bg-subdued',
  '--p-surface-disabled': '--p-color-bg-disabled',
  '--p-surface-hovered': '--p-color-bg-hover',
  '--p-surface-hovered-dark': '--p-color-bg-inverse-hover',
  '--p-surface-pressed': '--p-color-bg-active',
  '--p-surface-pressed-dark': '--p-color-bg-inverse-active',
  '--p-surface-depressed': '--p-color-bg-inset',
  '--p-surface-search-field': '--p-color-bg-inset',
  '--p-surface-search-field-dark': '--p-color-surface-search-field-dark',
  '--p-backdrop': '--p-color-bg-backdrop',
  '--p-overlay': '--p-color-bg-overlay',
  '--p-shadow-color-picker': '--p-color-shadow-color-picker', // shadow-inset-sm
  '--p-shadow-color-picker-dragger': '--p-color-shadow-color-picker-dragger', // shadow-sm
  '--p-hint-from-direct-light': '--p-color-hint-from-direct-light', // ?
  '--p-border': '--p-color-border',
  '--p-border-on-dark': '--p-color-border-inverse',
  '--p-border-neutral-subdued': '--p-color-border-strong',
  '--p-border-hovered': '--p-color-border-hover',
  '--p-border-disabled': '--p-color-border-disabled',
  '--p-border-subdued': '--p-color-border-subdued',
  '--p-border-depressed': '--p-color-border-depressed',
  '--p-border-shadow': '--p-color-border-input',
  '--p-border-shadow-subdued': '--p-color-border-input',
  '--p-divider': '--p-color-border-subdued',
  '--p-divider-dark': '--p-color-border-inverse',
  '--p-icon': '--p-color-icon',
  '--p-icon-on-dark': '--p-color-icon-inverse',
  '--p-icon-hovered': '--p-color-icon-hover',
  '--p-icon-pressed': '--p-color-icon-pressed',
  '--p-icon-disabled': '--p-color-icon-disabled',
  '--p-icon-subdued': '--p-color-icon-subdued',
  '--p-text': '--p-color-text',
  '--p-text-on-dark': '--p-color-text-inverse',
  '--p-text-disabled': '--p-color-text-disabled',
  '--p-text-subdued': '--p-color-text-subdued',
  '--p-text-subdued-on-dark': '--p-color-text-inverse-subdued',
  '--p-interactive': '--p-color-text-interactive',
  // '--p-interactive': '--p-color-border-interactive',
  // '--p-interactive': '--p-color-icon-interactive',
  // '--p-interactive': '--p-color-bg-interactive',
  '--p-interactive-on-dark': '--p-color-text-interactive-inverse',
  '--p-interactive-disabled': '--p-color-text-interactive-disabled',
  // '--p-interactive-disabled': '--p-color-border-interactive-disabled',
  // '--p-interactive-disabled': '--p-color-icon-interactive-disabled',
  // '--p-interactive-disabled': '--p-color-bg-interactive-disabled',
  '--p-interactive-hovered': '--p-color-text-interactive-hover',
  // '--p-interactive-hovered': '--p-color-border-interactive-hover',
  // '--p-interactive-hovered': '--p-color-icon-interactive-hover',
  // '--p-interactive-hovered': '--p-color-bg-interactive-hover',
  '--p-interactive-pressed': '--p-color-text-interactive-active',
  // '--p-interactive-pressed': '--p-color-border-interactive-active',
  // '--p-interactive-pressed': '--p-color-icon-interactive-active',
  // '--p-interactive-pressed': '--p-color-bg-interactive-active',
  '--p-interactive-pressed-on-dark': '--p-color-interactive-pressed-on-dark',
  '--p-focused': '--p-color-border-interactive-focus',
  '--p-surface-selected': '--p-color-bg-interactive-selected',
  '--p-surface-selected-hovered': '--p-color-bg-interactive-subdued-hover',
  '--p-surface-selected-pressed': '--p-color-bg-interactive-subdued-active',
  '--p-icon-on-interactive': '--p-color-icon-on-color',
  '--p-text-on-interactive': '--p-color-text-on-color',
  '--p-action-secondary': '--p-color-bg-subdued',
  '--p-action-secondary-disabled': '--p-color-bg-disabled',
  '--p-action-secondary-hovered': '--p-color-bg-hover',
  '--p-action-secondary-hovered-dark': '--p-color-bg-inverse-hover',
  '--p-action-secondary-pressed': '--p-color-bg-subdued-active',
  '--p-action-secondary-pressed-dark': '--p-color-bg-inverse-active',
  '--p-action-secondary-depressed': '--p-color-bg-inset-strong',
  '--p-action-primary': '--p-color-bg-primary',
  // '--p-action-primary': '--p-color-text-primary',
  // '--p-action-primary': '--p-color-icon-primary',
  // '--p-action-primary': '--p-color-border-primary',
  '--p-action-primary-disabled': '--p-color-bg-disabled',
  '--p-action-primary-hovered': '--p-color-bg-primary-hover',
  '--p-action-primary-pressed': '--p-color-bg-primary-active',
  '--p-action-primary-depressed': '--p-color-bg-primary-active',
  '--p-icon-on-primary': '--p-color-icon-on-color',
  '--p-text-on-primary': '--p-color-text-on-color',
  '--p-text-primary': '--p-color-text-primary',
  '--p-text-primary-hovered': '--p-color-text-primary-hover',
  '--p-text-primary-pressed': '--p-color-text-primary',
  '--p-surface-primary-selected': '--p-color-bg-primary-subdued-selected',
  '--p-surface-primary-selected-hovered': '--p-color-bg-primary-subdued-hover',
  '--p-surface-primary-selected-pressed': '--p-color-bg-primary-subdued-active',
  '--p-border-critical': '--p-color-border-critical',
  '--p-border-critical-subdued': '--p-color-border-critical-subdued',
  '--p-border-critical-disabled': '--p-color-border-disabled',
  '--p-icon-critical': '--p-color-icon-critical',
  '--p-surface-critical': '--p-color-bg-critical',
  '--p-surface-critical-subdued': '--p-color-bg-critical-subdued',
  '--p-surface-critical-subdued-hovered': '--p-color-bg-critical-subdued-hover',
  '--p-surface-critical-subdued-pressed':
    '--p-color-bg-critical-subdued-active',
  '--p-surface-critical-subdued-depressed': '--p-color-bg-critical',
  '--p-text-critical': '--p-color-text-critical',
  '--p-action-critical': '--p-color-bg-critical-strong',
  '--p-action-critical-disabled': '--p-color-action-critical-disabled',
  '--p-action-critical-hovered': '--p-color-bg-critical-strong-hover',
  '--p-action-critical-pressed': '--p-color-bg-critical-strong-active',
  '--p-action-critical-depressed': '--p-color-bg-critical-strong-active',
  '--p-icon-on-critical': '--p-color-icon-on-color',
  '--p-text-on-critical': '--p-color-text-on-color',
  '--p-interactive-critical': '--p-color-text-critical',
  // '--p-interactive-critical': '--p-color-icon-critical',
  // '--p-interactive-critical': '--p-color-bg-critical',
  '--p-interactive-critical-disabled': '--p-color-text-disabled',
  '--p-interactive-critical-hovered': '--p-color-interactive-critical-hovered',
  '--p-interactive-critical-pressed': '--p-color-text-critical-active',
  '--p-border-warning': '--p-color-border-caution',
  '--p-border-warning-subdued': '--p-color-border-caution-subdued',
  '--p-icon-warning': '--p-color-icon-caution',
  '--p-surface-warning': '--p-color-bg-caution',
  '--p-surface-warning-subdued': '--p-color-bg-caution-subdued',
  '--p-surface-warning-subdued-hovered': '--p-color-bg-caution-subdued-hover',
  '--p-surface-warning-subdued-pressed': '--p-color-bg-caution-subdued-active',
  '--p-text-warning': '--p-color-text-caution',
  '--p-border-highlight': '--p-color-border-info',
  '--p-border-highlight-subdued': '--p-color-border-info-subdued',
  '--p-icon-highlight': '--p-color-icon-info',
  '--p-surface-highlight': '--p-color-bg-info',
  '--p-surface-highlight-subdued': '--p-color-bg-info-subdued',
  '--p-surface-highlight-subdued-hovered': '--p-color-bg-info-subdued-hover',
  '--p-surface-highlight-subdued-pressed': '--p-color-bg-info-subdued-active',
  '--p-text-highlight': '--p-color-text-info',
  '--p-border-success': '--p-color-border-success',
  '--p-border-success-subdued': '--p-color-border-success-subdued',
  '--p-icon-success': '--p-color-icon-success',
  '--p-surface-success': '--p-color-bg-success',
  '--p-surface-success-subdued': '--p-color-bg-success-subdued',
  '--p-surface-success-subdued-hovered': '--p-color-bg-success-subdued-hovered',
  '--p-surface-success-subdued-pressed': '--p-color-bg-success-subdued-pressed',
  '--p-text-success': '--p-color-text-success',
  '--p-icon-attention': '--p-color-icon-caution',
  '--p-surface-attention': '--p-color-bg-caution',
  '--p-decorative-one-icon': '--p-color-decorative-one-icon',
  '--p-decorative-one-surface': '--p-color-decorative-one-surface',
  '--p-decorative-one-text': '--p-color-decorative-one-text',
  '--p-decorative-two-icon': '--p-color-decorative-two-icon',
  '--p-decorative-two-surface': '--p-color-decorative-two-surface',
  '--p-decorative-two-text': '--p-color-decorative-two-text',
  '--p-decorative-three-icon': '--p-color-decorative-three-icon',
  '--p-decorative-three-surface': '--p-color-decorative-three-surface',
  '--p-decorative-three-text': '--p-color-decorative-three-text',
  '--p-decorative-four-icon': '--p-color-decorative-four-icon',
  '--p-decorative-four-surface': '--p-color-decorative-four-surface',
  '--p-decorative-four-text': '--p-color-decorative-four-text',
  '--p-decorative-five-icon': '--p-color-decorative-five-icon',
  '--p-decorative-five-surface': '--p-color-decorative-five-surface',
  '--p-decorative-five-text': '--p-color-decorative-five-text',
};
