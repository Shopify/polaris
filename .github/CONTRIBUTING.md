# How to contribute

Polaris React is Shopify's largest open source project. It is the only project that is both under very active development and is used to build Shopify and Shopify apps every day. We want to make it as easy and transparent as possible to contribute to this project. Hopefully this document makes the process for contributing clear and answers some questions that you may have. If we are missing anything or can make the process easier in any way, [please let us know][polaris-email].

## Code of conduct

We expect all participants to read our [code of conduct][code-of-conduct] to understand which actions are and are not tolerated.

## Open development

All work on Polaris React happens directly on GitHub. Both team members and external contributors send pull requests which go through the same review process.

## Branch organization

We do our best to keep `master` releasable as a minor or patch version at all times, with work for major releases happening in separate branches. [Breaking changes][breaking-changes] should never be merged directly to `master` unless part of a major release branch.

If you send a pull request, please do it against the `master` branch. If your pull request contains breaking changes, please target the branch for the next major release and open a second pull request against `master` that introduces the deprecation warnings once your changes are accepted. If you are unsure if the changes are considered breaking or not, open your pull request against the `master` branch and let us know. We understand it can be uncomfortable asking for help and this is why we have a [code of conduct][code-of-conduct] to ensure the community is positive, encouraging, and helpful.

## Semantic versioning

Polaris React follows semantic versioning. We release [patch versions for bug fixes][patches], [minor versions for new features][minor], and [major versions for any breaking changes][breaking-changes]. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance.

We tag every pull request with a label marking whether the change should go in the next patch, minor, or a major version. We release new patch versions most weeks, minor versions every couple weeks, and major versions one or two times a year.

Every significant change is documented in the [CHANGELOG][changelog]. We have a Probot 🤖 to remind you to include a CHANGELOG entry.

## Bugs

### Where to find known issues

We track all of our issues in GitHub and [bugs][bugs] are labeled accordingly. If you are planning to work on an issue, avoid ones which already have an assignee, where someone has commented within the last two weeks they are working on it, or the issue is labeled with [fix in progress][fix-in-progress]. We will do our best to communicate when an issue is being worked on internally.

### Reporting new issues

Take a look through open issues before filing a new one to help avoid duplicates. When [opening an issue][issue], complete as much of the template as possible. The best way to get your bug fixed is to provide a reduced test case. [This CodeSandbox template][codesandbox] is a great starting point.

## Feature requests

Before requesting a feature, search the [existing feature requests][existing-feature-requests]. You can [:+1: upvote][github-conversations-help] feature requests to help the Polaris team set priorities. If a feature request is closed, you can still upvote! A closed feature request means it’s not something we’re currently working on, but we take all your input into account when planning what to work on next.

Otherwise, [request a feature][feature-request].

## How to get in touch

- Slack: [#polaris on Shopify Partners Slack][polaris-partners-slack]
- Discussion: Shopify Polaris Forums (link TBD)

## Proposing a change

If you intend to build a new component, change a public API, or make any non-trivial changes, [we recommend filing an issue][feature-request]. This lets us discuss and reach an agreement on your proposal before you put significant time and effort into it.

Please use [this template for proposing new components or changes to existing components][new-component].

If you're only fixing a bug, it's okay to submit a pull request right away but we still recommend you file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

## Your first pull request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub][egghead-contributing]

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues][good-first-issues] that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take it over but you should still leave a comment.

### Sending a pull request

We'll review your pull request and either merge it, request changes to it, or close it with an explanation. We'll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from `master`
1. Run `yarn` in the repository root
1. If you've fixed a bug or added code that [should be tested][best-practices-testing], add tests
1. Ensure the test suite passes with `yarn test` (protip: `yarn test:watch TestName` is helpful in development)
1. If your pull request contains SVG run `yarn optimize`
1. Format your code with `yarn format`
1. Make sure your code lints with `yarn lint`
1. Run the TypeScript compiler with `yarn ts`
1. [Tophat 🎩][tophatting] your changes locally with `yarn dev`
1. If you haven't already, complete the CLA

### Contributor License Agreement (CLA)

Each contributor is required to sign a CLA. This process is automated as part of your first pull request and is only required once. If any contributor has not signed or does not have an associated GitHub account, the CLA check will fail and the pull request is unable to be merged. You can sign an individual CLA or sign a corporate CLA on behalf of your GitHub organization. All public members of a GitHub organization with a signed corporate CLA will not have to sign an individual CLA.

### Contribution prerequisites

- You have Node installed at v8.11.2+ and Yarn at v1.7.0+
- You are familiar with Git

### Best practices

Take a look at [our best practices][best-practices] which include [testing][best-practices-testing], [React testing][best-practices-react-testing], [Jest][best-practices-jest], and [Enzyme][best-practices-enzyme]. We will be continuing to add best practices here.

### Development workflow

After cloning Polaris React, run `yarn` to fetch its dependencies. Then, you can run several commands:

- `yarn dev` runs a local development server and mounts [`playground/Playground.tsx`][playground]
- `yarn test` runs the complete test suite.
- `yarn test:watch` runs an interactive test watcher
- `yarn test <pattern>` runs tests with matching filenames
- `yarn tophat` runs a local development server and mounts all of the component examples

We recommend running `yarn test` (or its variations above) to make sure you don't introduce any regressions as you work on your change. However it can be handy to try your build of Polaris React in a real project.

Run `yarn run build-consumer <project>` where `<project>` is the directory the build will be copied. **The `<project>` directory must be a sibling of the `polaris-react` directory**.

```sh
# Example
yarn run build-consumer polaris-styleguide
```

In the example above, the build is copied to `polaris-styleguide/node_modules/@shopify/polaris`. And in this case, a rebuild of `polaris-styleguide` is required after copying the `polaris-react` build, but may not be the case for all consuming projects.

### Code style

We use an automatic code formatter called [Prettier][prettier]. Run `yarn format` after making any changes to the code.

Linting will catch common issues that may exist in your code. You can check the status of your code styling by running `yarn lint`.

Our code editor of choice is [VS Code][vs-code] which has [integrations with Prettier][vs-code-prettier] and our linting tools which make this automatic. If you choose to use VS Code, these integrations will be listed as recommended extensions (or search for `@recommended`) in the extensions panel.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [our JavaScript style guide][shopify-javascript] will guide you in the right direction.

## License

By contributing to Polaris React, you agree that your contributions will be licensed under its MIT license.

[polaris-email]: mailto:polaris@shopify.com
[code-of-conduct]: https://github.com/Shopify/polaris-react/blob/master/.github/CODE_OF_CONDUCT.md
[breaking-changes]: https://github.com/Shopify/polaris-react/blob/master/documentation/Versioning%20and%20changelog.md#major
[patches]: https://github.com/Shopify/polaris-react/blob/master/documentation/Versioning%20and%20changelog.md#patch
[minor]: https://github.com/Shopify/polaris-react/blob/master/documentation/Versioning%20and%20changelog.md#minor
[changelog]: https://github.com/Shopify/polaris-react/blob/master/CHANGELOG.md
[bugs]: https://github.com/Shopify/polaris-react/labels/Bug
[fix-in-progress]: https://github.com/Shopify/polaris-react/labels/fix%20in%20progress
[issue]: https://github.com/Shopify/polaris-react/issues/new?template=ISSUE.md
[codesandbox]: https://codesandbox.io/s/q82mlq0m26
[existing-feature-requests]: https://github.com/Shopify/polaris-react/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc
[feature-request]: https://github.com/Shopify/polaris-react/issues/new?template=FEATURE_REQUEST.md
[polaris-partners-slack]: https://shopifypartners.slack.com/messages/C8PTBMWNR/
[github-conversations-help]: https://help.github.com/articles/about-conversations-on-github/
[new-component]: https://github.com/Shopify/polaris-react/issues/new?template=NEW_COMPONENT.md
[egghead-contributing]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[good-first-issues]: https://github.com/Shopify/polaris-react/labels/good%20first%20issue
[best-practices-testing]: https://github.com/Shopify/web-foundation/blob/master/Best%20practices/Testing.md
[tophatting]: https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md
[best-practices]: https://github.com/Shopify/web-foundation/tree/master/Best%20practices
[best-practices-react-testing]: (https://github.com/Shopify/web-foundation/blob/master/Best%20practices/React/Testing.md)
[best-practices-jest]: https://github.com/Shopify/web-foundation/blob/master/Best%20practices/Jest.md
[best-practices-enzyme]: https://github.com/Shopify/web-foundation/blob/master/Best%20practices/Enzyme.md
[playground]: https://github.com/Shopify/polaris-react/blob/master/playground/Playground.tsx
[prettier]: https://prettier.io/
[vs-code]: https://code.visualstudio.com/
[vs-code-prettier]: https://github.com/prettier/prettier-vscode
[shopify-javascript]: https://github.com/Shopify/javascript
