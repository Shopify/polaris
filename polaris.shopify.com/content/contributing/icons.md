---
title: Contributing to Polaris Icons
navTitle: Icons
keywords:
  - icons
  - add a new icon
  - deprecate an icon
  - update an icon
  - how to contribute to polaris icons
order: 3
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

Icons are important visual aids that help merchants understand actions and concepts across the Shopify Admin. Whether your team needs to add, modify, or deprectate an icon, all designers and developers that work at Shopify are welcome to contribute.

Before proposing a new icon, search the [icon explorer](https://polaris.shopify.com/icons). If the icon you’re looking for isn’t included, create a proposal for the new icon and work with your team to add it. Any additions or changes should also be reflected in the [Figma UI Kit](/contributing/figma-ui-kit).

To learn about best practices for designing and using Polaris icons, read the [icon design guidelines](https://polaris.shopify.com/design/icons). If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community before opening an issue, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).

## Designing a new icon

1. Read the [design guidelines](https://polaris.shopify.com/design/icons/creating-icons) so you have an understanding of the icon design language.
2. If you are designing a new icon:
   <br /> - Design the new icon following the design language guidance.
   <br /> - Please save an unflattened version of your icon where all the strokes
   are live and things can be easily changed in case updates need to happen in the
   future.
   <br /> - Request feedback from a Polaris designer.
3. If you need assistance designing the new icon:
   <br /> - Reach out in the #polaris Slack channel requesting a new icon. If
   possible, have some concepts or ideas around the icon you need when you reach
   out.
   <br /> - A designer will reach out to get context and information around what
   you need, deadlines and other relevant information.
   <br /> - A designer will work with you to design an icon that meets your
   team’s needs with your feedback along the way.
4. Once the design is complete continue to add it to both the Figma library and the Polaris Icon package.

## Adding to Figma

1. Duplicate your unflattened working icon.
2. Create a branch in the [Polaris Icons (unflattened)](<https://www.figma.com/file/oeKyR0kuHIMktdVjdLHJvy/Polaris-Icons-(unflattened)?type=design&node-id=308-158&mode=design&t=jBRTBE9dSDwWTi3V-11>) file and add your working icon to the group that makes the most sense.
   <br /> - Convert your icon into a component
   <br /> - Rename the component follwing the established convention. This name will
   also be used in the Polaris Icon package.
3. Request a review and merge from a Polaris designer.
4. Flatten the other icon by expanding all strokes and then combining them into a single shape using the [boolean operations](https://help.figma.com/hc/en-us/articles/360039957534-Boolean-operations). Once into a single shape, flatten the entire vector by hitting 'Command + E'.
5. Create a branch in the [Polaris Icon Library](https://www.figma.com/file/fVIazfJNe3AOJTJmBKgTO9/Polaris-Gen-3-Icons?type=design&node-id=753-2&mode=design&t=dpxRTbWHU6wBZi9k-11) adding your icon to the appropriate page
   <br /> - Convert your icon into a component.
   <br /> - Rename the component follwing the established convention. This name will
   also be used in the Polaris Icon.c
6. Export flattened component as svg.
7. Request a review and merge from a Polaris designer.

## Adding to the codebase

### Add it to our Github board

If you are not familiar or comfortable submitting a pull request directly you can simply add any icon update directly to our Github board and a Polaris team member will submit a pull request for you. This will be done in batches every two weeks.
1. Create an issue in the Polaris repository. 
   <br /> - Use the [Propose new icon](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Icon%2Cuntriaged&projects=&template=NEW_ICON.yml&title=%5BIcon%5D%3A+New+icon+%3Cicon-name%3E) issue template for new icon contributions
   <br /> - Use the [Propose updates to an existing icon](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Icon%2Cuntriaged&projects=&template=UPDATE_ICON.yml&title=%5BIcon%5D%3A+Update+icon+%3Cicon-name%3E) issue template for updates to current Polaris icons.
2. Provide as much information and context as you have. 
   <br /> - Relevant screenshots or links to design files detailing the user experience are very valuable.
   <br /> - Please indicate if you have or plan to contribute these icon updates to the Figma library as well.

### Submit your own PR

1. Create a new branch and open the Polaris Icons package in VS Code.
2. Copy and rename the icon template files found in the `ICON_TEMPLATES` folder.
   <br /> - Name should match assets in Figma.
3. Open your exported file and add the icon SVG to the `.svg` file.
   <br /> - Only add the actual svg `path` data. Don't edit any of the data inside the `svg` tag itself. 
   <br /> - Remove any `clip-path` meta data that Figma may have added. It isn't needed.
4. Add the icon metadata to the `.yml` file.
5. If you are editing an existing icon:
   <br /> - Replace the existing icon SVG in the `.svg` file.
   <br /> - Update the relevant metadata in the `.yml` file.
6. Open a terminal inside VS Code and run `yarn changeset` to add an entry to the change log and release notes.
   <br /> - Use the "Return" key to skip to the next prompt and the "Spacebar" to make a selection.
   <br /> - Icons contributions should always be a `Minor` release.
7. Commit your changes and open a pull request in the Shopify/polaris GitHub repo.
8. Request review from a Polaris team member.
