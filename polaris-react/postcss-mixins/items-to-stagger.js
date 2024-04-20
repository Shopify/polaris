const staggerInterval = 50;

module.exports = () => {
  const rules = {};
  for (let i = 1; i <= 12; i++) {
    rules[`&:nth-child(${i})`] = {
      animationDelay: `${(i - 1) * staggerInterval}ms`,
    };
  }
  return rules;
};
