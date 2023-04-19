function managerEntries(entry = []) {
  // Unfortunately have to do this dance for Storybook v7 to load our addon
  return [...entry, require.resolve('./manager')];
}

export default {managerEntries};
