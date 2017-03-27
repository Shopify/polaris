# Generating static styles

In order to distribute a CSS-only version of our styles for consumers that don’t want to (or can’t) setup a build system that understands CSS Modules, we need a way of creating meaningful, unique class names from our source stylesheets.

We generate our static CSS build based on our conventions for structuring stylesheets and naming classes. Any given class found in the style sheet will have its final name determined as follows:

1. If the name is written in pascal case:
	1. If the name matches the name of the file (e.g., `.Card` in `Card.scss`), leave the class name unchanged.
	2. Else, append the class name to the “root” component name (the name of the file), separated by `__` (e.g., `.Section` in `Card.scss` becomes `.Card__Section`).

2. Else, append the class name to the last component (class written in pascal case) that appeared in the file before this class, separated by `--` (e.g., `.subdued` becomes `.Card--subdued` if it appeared after `.Card`, but becomes `.Card__Section--subdued` if it appeared after `.Section`).

Note that, in addition to the name above, we prefix all class names with `Quilt-` in order to namespace our components and prevent collisions with the host page.
