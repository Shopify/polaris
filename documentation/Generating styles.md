# Generating static styles

In order to distribute a CSS-only version of our styles for consumers that don’t want to (or can’t) setup a build system that understands CSS Modules, we need a way of creating meaningful, unique class names from our source stylesheets.

We generate our static CSS build based on our conventions for structuring stylesheets and naming classes. Any given class found in the style sheet will have its final name determined as follows:

1.  If the name is written in Pascal case:

    1.  If the name matches the name of the file (e.g., `.Card` in `Card.scss`), leave the class name unchanged.
    2.  Else, append the class name to the “root” component name (the name of the file), separated by `__` (e.g., `.Section` in `Card.scss` becomes `.Card__Section`).

2.  Else, if the name is written in Pascal case with a postfix separated by a dash, split at the dash and treat the first part as a subcomponent, and the second as a variation. Then, append the subcomponent name to the “root” component separated by `__`, and append the variation name to the result separated by `--` (e.g., `.Section-subdued` in `Card.scss` becomes `Card__Section--subdued`).

3.  Else, append the class name to “root” component (same name as the file) separated by `--` (e.g., `.subdued` becomes `.Card--subdued` ).

Note that, in addition to the name above, we prefix all class names with `Polaris-` in order to namespace our components and prevent collisions with the host page.
