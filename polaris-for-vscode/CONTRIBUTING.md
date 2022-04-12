# Contributing to `polaris-for-vscode`

We love receiving pull requests! Please read the `polaris` contributing docs for general guidance on contributing to this codebase.

## Extension Development Workflow

The development workflow for a VSCode Extension is built right into the VSCode Editor. Check out the [VSCode API Docs](https://code.visualstudio.com/api/get-started/your-first-extension#developing-the-extension) for more guidnace on the VSCode extension development workflow. To get started with this project:

1. Download the [`polaris` project](https://github.com/Shopify/polaris)
2. Open the `polaris-react/polaris-for-vscode` directory in a dedicated VSCode window
3. Install all dependencies

```bash
yarn
```

4. Run the `generateCustomPropertyNames` script to create the tokens file

```bash
yarn run generateCustomPropertyNames
```

5. Run the `build` command with `cmd + shift + B`. This will start the server in watch mode.
6. Press `F5` to run the client using the [VSCode debugger](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension). This will open up a new `Extension Development Host` window
7. Open a `.css` or `.scss` file of your choosing in the `Extensions Development Host` window
8. Start typing the extension trigger characters `--` to bring up the Polaris custom properties autocomplete
9. You're ready to make changes to `polaris-for-vscode` 🎉
