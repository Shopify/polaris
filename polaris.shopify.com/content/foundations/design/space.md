---
name: Space
keywords:
  - spacing
  - space
  - layout
  - grid
  - position
  - margin
  - padding
---

<!-- inline css styling for html video and images -->
<style>
.space-hero {
  margin: 40px -30px 40px -30px;
}

.punit-img {
  display: block;
  margin: 40px auto 40px auto;
  width: 75%;
}

.video-wrap {
  border: 1px solid #E1E3E5;
  border-radius: 8px; 
  overflow: hidden;
}
</style>

---

# Space

Space is the distance between objects in your design. It should be used to organize information in a way that is familiar and easy to scan, while helping reinforce its purpose.

<div class="space-hero">
  <img src="/images/foundations/design/spacing/spacing-polaris-size-units.svg" alt="A visual example of a polaris unit">
</div>

---

## Principles

![Illustrations of blocks representing each principle](/images/foundations/design/spacing/principles.svg)

### 1. Make content easy to understand.

Guides merchants' eyes, rather than expecting them to decipher all the information.

### 2. Augment the purpose of a page.

Make sure the information is organized in a way that makes clear its function.

### 3. Make it feel integrated.

Merchants experience pages, space should feel like a small part of a bigger system. Only introduce uniqueness when the benefits massively outweigh the cost of inconsistency.

---

## Spacing tools

### Polaris size units

All measurements used across the experience (space, width, height, etc) must reference Polaris size units to guarantee visual consistency and balance.

<div class="punit-img">
  <img src="/images/foundations/design/spacing/spacing-polaris-units.svg" alt="A visual example of a polaris unit">
</div>

### Size scale

| Value    | Size         | px value | rem value |
| -------- | ------------ | -------- | --------- |
| 0        | --p-size-0   | 0        | 0         |
| 0.25     | --p-size-025 | 1        | 0.0625    |
| 0.5      | --p-size-05  | 2        | 0.03125   |
| **1 (base)** | --p-size-1   | 4        | 0.25      |
| 2        | --p-size-2   | 8        | 0.5       |
| 3        | --p-size-3   | 12       | 0.75      |
| 4        | --p-size-4   | 16       | 1         |
| 5        | --p-size-5   | 20       | 1.25      |
| 6        | --p-size-6   | 24       | 1.5       |
| 8        | --p-size-8   | 32       | 2         |
| 10       | --p-size-10  | 40       | 2.5       |
| 12       | --p-size-12  | 48       | 3         |
| 16       | --p-size-16  | 64       | 4         |
| 24       | --p-size-24  | 96       | 6         |
| 32       | --p-size-32  | 128      | 8         |

Polaris units are more dense at a small scale, and less so as dimensions increase.
This is intentional to provide a good range to work with, but you must be deliberate in the units you decide to pair. We encourage designing with rhythm and contrast to achieve clear visual hierarchy. This often means skipping at least one unit in the scale when you’re pairing different sizes.

![Examples of different variations of spacing](/images/foundations/design/spacing/spacing-scale-examples@2x.png)

Repeating the same amount of spacing (left) and using more variation (right).

<br>

### Column grid

The column grid is meant to give teams agency for page layouts, while still providing low level constraints that ensure consistent pages across the experience. This means teams should feel empowered to experiment with layout, as long as they use the column grid as a grounding element.

<div class="video-wrap">
  <video width="100%" height="auto" controls autoplay muted loop>
    <source src="/images/foundations/design/spacing/column.mp4" type="video/mp4">
  </video>
</div>

<br>

### Breakpoints

<div class="video-wrap">
  <video width="100%" height="auto" controls autoplay muted loop>
    <source src="/images/foundations/design/spacing/breakpoints.mp4" type="video/mp4">
  </video>
</div>

The grid adapts to the viewport width. The amount of columns will change depending on how much space there is. This is a recommendation for how much should be displayed horizontally. Less columns means less content.

<br>

| Screen size                            | Columns | Margin | Gutter | Navigation |
| -------------------------------------- | ------- | ------ | ------ | ---------- |
| **XS** <br> 0-489 <br> Phones          | 6       | 16     | 16     | Collapsed  |
| **SM** <br> 490-767 <br> Small tablets | 6       | 16     | 16     | Collapsed  |
| **MD** <br> 768-1039 <br> Tablets      | 6       | 24     | 16     | Collapsed  |
| **LG** <br> 1040-1399 <br> Laptops     | 12      | 24     | 16     | Visible    |
| **XL** <br> 1440+ <br> Desktops        | 12      | 32     | 16     | Visible    |

The grid is meant to serve as a point of reference for page level design and alignment, but this doesn’t need to apply to component level layouts.

---

## Essentials for designing with space

### Gestalt principles

The perception of any given page goes beyond the individual elements presented, and the space between them. People’s perception is heavily influenced by their own expectations and motivations.
When designing, it’s key to consider that people look for patterns, and will always perceive things in their simplest form. For instance, a bunch of similar items stacked on top of each other will likely read as a list.

![Different types of list items, such as menus, popovers, and dropdowns](/images/foundations/design/spacing/spacing-principles@2x.png)

<br>

#### People look for patterns instinctively, and they lean of visual cues like:

#### Similarity

Grouping things based on physical appearance (shape, color, size, orientation).

![Index table](/images/foundations/design/spacing/spacing-similarity@2x.png)

#### Proximity

Grouping things based on distance between objects.

![Customers and orders page](/images/foundations/design/spacing/spacing-proximity@2x.png)

<br>

#### Continuity

Grouping things based on the way they are arranged.

![Tag multiselect popover and media card](/images/foundations/design/spacing/spacing-continuity@2x.png)

Shadows inside popovers act as visual cues to indicate additional content when scrolled (left). Cards placed horizontally in a media carousel communicates related topics (right).

<br>

#### Closure

Grouping things that are implicitly enclosed by a larger object.

![Order details page](/images/foundations/design/spacing/spacing-closure@2x.png)

<br>

#### Common fate

Grouping things based on how they move.

<div class="video-wrap">
  <video width="100%" height="auto" controls autoplay muted loop>
    <source src="/images/foundations/design/spacing/common-fate.mp4" type="video/mp4">
  </video>
</div>

<br>

#### Common Region

Grouping things that are explicitly enclosed by a larger object.

![Customer details card](/images/foundations/design/spacing/spacing-common-region@2x.png)

Because people perceive these instinctively, we can use them as tools to create hierarchy, visual rhythm, and guide the user's eye to what’s important.

---

<br>

### Rhythm

Alternating between objects and space creates a pattern. Repeated patterns create visual rhythm, which can be used to effectively direct the viewer’s attention.
Anything can establish rhythm: space, typography, icons, color, shape, and size.

Like in music, different types of rhythm serve a different purpose, in design there’s three worth highlighting:

![Example of data table](/images/foundations/design/spacing/spacing-regular-rhythm@2x.png)

**Regular rhythm** is predictable, which makes it a useful way to organize large sets of objects that have the same level of importance.

![Location profile page](/images/foundations/design/spacing/spacing-flowing-rhythm@2x.png)

**Flowing rhythm** is organic, and it can bring a high level of scannability to something that would be otherwise a random collection of objects.

![Home page with progressive disclosure card](/images/foundations/design/spacing/spacing-progressive-rhythm@2x.png)

**Progressive rhythm** is a gradual progression, and is very effective in giving the eye a path to follow, along the progression. This is great to establish hierarchy and aid the user through a series of steps.

Rhythm plays another job in designs, it’s the norm that enables the introduction of variation and points of attention, otherwise known as contrast.

---

<br>

### Density

The overall perception people get from the space between information as a whole is density. It can range from tight to loose, and there is a very different purpose for each end of the spectrum.

![Examples showign tigher versus looser spacing](/images/foundations/design/spacing/spacing-density@2x.png)

Tighter spacing (left) makes it easier to scan and comprehend large sets of data, like lists and tables. It also naturally enables one to fit more elements in a given page.
Looser space (right) can help attract the user attention and make a layout feel more user-friendly.

---

<br>

### Contrast

Contrast is meant to create sticking points that help make content easy to scan, highlight important pieces of information, or just to give viewers a moment to breathe.

![Marketing page and empty state](/images/foundations/design/spacing/spacing-contrast@2x.png)

**Highlights (left)**: Callout cards are used to encourage merchants to take an action related to a new feature or opportunity. 

**Breather moment (right)**: Empty states provide explanation or guidance to help merchants progress. 

Contrast can play a role at very different levels, but it must be used sparingly, otherwise its effect gets diluted.

![Examples on the analytics page to show contrast](/images/foundations/design/spacing/spacing-analytics@2x.png)

Home feed overview (left) and location profile analytics (right).

---

<br>

### Optical adjustment

Sometimes software will say two objects are aligned, or that they have the same size, but visually they don’t feel like that. This happens because computers aren’t great at perceiving visual weight or simultaneous color contrast, so we can’t fully rely on them to create balanced compositions.

That means designers must make optical corrections, using Polaris units until the space feels balanced. Some things to keep an eye out for:

#### Visual weight ≠ Size

Two things can have the same size, but feel unbalanced.

![Before and after comparison of optical adjustment applied to a button](/images/foundations/design/spacing/spacing-weight-buttons@2x.png)

Without optical adjustment, the disclosure icon appears too far from the right edge of the button. After optical correction, the perceived spacing is more balanced.

![Before and after comparison of optical adjustment applied to an icon](/images/foundations/design/spacing/spacing-weight-icon@2x.png)

The square icon seems larger compared to the circle icon without optical adjustment, however, they in fact have the same size and diameter. The shapes look visually closer to each other after decreasing the size of the square.

#### Colors affect each other

Two things can have the same colour, but feel unbalanced.

![Before and after comparison of applying the same colour versus slightly different colours to a banner component](/images/foundations/design/spacing/spacing-colour@2x.png)
