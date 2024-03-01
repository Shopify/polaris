const postcss = require('postcss');

const breakpoints = ['sm', 'md', 'lg', 'xl'];
module.exports = (mixin) => {
  const rules = [];
  const atRules = [];
  for (let i = 1; i <= 6; i++) {
    const rule = postcss.rule({
      selector: `.Cell-${i}-column-xs`,
    });
    rule.append({
      prop: 'gridColumnEnd',
      value: `span ${i}`,
    });
    rules.push(rule);
  }
  for (const i of breakpoints) {
    const atRule = postcss.atRule({
      name: 'media',
      params: `(--p-breakpoints-${i}-up)`,
    });
    for (let j = 1; j <= (i === 'lg' || i === 'xl' ? 12 : 6); j++) {
      const rule = postcss.rule({
        selector: `.Cell-${j}-column-${i}`,
      });
      rule.append({
        prop: 'gridColumnEnd',
        value: `span ${j}`,
      });
      atRule.append(rule);
    }
    atRules.push(atRule);
  }
  mixin.replaceWith([].concat(rules, atRules));
};
