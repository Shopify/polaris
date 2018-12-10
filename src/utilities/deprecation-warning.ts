interface Options {
  componentName: string;
  updateSuggestion: string;
  learnMoreUrl: string;
}

export function showDeprecationWarning({
  componentName,
  updateSuggestion,
  learnMoreUrl,
}: Options) {
  // eslint-disable-next-line no-console
  console.warn(
    `${componentName} is deprecated and will be removed in the next major version. ${updateSuggestion} Learn more about this warning here: ${learnMoreUrl}.`,
  );
}
