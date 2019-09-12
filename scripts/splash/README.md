# `yarn splash` (beta)

`yarn splash` is a command-line interface to observe the splash zone of a change across the component library.

It answers the question:

> When I modify a component, what parts of the system did that also touch (also known as the change’s “splash zone”)?

## How to use `yarn splash`

1. Edit files in `src/`, such as components 🧩 and style sheets 🎨
2. Run `yarn splash` to see the splash zone of your changes in the working directory

## Tips

- <kbd>command</kbd> + click a file path to open it in your text editor
- `yarn splash --watch` continuously looks for changes in the working directory and updates the list of impacted files in real-time

## Feedback and bug reports

Found an issue or want to share feedback?

Reach out on Slack in [#polaris-tooling](https://shopify.slack.com/messages/CCNUS0FML).
