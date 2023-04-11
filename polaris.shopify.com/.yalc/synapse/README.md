node --experimental-loader ./dist/index.js

## Using Synapse

TODO: publish to internal registry and update this. In the meantime consumers of Synapse can import it as a dependency directly from Github.

Synapse comes with two tools:

1. A CLI that helps you transform your data into [embeddings](https://platform.openai.com/docs/guides/embeddings).
2. A TypeScript utility library that you can use to compare input to those embeddings, and use the result to craft context-aware prompts/messages to send to OpenAI for completion.

### Using the Synapse CLI

You'll need to add `commander` to your project. `yarn add -D commander fast-glob tsx`.

To use the CLI make a `synapse.config.mts` in the root of your project.

#### Commands

generate all embeddings
`npx tsx ./path/to/synapse/src/cli.ts embeddings`

- generate embeddings for a synapse group (as you define in synapse.config.mts)
`npx tsx ./path/to/synapse/src/cli.ts embeddings --name examples`

### Using the Synapse TS lib

Note that Synapse is packed in ESM format, which is supported in Node once you get things setup correctly. ESM format is nice because it can import both ESM and Commonjs dependencies. See [ESM & Node & TypeScript](https://www.typescriptlang.org/docs/handbook/esm-node.html).

Here is a sample Node/TypeScript server configured properly for ESM, that uses Synapse: [Shopify/test-synapse](https://github.com/Shopify/test-synapse).

TODO: document the various functions. In the meantime see test-synapse for an example.

## Development on Synapse

Clone this repo and run `dev up`.

### setup OpenAI
To run the tests you'll need an OpenAI account & secret. If you want to use Shopify's talk to your lead (or Teddy Hwang, he's great).

The tests use [ejson2env](https://github.com/Shopify/ejson2env) to safely store OpenAI key in the repo.

Once you have your key, copy it and then run `dev ejson-paste`.

### run Synapse in dev mode

`yarn dev` will start the [tsup](https://tsup.egoist.dev/) bundler in watch mode, outputting the result to `/dist/*`.
