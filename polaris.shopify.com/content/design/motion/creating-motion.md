---
title: Creating Motion
description: Motion brings dynamism to an interface, offers visual feedback and aids merchants understanding the outcomes of their actions.
keywords:
  - motion
  - animation
  - design
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Transition

Transitions should be smooth and fluid, guiding merchants’ attention and maintaining context as they navigate the interface. They play a crucial role in ensuring continuity in the experience.

<Stack gap="400">
  <Do>
    <video
      width="100%"
      height="auto"
      controls
      autoPlay
      muted
      loop
    >
      <source
        src="/images/design/motion/creating/01-transition-do.mp4"
        type="video/mp4"
      />
      Search card interface quickly animating into place.
    </video>
    Use transitions to guide merchants’ attention and provide continuity. Ensuring
    transitions preserve the state and context of the interface.
  </Do>

<Grid
  gap="400"
  areas={{xs: ['aaaaaa', 'bbbbbb'], lg: ['a a a a a a b b b b b b']}}
>
  <Grid.Cell area="a">
    <Dont>
      <video
        width="100%"
        height="auto"
        controls
        autoPlay
        muted
        loop
      >
        <source
          src="/images/design/motion/creating/01-transition-dont-1.mp4"
          type="video/mp4"
        />
        Search card interface quickly animating into place.
      </video>
      Use abrupt transitions that can disorient merchants.
    </Dont>
  </Grid.Cell>
  <Grid.Cell area="b">
    <Dont>
      <video
        width="100%"
        height="auto"
        controls
        autoPlay
        muted
        loop
      >
        <source
          src="/images/design/motion/creating/01-transition-dont-2.mp4"
          type="video/mp4"
        />
        Search card interface quickly animating into place.
      </video>
      Animate all elements on a page simultaneously. Overwhelming motion can disorient
      users and break continuity. Animating a single element often can be enough
      to provide sufficient context and maintain a sense of continuity.
    </Dont>
  </Grid.Cell>
</Grid>
</Stack>

## Animation

Animations should be simple and purposeful, used to enhance understanding or provide visual feedback.

<DoDont>

#### Do

  <video
    width="100%"
    height="auto"
    controls
    autoPlay
    muted
    loop
  >
    <source
      src="/images/design/motion/creating/02-animation-do.mp4"
      type="video/mp4"
    />
    Checkbox animation mimicking the real world.
  </video>
  Use simple, meaningful animations that are consistent with the overall style
  and tone of the interface. 
  
  #### Dont
  <video
    width="100%"
    height="auto"
    controls
    autoPlay
    muted
    loop
  >
    <source
      src="/images/design/motion/creating/02-animation-dont.mp4"
      type="video/mp4"
    />
    Elaborate checkmark animation, with a background and the checkbox scaling up.
  </video>
  Use complex or unnecessary animations that can confuse or distract merchants.
</DoDont>

## Timing

Timing is crucial in motion design. Motion is fast enough to not cause delay, but slow enough to be understood.

<DoDont>

#### Do

  <video
    width="100%"
    height="auto"
    controls
    autoPlay
    muted
    loop
  >
    <source
      src="/images/design/motion/creating/03-timing-do.mp4"
      type="video/mp4"
    />
    Tooltip moving to place with a quick animation.
  </video>
Use appropriate timing for your animations and transitions. Matching the timing of the motion to merchant expectations.
  
  #### Dont
  <video
    width="100%"
    height="auto"
    controls
    autoPlay
    muted
    loop
  >
    <source
      src="/images/design/motion/creating/03-timing-dont.mp4"
      type="video/mp4"
    />
    Tooltip moving to place with a slow animation.
  </video>
  Make motion too slow or too fast.
</DoDont>
