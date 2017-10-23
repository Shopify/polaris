// Fixes an error where requestAnimationFrame wouldn't be available and throw:
//
// console.error node_modules/fbjs/lib/warning.js:33
// Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
//
// See https://github.com/facebook/jest/issues/4545
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
