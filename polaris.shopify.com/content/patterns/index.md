---
title: Patterns
description: Preferred solutions to common merchant goals in the admin.
icon: BehaviorMajor
order: 6
newSection: true
---

<Stack gap="800">

  <div>

    # {frontmatter.title}

    <Lede>{frontmatter.description}</Lede>

    <StatusBanner status={frontmatter.status}>
      The pattern documentation is evolving. [Join the
      discussion](https://github.com/Shopify/polaris/discussions/categories/pattern-documentation)
      to make it better.
    </StatusBanner>

  </div>

{' '}

<RichCardGrid cards={posts} />

{' '}

<span id="legacy" />

## Archived documentation

{' '}

<Lede>
  These guidelines are safe to use and will be updated to the new documentation
  format in the near future.
</Lede>

{' '}

<RichCardGrid cards={legacyPatternPosts} />

</Stack>
