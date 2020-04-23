# `yarn splash` (beta)

`yarn splash` is a command-line interface to observe the splash zone of a change across the component library.

It answers the question:

> When I modify a component, what parts of the system did that also touch (also known as the change’s “splash zone”)?

## How to use `yarn splash`

1. Edit files in `src/`, such as components 🧩 and style sheets 🎨.
2. As you run `yarn dev`, `yarn splash` will run in the background. Keep an eye on the terminal to see the splash zone of your changes in the working directory.

   💡 Tip: to disable these reports, run `DISABLE_SPLASH=1 yarn dev`

💡 Tip: <kbd>command</kbd> + click a file path to open it in your text editor

## Feedback and bug reports

Found an issue or want to share feedback?

Reach out on Slack in [#polaris](https://shopify.slack.com/archives/C4Y8N30KD).
