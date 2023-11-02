---
title: Using motion
description: Motion brings dynamism to an interface, offers visual feedback and aids merchants understanding the outcomes of their actions.
keywords:
  - motion
  - animation
  - design
icon: PlayMinor
---

# Motion &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Section>
  <Row variant="1-2">
    <Column>
      ## Feedback

      Motion can be used to provide feedback, helping merchants understand the results of their actions. It offers visual cues that indicate the result of an interaction, reinforcing merchants' confidence in their actions.
    </Column>
    <Column variant="do">
      <video
        width="100%"
        height="auto"
        controls
        playsInline
        muted
        loop
      >
        <source
          src="/images/design/motion/using/01-feedback-do.mp4"
          type="video/mp4"
        />
        Table with animation of orders being selected, featuring a quick transition with a subtle checkmark animation.
      </video>
      Use motion to indicate the result of an action. So merchants understand their action has been acknowledged and processed.
    </Column>

  </Row>
</Section>

<Row variant="1-1">
  <Column variant="dont">
    <video
      width="100%"

      height="auto"
      controls
      playsInline
      muted
      loop
    >
      <source
        src="/images/design/motion/using/01-feedback-dont1.mp4"
        type="video/mp4"
      />
      Table with animation of orders being selected, featuring the entire entire row animating vertically.
    </video>
    Use motion that doesn't correspond to the action taken. Inconsistent feedback will lead to misunderstandings.

  </Column>

  <Column variant="dont">
    <video
      width="100%"

      height="auto"
      controls
      playsInline
      muted
      loop
    >
      <source
        src="/images/design/motion/using/01-feedback-dont2.mp4"
        type="video/mp4"
      />
        Table with animation of orders being selected, featuring the background filling in from left to right.
    </video>
    Use overly elaborate or lengthy animations for simple feedback.

  </Column>
</Row>

<Section>
  <Row variant="1-2">
    <Column>
      ## Navigation

      Motion can guide merchant attention during navigation, helping to maintain context and continuity. It creates a visual guide that helps merchants understand their path through the interface.
    </Column>
    <Column variant="do">
      <video
        width="100%"

        height="auto"
        controls
        playsInline
        muted
        loop
      >
        <source
          src="/images/design/motion/using/02-navigation-do.mp4"
          type="video/mp4"
        />
        A transition between two pages with a nest relationship, where elements are animated in a single horizontal motion, right to left when going deeper, left to right when going back.
      </video>
      Use motion to subtly guide attention during navigation. So merchants understand where to focus and what action to take next.
    </Column>

  </Row>
</Section>

<Row variant="1-1">
  <Column variant="dont">
    <video
      width="100%"

      height="auto"
      controls
      playsInline
      muted
      loop
    >
      <source
        src="/images/design/motion/using/02-navigation-dont1.mp4"
        type="video/mp4"
      />
      A transition between two pages with a nest relationship, where each element is animated with a slight delay to the previous.
    </video>
    Use motion that distracts from the navigation process. Excessive or irrelevant motion can confuse merchants and detract from the main content or action.

  </Column>
  <Column variant="dont">
    <video
      width="100%"

      height="auto"
      controls
      playsInline
      muted
      loop
    >
      <source
        src="/images/design/motion/using/02-navigation-dont2.mp4"
        type="video/mp4"
      />
      A transition between two pages with a nest relationship, where the header is animated separately from the main content, both with a vertical motion.
    </video>
    Use motion that could potentially mislead merchant's navigation path. The direction and behavior of the motion should align with the navigation flow.

  </Column>
</Row>

<Section>
  <Row variant="1-2">
    <Column>
      ## Loading

      Motion can be used to indicate loading states, keeping merchants informed and engaged during wait times. It provides a visual indicator that the system is processing a request, helping to manage expectations and reduce perceived wait times.
    </Column>
    <Column variant="do">
      <video
        width="100%"

        height="auto"
        controls
        playsInline
        muted
        loop
      >
        <source
          src="/images/design/motion/using/03-loading-do.mp4"
          type="video/mp4"
        />
        An outlined three quarters of a circle spinning.
      </video>
      Use loading animations that give a sense of progress or activity. A clear visual cue that the system is processing helps to manage merchant expectations, and helps to reduce perceived wait times.

    </Column>

  </Row>
</Section>

<Row variant="1-1">
  <Column variant="dont">
    ![An icon representing an hourglass.](/images/design/motion/using/03-loading-dont1@2x.png)

    Use static loading indicators, as they make the system seem unresponsive or slow.

  </Column>

  <Column variant="dont">
    <video
      width="100%"

      height="auto"
      controls
      playsInline
      muted
      loop
    >
      <source
        src="/images/design/motion/using/03-loading-dont2.mp4"
        type="video/mp4"
      />
      An loop animation with an hourglass filling up and spinning.
    </video>
    Use overly complex or distracting loading animations. The animation should be subtle and not detract from the rest of the interface.

  </Column>
</Row>
