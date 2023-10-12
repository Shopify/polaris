---
title: Motion
description: Motion brings dynamism to an interface, offers visual feedback, and aids merchants understanding the outcomes of their actions.
order: 6
showTOC: true
keywords:
  - animation
  - motion
  - movement
  - interaction
  - transition
hideChildren: true
status: New
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Purposeful

Motion has a clear purpose. It helps merchants understand the interface and the results of their actions, instead of being used as decoration or entertainment.

<Grid
  gap="400"
  areas={{xs: ['aaaaaa', 'bbbbbb'], lg: ['a a a a a a b b b b b b']}}
>
  <Grid.Cell area="a">
    <Do>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/01-purposeful-do.mp4"
          type="video/mp4"
        />
        Transition between two menu items, featuring a quick subtle transition that
        animates elements that were already in view.
      </video>
      Use motion to enhance merchant understanding and provide context.
    </Do>
  </Grid.Cell>
  <Grid.Cell area="b">
    <Dont>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/01-purposeful-dont.mp4"
          type="video/mp4"
        />
        Transition between two menu items, featuring a elaborate transition that
        animates all elements that change on the page.
      </video>
      Allow motion to complicate the interface or hinder merchant comprehension.
    </Dont>
  </Grid.Cell>
</Grid>

## Responsive

Motion should be a reaction to merchant interactions, providing immediate visual feedback, and making the interface feel alive and responsive.

<Grid
  gap="400"
  areas={{xs: ['aaaaaa', 'bbbbbb'], lg: ['a a a a a a b b b b b b']}}
>
  <Grid.Cell area="a">
    <Do>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/02-responsive-do.mp4"
          type="video/mp4"
        />
        An animation of a tick mark that mimics how one draws it on a page.
      </video>
      Use motion to provide feedback on merchant actions. The scale of the motion
      should match the scale of the action performed.
    </Do>
  </Grid.Cell>
  <Grid.Cell area="b">
    <Dont>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/02-responsive-dont.mp4"
          type="video/mp4"
        />
        An elaborate animation of the tick mark that fills in the container and rotates
        the tick mark.
      </video>
      Allow motion to complicate the interface or hinder merchant comprehension.
    </Dont>
  </Grid.Cell>
</Grid>

## Snappy

Motion should feel quick and subtle.

A snappy animation starts rapidly, and slows down towards the end, making the transition feel quick while still providing a cue as to where things are coming from, making the motion feel more natural.

<Grid
  gap="400"
  areas={{xs: ['aaaaaa', 'bbbbbb'], lg: ['a a a a a a b b b b b b']}}
>
  <Grid.Cell area="a">
    <Do>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/03-snappy-do.mp4"
          type="video/mp4"
        />
        Quick transition with a dropdown menu moving into position
      </video>
      Make motion feel snappy. This gives the animation a lively and energetic feel
      that doesn’t get in the way of merchants.
    </Do>
  </Grid.Cell>
  <Grid.Cell area="b">
    <Dont>
      <video width="100%" height="auto" controls playsInline muted loop>
        <source
          src="/images/design/motion/overview/03-snappy-dont.mp4"
          type="video/mp4"
        />
        Dropdown menu showing up instantly without a transition.
      </video>
      Use abrupt, instant, or distracting motion, as these make it hard to follow
      along with changes happening on the interface.
    </Dont>
  </Grid.Cell>
</Grid>
