---
'@shopify/polaris': patch
---

Fix PortalsManager to avoid setting state synchronously during a render pass which prevented it from working properly with Suspense.
