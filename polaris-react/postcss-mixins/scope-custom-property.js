const {nullish} = require('./utils');

module.exports = (_, componentName, componentProp, responsively = false) => {
  if (responsively && !nullish(responsively)) {
    return {
      [`--pc-${componentName}-${componentProp}-xs`]: 'initial',
      [`--pc-${componentName}-${componentProp}-sm`]: 'initial',
      [`--pc-${componentName}-${componentProp}-md`]: 'initial',
      [`--pc-${componentName}-${componentProp}-lg`]: 'initial',
      [`--pc-${componentName}-${componentProp}-xl`]: 'initial',
    };
  } else {
    return {
      [`--pc-${componentName}-${componentProp}`]: 'initial',
    };
  }
};
