# Contributing to `polaris-for-vscode`

We love receiving pull requests! Please read the `polaris` contributing docs for general guidance on contributing to this codebase.

## Extension Development Workflow

The development workflow for a VS Code Extension is built right into the VS Code Editor. Check out the [VS Code API Docs](https://code.visualstudio.com/api/get-started/your-first-extension#developing-the-extension) for more guidnace on the VS Code extension development workflow. To get started with this project:

1. Clone the [`polaris` repo](https://github.com/Shopify/polaris)
1. Install all dependencies and build packages

   ```sh
   pnpm install
   yarn build
   ```

1. Open the [VS Code debugger](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension) (<kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>D</kbd>)
1. Select `polaris-for-vscode: debug` and press <kbd>F5</kbd>) to start debugging
1. This will open up a new `Extension Development Host` window
1. Open a `.css` or `.scss` file of your choosing in the `Extensions Development Host` window
1. Start typing the extension trigger characters `--` to bring up the Polaris custom properties autocomplete
1. You're ready to make changes to `polaris-for-vscode` 🎉
