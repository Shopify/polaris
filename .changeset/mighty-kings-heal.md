---
'@shopify/polaris-icons': patch
---

- Remove fill as we already remove it as a plugin with rollup
- Fix svgo config as the convertPathData was not correctly running with the overridden option
- Add a new test to make sure that optimized svg code matches the code in the .svg file
- Remove unnecessary tests that are resolved with svgo config
- Reduce icons library SVG size by 383.75kb
