# polaris.shopify.com

The public facing style guide, available via [https://polaris.shopify.com](https://polaris.shopify.com).

## Getting Started

```
yarn
yarn dev
```

## Development tips

To quickly create new components, run:

```
yarn create-component
```

## Site Content

Our website combines [Next.js](https://nextjs.org/) pages with [MDX](https://mdxjs.com/) markdown files. Here's a guide to understanding the content directory structures and how they translate to pages within the website.

### `/content`

The root `content` directory contains markdown files for all website pages. The structure within `/content` directly corresponds to the site's navigation menu and URL pattern.

For instance, `/content/design/index.md` corresponds to `polaris.shopify.com/design`, while `/content/design/colors.md` corresponds to `polaris.shopify.com/design/colors`.

#### Adding New Pages

To add a new page to `polaris.shopify.com`, insert a markdown `.md` file into the `/content` directory.

For instance, to create `polaris.shopify.com/awesome-new-page`, add `awesome-new-page.md` to the `/content` directory. The directory structure would then be:

```
├── content
│   ├── awesome-new-page.md
```

#### Adding New Section Pages

To add a new page to an existing section on `polaris.shopify.com`, add a markdown `.md` file to the appropriate directory.

For instance, to create `polaris.shopify.com/design/awesome-new-page`, add `awesome-new-page.md` to the `/content/design` directory. The directory structure would then be:

```
├── content
│   ├── design
│   │   ├── awesome-new-page.md
```

#### Adding a New Site Section

To create a new section with a landing page at `polaris.shopify.com/your-new-page`, create a new directory within `/content` and add an `index.md` file for the landing page content. The structure would then be:

```
├── content
│   ├── your-new-section
│   │   ├── index.md
```

To add more pages to your new section, add more markdown `.md` files to the same directory.

```
├── content
│   ├── your-new-section
│   │   ├── index.md
│   │   ├── awesome-new-page.md
```

`/content/your-new-section/awesome-new-page.md` will now correspond to `polaris.shopify.com/your-new-section/awesome-new-page`.

## MDX components

You can use react components in markdown files using MDX to create more robust content elements and layouts.

The MDX renderer found in `/src/components/Markdown` passes along the available global MDX component as a prop. You can also pass in your own components wherever `Markdown` is used.

## `/pages`

The `/pages` directory contains the Next.js template files to render pages. These TSX files handle the site routing and consume the markdown found in the `/content` directory. Most of these files use the baked-in Next.js page routing system with one exception:

### `/pages/[...slug].tsx`

This is a catch-all template that renders the majority of our site's content. The pages that are not rendered by this route are in the `fileShouldNotBeRenderedWithCatchAllTemplate` function.

For pages not rendered by the catch-all template you can follow the normal Next.js routing structure to find a page's dedicated renderer.

Example: the `polaris.shopify.com/components/layout-and-structure/box` page is rendered by `/pages/components/[group]/[component]/index.tsx`
