const postcss = require('postcss');

module.exports = (mixin) => {
  const rules = [];
  for (let i = 1; i <= 12; i++) {
    const rule = postcss.rule({
      selector: `&:nth-child(${i})`,
    });
    rule.append({
      prop: 'animation-delay',
      value: `calc((${i} - 1) * 50ms)`,
    });
    rules.push(rule);
  }
  mixin.replaceWith(rules);
};
