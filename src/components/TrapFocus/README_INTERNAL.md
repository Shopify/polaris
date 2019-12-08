# <TrapFocus>

A component which allows you to trap keyboard focus inside of a container.

TrapFocus internally employs `Focus` to focus it's first focusable child on mount.

Whenever a `blur` event occurs that would take the user outside the trap, we reset to the first focusable child.

If you want to cease trapping focus, simply cease rendering the trap.
