---
title: Polaris for VS Code
navTitle: VS Code
description: Official VS Code extension for building with the Shopify Polaris design system.
icon: HintMajor
order: 1
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<picture>
  <source
    srcSet="/images/tools/polaris-for-vscode/polaris-for-vscode-preview.png"
    media="(prefers-reduced-motion: reduce)"
  ></source>
  <img
    style={{maxWidth: '100%'}}
    srcSet="/images/tools/polaris-for-vscode/polaris-for-vscode-preview.gif"
    alt="Demo of Polaris for VS Code tokens autocomplete"
  />
</picture>

## Features

### Design Token Autocomplete

Get code autocomplete suggestions for the [Polaris Design Tokens](https://polaris.shopify.com/tokens/color#navigation)

- 🗄️ Automatically works for CSS and Sass files
- 🔍 Preview design token values in autocomplete description
- 🎨 Color previews for all `color` tokens
- 🥇 Relevant code completions based on the current line of code

## How to use

Install the [Polaris for VS Code extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode). Once enabled, the extension will automatically run in any CSS and Sass files.

To trigger the token autocomplete feature:

1. Open a CSS or Sass file from your project
2. Start typing the CSS property you want to set, for example: `color:`
3. Type the extension trigger characters: `--`. This will bring up the relevant autocomplete tokens associated with the CSS property typed.
