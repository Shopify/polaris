---
name: Resources/GraphQL API
slug: graphql-api
icon: IconGraphQL
---

# GraphQL API

This site uses a [GraphQL](https://graphql.org/learn/) API for fetching content.
It can be used to build Figma plugins, text editor
extensions, or even a completely new site.

The read-only API is publicly available at the `https://polaris.shopify.com/api`
endpoint. Check out
<a href="https://polaris.shopify.com/api" data-event-label="API Playground" data-event-category="Inline Link">the
GraphiQL playground</a> to try out some queries.

⚠️ The API design is currently experimental and subject to change as the needs
of its users evolve over time.<br /> We plan to make more data available, such
as design tokens, compiled (HTML) examples, and more.
[Open an issue on GitHub](https://github.com/Shopify/polaris-react/issues) to share
your feedback and ideas.

---

## Fetching content from the API

### Pages

Here’s a simple JavaScript example that runs a query loading all pages and their
content, then displays the result in the console:

- [Edit on CodePen](https://codepen.io/kaelig/pen/OvXwbb?editors=0010)
- [Run the pages query in GraphiQL](https://polaris.shopify.com/api?query=%7B%0A%20%20pages%20%7B%0A%20%20%20%20name%0A%20%20%20%20slug%0A%20%20%20%20icon%0A%20%20%20%20keywords%0A%20%20%20%20sections%20%7B%0A%20%20%20%20%20%20htmlId%0A%20%20%20%20%20%20label%0A%20%20%20%20%20%20keywords%0A%20%20%20%20%20%20html%0A%20%20%20%20%20%20markdown%0A%20%20%20%20%20%20showInNavigation%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)

```js
const body = JSON.stringify({
  query: `
    {
      pages {
        name
        slug
        subtype
        icon
        keywords
        sections {
          htmlId
          label
          keywords
          html
          markdown
          showInNavigation
        }
      }
    }
  `,
});

fetch('https://polaris.shopify.com/api', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body,
})
  .then((response) => response.json())
  .then((json) => console.log(JSON.stringify(json, null, 2)));
```

### Components

Here’s a more advanced example that runs a query loading all components and
their content, then displays the result in the console:

- [Edit on CodePen](https://codepen.io/kaelig/pen/LBbZPM?editors=0010)
- [Run the components query in GraphiQL][graphql-components-query]

[graphql-components-query]: https://polaris.shopify.com/api?query=query%20ComponentsQuery(%24componentSlug%3A%20String)%20%7B%0A%20%20componentQuery%3A%20componentQuery(slug%3A%20%24componentSlug)%20%7B%0A%20%20%20%20componentLinks%3A%20components%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20slug%0A%20%20%20%20%20%20category%0A%20%20%20%20%20%20order%0A%20%20%20%20%20%20sections%20%7B%0A%20%20%20%20%20%20%20%20htmlId%0A%20%20%20%20%20%20%20%20label%0A%20%20%20%20%20%20%20%20keywords%0A%20%20%20%20%20%20%20%20showInNavigation%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20components%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20slug%0A%20%20%20%20%20%20category%0A%20%20%20%20%20%20intro%0A%20%20%20%20%20%20keywords%0A%20%20%20%20%20%20platforms%0A%20%20%20%20%20%20sections%20%7B%0A%20%20%20%20%20%20%20%20htmlId%0A%20%20%20%20%20%20%20%20label%0A%20%20%20%20%20%20%20%20keywords%0A%20%20%20%20%20%20%20%20html%0A%20%20%20%20%20%20%20%20markdown%0A%20%20%20%20%20%20%20%20showInNavigation%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20web%20%7B%0A%20%20%20%20%20%20%20%20reactName%0A%20%20%20%20%20%20%20%20hidePlayground%0A%20%20%20%20%20%20%20%20properties%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20mandatory%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20accessibility%0A%20%20%20%20%20%20%20%20examples%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20ios%20%7B%0A%20%20%20%20%20%20%20%20accessibility%0A%20%20%20%20%20%20%20%20examples%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20android%20%7B%0A%20%20%20%20%20%20%20%20accessibility%0A%20%20%20%20%20%20%20%20examples%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=ComponentsQuery

```js
const body = JSON.stringify({
  query: `
    query ComponentsQuery($componentSlug: String) {
      componentQuery: componentQuery(slug: $componentSlug){
        componentLinks: components {
          name
          slug
          category
          order
          sections {
            htmlId
            label
            keywords
            showInNavigation
          }
        }
        components {
          name
          slug
          category
          intro
          keywords
          platforms
          sections {
            htmlId
            label
            keywords
            html
            markdown
            showInNavigation
          }
          web {
            reactName
            hidePlayground
            accessibility
            properties {
              name
              type
              mandatory
              description
            }
            examples {
              name
              description
              slug
              code
            }
          }
          ios {
            accessibility
            examples {
              name
              description
              slug
              code
            }
          }
          android {
            accessibility
            examples {
              name
              description
              slug
              code
            }
          }
        }
      }
    }
 `,
});

fetch('https://polaris.shopify.com/api', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body,
})
  .then((response) => response.json())
  .then((json) => {
    console.log(JSON.stringify(json, null, 2));
  });
```

### For larger applications

The examples above are simple demos that may not scale to your project’s needs.

To fetch data in medium to large applications, we recommend using a complete
solution such as the
[Apollo client](https://github.com/apollographql/apollo-client).

<!-- THE CONTENT BELOW IS AUTOGENERATED. DO NOT EDIT DIRECTLY. -->

[//]: # 'GENERATED_CONTENT_CUTOFF'

---

## RootQueryType

The root query for this API returns data about both components and pages

### Fields

#### componentQuery([object Object]): <a href="#section-componentquery">ComponentQuery!</a>

| Name | Type   | Description                                          |
| ---- | ------ | ---------------------------------------------------- |
| slug | String | The url slug that refers to an individual component. |

#### pages(slug : String, categorySlug : String): <a href="#section-page">[Page!]!</a>

| Name         | Type   | Description                                                     |
| ------------ | ------ | --------------------------------------------------------------- |
| slug         | String | The url slug that refers to an individual page.                 |
| categorySlug | String | The url slug that refers to the category of an individual page. |

---

## ComponentQuery

The format of the query that returns components.

### Fields

#### errors: String

List of errors returned by a failing query

#### components: <a href="#section-component">[Component!]!</a>

List of components that match the given query.

---

## Component

A component in the system.

### Fields

#### name: String

The name of the component.

#### slug: String

The slug of the component.

#### category: String

The category of the component.

#### order: Int

The order of the component.

#### intro: String

The intro content of the component.

#### sections: <a href="#section-section">[Section!]!</a>

The sections of the component.

#### content: String

The content of the component.

#### platforms: String

The component’s examples availability for each platform.

#### web: <a href="#section-webcontent">WebContent!</a>

The component’s content for the web platform.

#### ios: <a href="#section-mobilecontent">MobileContent!</a>

The component’s examples for the iOS platform.

#### android: <a href="#section-mobilecontent">MobileContent!</a>

The component’s examples for the Android platform.

#### keywords: String

The keywords of the component.

#### deprecationNotice: String

A deprecation notice for the component if it exists.

---

## Section

A section in the document.

### Fields

#### label: String

The label of the section.

#### htmlId: String

The id of the section (in kebab-case, for use in the HTML).

#### keywords: String

The keywords of the section.

#### html: String

The content (in HTML format) of the section.

#### markdown: String

The content (in Markdown format) of the section.

#### showInNavigation: Boolean

Describes if the section should appear in the navigation.

---

## WebContent

Web-specific component fields.

### Fields

#### examples: <a href="#section-example">[Example!]!</a>

The examples for the component.

#### properties: <a href="#section-property">[Property!]!</a>

The properties for the component.

#### reactName: String

The React name of the component.

#### hidePlayground: Boolean

Hide the preview in code examples.

#### fullSizeExamples: Boolean

Remove space around examples when rendered.

#### accessibility: String

The web accessibility content for the component.

#### omitAppProvider: Boolean

Prevents automatic wrapping of examples with an AppProvider.

---

## Example

An example for a component.

### Fields

#### name: String

The name of the example.

#### description: String

The description of the example.

#### code: String

The code for the example.

#### slug: String

The slug of the example.

---

## Property

A property that the component accepts.

### Fields

#### path: String

The url path for the property.

#### parentPath: String

The url path for the parent property.

#### name: String

The name of the property.

#### type: String

The type of the property.

#### kind: String

The kind of type it is.

#### defaultValue: String

The default value for the property.

#### embeddedAppOnly: Boolean

Whether the prop is for embedded apps only or not.

#### tags: <a href="#section-tag">[Tag!]</a>

A list of all tags associated with a property.

#### returnType: <a href="#section-property">Property</a>

The return type of the method.

#### mandatory: Boolean

Whether the prop has to be provided or not.

#### description: String

The description of the property.

#### types: <a href="#section-property">[Property!]</a>

The nested types for the property.

---

## Tag

A tag and its value.

### Fields

#### tag: String

The tag name.

#### text: String

The value of the tag.

---

## MobileContent

Mobile-specific component fields.

### Fields

#### examples: <a href="#section-example">[Example!]!</a>

The mobile examples for the component.

#### accessibility: String

The mobile accessibility content for the component.

---

## Page

A page in the system.

### Fields

#### name: String

The name of the page.

#### slug: String

The slug of the page.

#### icon: String

The icon of the page.

#### intro: String

The intro of the page.

#### subtype: String

The subtype of the page.

#### sections: <a href="#section-section">[Section!]!</a>

The sections of the page.

#### keywords: String

The keywords of the page.
