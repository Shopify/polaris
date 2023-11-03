---
title: Components
order: 7
icon: Apps
previewImg: /images/components.png
---

# {frontmatter.title}

<Lede>

Components are the reusable building blocks for creating Shopify admin experiences.

</Lede>

<Stack gap="1200">
{posts.map(group => <Box>

<h2>{group.title}</h2>

<RichCardGrid cards={group.children} />

</Box>)}
</Stack>
