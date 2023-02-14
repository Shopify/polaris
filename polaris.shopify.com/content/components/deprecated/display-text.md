---
title: Display text
description: Display styles make a bold visual statement. Use them to create impact when the main goal is visual storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to capture attention during onboarding.
category: Deprecated
keywords:
  - DisplayText
  - announcement text
  - greeting text
  - marketing text
  - title text
  - biggest text
  - bigger text
  - big text
  - large text
  - larger text
  - largest text
  - strong text
  - bold text
  - bold statements
  - extra large display text
  - medium and large display text
  - small display text
  - visual story telling
  - visual storytelling
  - visual statements
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingLg" as="p">Sales this year</Text>
```

### Medium

```diff
- <DisplayText size="medium">Sales this year</DisplayText>
+ <Text variant="headingXl" as="p">Sales this year</Text>
```

### Large

```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text variant="heading2xl" as="p">Sales this year</Text>
```

### Extra large

```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text variant="heading4xl" as="p">Sales this year</Text>
```

---
