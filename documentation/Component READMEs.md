# Component READMEs

Component documentation is written in Markdown.

The Markdown format is enhanced to answer Polaris’ documentation needs.

---

## Metadata, component name, and introduction

A component README starts with metadata (in YAML), followed by the component name and an introduction:

```markdown
---
name: ComponentName
category: Category # for example: “Actions”
keywords:
  - keywords are useful
  - for improving search results
  - in the style guide
---

# ComponentName

Short introduction about the component.
```

---

## Sections

Break content into sections by using a heading level 2 (`##`) preceded by a horizontal rule (`---`):

```markdown
---

## I am a section heading

Content goes here.
```

Add keywords to a section:

```markdown
---

## I am a section heading

<!-- keywords: one, two, three -->
```

Skip a section in the side navigation of <https://polaris.shopify.com>

```markdown
---

## I am a section heading<!-- nav:skipsection -->
```

---

## Examples

List examples under the “Examples” section:

````markdown
---

## Examples

### First example

Example description.

```jsx
<MyComponent aProp={true} />
```
````

Restrict an example to a set of platforms:

````markdown
---
## Examples

### No example-for meta

This example is for all platforms (must contain React code).

```jsx
<MyComponent aProp={true} />
```
---

## Troubleshooting

When running `pnpm dev` or CI tests you may run into errors.
Here are some common fixes.

### No examples found

```console
🚨 [Top bar] No examples found in src/components/TopBar/README.md
```

A `---` may be missing before the `## Examples` heading. Add it so that our parsers know where the Examples section begins.

```diff
+ ---
+
  ## Examples
```

### Syntax errors

```console
🚨 Example "Autocomplete with loading" contains a syntax error in src/components/Autocomplete/README.md: Unexpected token (18:20)
```

This error is reported when an example does not contain valid JavaScript. The values at the end denote the line and character offset of the error. In this example `18:20` denotes that the error is on line 18, character 20 of the "Autocomplete with loading" example. Look for typos or other invalid syntax in that area.
````
