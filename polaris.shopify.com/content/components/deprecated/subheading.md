---
title: Subheading
category: Deprecated
keywords:
  - title bar
  - top-level
  - description
  - sub-section titles
  - titles of sub-sections
  - subsection titles
  - titles of subsections
status: Deprecated
---

# {frontmatter.title}

<Lede>

Subheadings are used for the title of any sub-sections in top-level page sections.

</Lede>

<StatusBanner status={frontmatter.status}>
  This component is no longer supported. Please use the Text component instead.
</StatusBanner>

<Examples />

<Props componentName={frontmatter.title} />

## Mapping to the Text component

```diff
- <Subheading>Accounts</Subheading>
+ <Text variant="headingXs" as="h3">Accounts</Text>
```

---
