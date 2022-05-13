export const createRegex = (replacementValues) =>
  new RegExp(
    Object.keys(replacementValues)
      // escape brackets or other things
      .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g',
  );

export const v9SassSpacing = (fileContent) => {
  const spacingReplacements = {
    'spacing(none)': 'var(--p-space-0)',
    'spacing(extra-tight)': 'var(--p-space-1)',
    'spacing(tight)': 'var(--p-space-2)',
    'spacing(base-tight)': 'var(--p-space-3)',
    'spacing()': 'var(--p-space-4)',
    'spacing(base)': 'var(--p-space-4)',
    'spacing(loose)': 'var(--p-space-5)',
    'spacing(extra-loose)': 'var(--p-space-8)',
  };

  const newContent = fileContent.replace(
    createRegex(spacingReplacements),
    (value) => spacingReplacements[value],
  );

  return newContent;
};

export const v9SassShadow = (fileContent) => {
  const spacingReplacements = {
    'shadow(faint)': 'var(--p-shadow-faint)',
    'shadow()': 'var(--p-shadow-base)',
    'shadow(base)': 'var(--p-shadow-base)',
    'shadow(deep)': 'var(--p-shadow-deep)',
    'shadow(layer)': 'var(--p-shadow-layer)',
    'shadow(transparent)': 'var(--p-shadow-transparent)',
  };

  const newContent = fileContent.replace(
    createRegex(spacingReplacements),
    (value) => spacingReplacements[value],
  );

  return newContent;
};
