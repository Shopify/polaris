const fs = require('node:fs');
const path = require('path');

const polarisReactDir = path.join(__dirname, '..');
const tokenGroupsDir = path.join(polarisReactDir, 'src/tokens/token-groups');
const stylesDir = path.join(polarisReactDir, 'src/styles');

const file = fs.createWriteStream(path.join(stylesDir, '_tokens.scss'));

const breakpointsTokenGroup = require(path.join(
  tokenGroupsDir,
  'breakpoints.json',
));

const breakpointEntries = Object.entries(breakpointsTokenGroup).map(
  ([token, breakpoint]) => [`$p-${token}`, breakpoint],
);

file.write(`/* stylelint-disable unit-disallowed-list */\n`);
file.write(`/* stylelint-disable length-zero-no-unit */\n\n`);

file.write(`/* Breakpoints - Aliases */\n`);

breakpointEntries.forEach(([bpAlias, breakpoint]) => {
  // Write PX breakpoint alias
  file.write(`${bpAlias}: ${breakpoint};\n`);

  // Write EM breakpoint alias
  file.write(`${toEmAlias(bpAlias)}: ${toEm(breakpoint)};\n\n`);
});

file.write(`/* Breakpoints - Media conditions */\n`);

// Write breakpoint SCSS utils
breakpointEntries.forEach(([bpAlias, breakpoint], index) => {
  const isLastBreakpoint = index === breakpointEntries.length - 1;

  const nextBreakpoint = isLastBreakpoint
    ? null
    : breakpointEntries[index + 1][1];

  const upMediaCondition = getUpMediaCondition(breakpoint);
  const downMediaCondition = getDownMediaCondition(breakpoint);
  const onlyMediaCondition = isLastBreakpoint
    ? upMediaCondition
    : `${upMediaCondition} and ${getDownMediaCondition(nextBreakpoint)}`;

  // Scss variable/media condition for the current breakpoint and up
  file.write(`${bpAlias}-up: '${upMediaCondition}';\n`);

  // Scss variable/media condition for current breakpoint and down
  file.write(`${bpAlias}-down: '${downMediaCondition}';\n`);

  // Scss variable/media condition for only the current breakpoint
  file.write(`${bpAlias}-only: '${onlyMediaCondition}';\n`);

  !isLastBreakpoint && file.write('\n');
});

file.end();

function getUpMediaCondition(breakpoint) {
  return `(min-width: ${toEm(breakpoint)})`;
}

function getDownMediaCondition(breakpoint) {
  return `(max-width: ${toEm(breakpoint)})`;
}

function toEmAlias(bpAlias) {
  return `${bpAlias}-em`;
}

function toEm(value) {
  return `${parseInt(value, 10) / 16}em`;
}
