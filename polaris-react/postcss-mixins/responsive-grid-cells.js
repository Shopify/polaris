function cellColumnEndRules(columns, breakpoint) {
  const rules = {};
  for (let column = 1; column <= columns; column++) {
    rules[`.Cell-${column}-column-${breakpoint}`] = {
      gridColumnEnd: `span ${column}`,
    };
  }
  return rules;
}

function wrapInBreakpoint(breakpoints, getRules) {
  const rules = {};
  for (const breakpoint of breakpoints) {
    rules[`@media (--p-breakpoints-${breakpoint}-up)`] = getRules(breakpoint);
  }
  return rules;
}

module.exports = () => ({
  ...cellColumnEndRules(6, 'xs'),
  ...wrapInBreakpoint(['sm', 'md'], (breakpoint) =>
    cellColumnEndRules(6, breakpoint),
  ),
  ...wrapInBreakpoint(['lg', 'xl'], (breakpoint) =>
    cellColumnEndRules(12, breakpoint),
  ),
});
