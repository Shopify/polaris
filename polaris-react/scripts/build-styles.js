const fs = require('node:fs');
const path = require('path');

const polarisReactDir = path.join(__dirname, '..');
const tokenGroupsDir = path.join(polarisReactDir, 'src/tokens/token-groups');
const stylesDir = path.join(polarisReactDir, 'src/styles');

const publicScssFile = fs.createWriteStream(
  path.join(stylesDir, '_public.scss'),
);

const breakpointsTokenGroup = require(path.join(
  tokenGroupsDir,
  'breakpoints.json',
));

const breakpointEntries = Object.entries(breakpointsTokenGroup).map(
  ([token, breakpoint]) => [`$p-${token}`, breakpoint],
);

publicScssFile.write(`/* stylelint-disable unit-disallowed-list */\n`);
publicScssFile.write(`/* stylelint-disable length-zero-no-unit */\n\n`);

publicScssFile.write(`/* Breakpoint aliases */\n`);

breakpointEntries.forEach(([bpAlias, breakpoint]) => {
  // Write PX breakpoint alias
  publicScssFile.write(`${bpAlias}: ${breakpoint};\n`);

  // Write EM breakpoint alias
  publicScssFile.write(`${toEmAlias(bpAlias)}: ${toEm(breakpoint)};\n\n`);
});

publicScssFile.write(`/* Breakpoint media conditions */\n`);

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
  publicScssFile.write(`${bpAlias}-up: '${upMediaCondition}';\n`);

  // Scss variable/media condition for current breakpoint and down
  publicScssFile.write(`${bpAlias}-down: '${downMediaCondition}';\n`);

  // Scss variable/media condition for only the current breakpoint
  publicScssFile.write(`${bpAlias}-only: '${onlyMediaCondition}';\n`);

  !isLastBreakpoint && publicScssFile.write('\n');
});

publicScssFile.end();

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
