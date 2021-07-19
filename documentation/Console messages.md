# Console message guidelines

A console message provides developers with information that helps with debugging and maintaining code. Types of console messages include `Deprecation` and `Recommendation`.

## Content guidelines

It’s important to write console messages consistently and succinctly so it’s easy for developers to scan and understand quickly. To do this, follow this general content formula (fill in the blanks):

```js
console.type('[prefix] message [url]');
```

Pro tip: Always mention the affected component.

### Selecting the right message type

- Use `warn` for messages that call for action, like `Deprecation`and `Recommendation` messages.

```js
console.warn(
  'Deprecation: The `title` property on Tabs has been deprecated. Use `content` instead.',
);
```

- For informative messages, use `info`

```js
console.info('Your project is currently using v1.8.6');
```

- If more than one message is necessary, wrap them with `group` and `groupEnd`

```js
console.group('Polaris');
console.info('Your project is currently using v1.18.0');
console.warn(
  'Deprecation: The `title` property on Tabs has been deprecated. Use `content` instead. Read more in the v2.0.0 upgrade guide https://github.com/Shopify/polaris-react/blob/main/CHANGELOG.md#tabs-no-longer-accept-title-prop',
);
console.groupEnd();
```

### Selecting the right prefix

- Use `Deprecation` for messages that warn developers when component APIs are in the process of being replaced. It’s important to notify developers of breaking changes ahead of their release.
- Use `Recommendation` for messages that suggest actions that will optimize a developer workflow. For example, upgrading to a new version of the `@shopify/polaris` npm package.

### Providing next steps and a call to action

Whenever possible provide a way for the developer to fix their code and if documentation is available, link to it.

For example: `Read more at [url]`
