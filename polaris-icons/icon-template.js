function defaultTemplate(
  {template},
  opts,
  {imports, componentName, props, jsx, exports},
) {
  return template.ast`${imports}
const ${componentName} = (${props}) => ${jsx}

${componentName}.displayName = "${componentName.name.replace(/^Svg/g, '')}";

${exports}
`;
}

module.exports = defaultTemplate;
