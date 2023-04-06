// /my-addon/src/preset.js

function managerEntries(entry = []) {
  return [...entry, require.resolve('./manager')]; //👈 Addon implementation
}

export default {managerEntries};
