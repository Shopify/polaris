if [ -z "$1" ]; then echo "A filename is required:\n> $0 ./no-sass.css"; exit 1; fi;

# Write a temporary postcss config for cssnano to work
cat <<EOF > postcss.config.js
const parser = require('postcss-selector-parser');
const isPseudo = node => node.type === 'pseudo';
const isSelector = node => ['class','id','attribute','tag','universal'].includes(node.type);
const sortPseudosToEnd = (a, b) => {
  let result = 0;
  if (a.type !== b.type) {
    if (isPseudo(a) && isSelector(b)) {
      result = 1;
    }
    if (isSelector(a) && isPseudo(b)) {
      result = -1;
    }
  }
  //console.log(a.type+': "'+a.value+'" vs '+b.type+': "'+b.value+'" = ' + result)
  return result;
};
const transform = selectors => {
  selectors.walk(selector => {
    if (selector.nodes && selector.nodes.length) {
      const selectorsSplitByCombinators = selector.split(selector => {
          return selector.type === 'combinator';
      });
      selector.nodes = selectorsSplitByCombinators.flatMap(someSelectors => {
        return someSelectors.sort(sortPseudosToEnd);
      });
    }
  });
};
const postCssSortRules = {
  postcssPlugin: 'postcss-sort-pseudos',
  Rule(rule) {
    // Ignore keyframes, which can log e.g. 10%, 20% as selectors
    if (rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) {
      return;
    }
    rule.selectors = rule.selectors
      // Sort pseudo classes/selectors to the end of the selector for
      // consistency
      .map(selector => parser(transform).processSync(selector))
      // Sort selector lists alphabetically for consistencty
      .sort((a, b) => a.localeCompare(b));
  },
}
module.exports = {
  plugins: [
    postCssSortRules,
    require('cssnano')({
      preset: 'lite',
    }),
  ],
};
EOF

# Replace references to CSS Custom Properties with their hard coded values to
# reduce the size of the diff
cat <<EOF > replace-globals.sed
s/var(--pg-layout-width-nav-base)/var(--pg-navigation-width)/g
s/var(--pg-navigation-width)/15rem/g
s/var(--pg-dangerous-magic-space-4)/1rem/g
s/var(--pg-dangerous-magic-space-5)/1.25rem/g
s/var(--pg-dangerous-magic-space-8)/2rem/g
s/var(--pg-layout-width-primary-min)/30rem/g
s/var(--pg-layout-width-primary-max)/41.375rem/g
s/var(--pg-layout-width-secondary-min)/15rem/g
s/var(--pg-layout-width-secondary-max)/20rem/g
s/var(--pg-layout-width-one-half-width-base)/28.125rem/g
s/var(--pg-layout-width-one-third-width-base)/15rem/g
s/var(--pg-layout-width-page-content-partially-condensed)/28.125rem/g
s/var(--pg-layout-width-inner-spacing-base)/1rem/g
s/var(--pg-layout-width-outer-spacing-min)/1.25rem/g
s/var(--pg-layout-width-outer-spacing-max)/2rem/g
s/var(--pg-dismiss-icon-size)/2rem/g
s/var(--pg-top-bar-height)/3.5rem/g
s/var(--pg-mobile-nav-width)/calc(100vw - 4rem)/g
s/var(--pg-control-height)/2rem/g
s/var(--pg-control-vertical-padding)/calc((2.25rem - var(--p-font-line-height-600) - var(--p-space-050)) \/ 2)/g
s/var(--pc-action-list-indented-item-margin)/calc(var(--p-space-500) + var(--p-space-050))/g
s/var(--pc-action-list-indented-item-width)/calc(100% - var(--p-space-500) - var(--p-space-050))/g
s/var(--pc-popover-visible-portion-of-arrow)/0.3125rem/g
s/var(--pc-popover-vertical-motion-offset)/-0.3125rem/g
s/var(--pc-color-picker-checkers)/repeating-conic-gradient(var(--p-color-bg-surface) 0% 25%, var(--p-color-bg-surface-secondary) 0% 50%) 50% \/ var(--p-space-400) var(--p-space-400)/g
s/var(--pc-color-picker-vertical-border-radius)/calc(var(--pc-color-picker-size) * 0.5)/g
s/var(--pc-drop-zone-border-style)/dashed/g
s/var(--pc-form-layout-item-min-size)/13.75rem/g
s/var(--pc-form-layout-item-min-size)/13.75rem/g
s/var(--pc-modal-dialog-vertical-spacing)/3.75rem/g
s/var(--pc-modal-frame-small-width)/38.75rem/g
s/var(--pc-navigation-item-line-height)/2.5rem/g
s/var(--pc-keyboard-key-base-dimension)/1.75rem/g
s/var(--pc-tag-height)/1.25rem/g
s/var(--pc-sheet-desktop-width)/23.75rem/g
s/var(--pc-sheet-desktop-height)/1.75rem/g
s/var(--pc-legacy-filters-header-height)/3.5rem/g
s/var(--pc-legacy-filters-footer-height)/4.375rem/g
s/var(--pc-legacy-tabs-item-min-height)/1rem/g
s/var(--pc-legacy-tabs-item-vertical-padding)/0.5rem/g
s/var(--pc-progress-bar-height-small)/0.5rem/g
s/var(--pc-progress-bar-height-base)/1rem/g
s/var(--pc-progress-bar-height-large)/2rem/g
s/var(--pc-track-dashed-color)/var(--p-color-border)/g
s/var(--pc-resource-item-action-unhide-clip)/auto/g
s/var(--pc-resource-item-action-unhide-overflow)/visible/g
s/var(--pc-resource-item-action-hide-clip)/rect(0, 0, 0, 0)/g
s/var(--pc-resource-item-action-hide-overflow)/hidden/g
s/var(--pc-resource-list-separator-border)/var(--p-border-width-025) solid var(--p-color-border)/g
s/var(--pc-resource-list-header-outer-wrapper-stacking-order)/31/g
s/var(--pc-resource-list-header-overlay-stacking-order)/4/g
s/var(--pc-resource-list-content-wrapper-stacking-order)/1/g
s/var(--pc-resource-list-stacking-order)/1/g
s/var(--pc-resource-list-spinner-stacking-order)/4/g
s/var(--pc-resource-list-overlay-stacking-order)/3/g
s/var(--pc-resource-list-bulk-actions-wrapper-stacking-order)/31/g
s/var(--pc-search-field-icon-size)/1.125rem/g
s/var(--pc-message-indicator-position)/-0.1875rem/g
s/var(--pc-message-indicator-size)/0.75rem/g
s/calc(13.75rem \* 0.5)/6.875rem/g
s/calc(41.375rem + 20rem + 1rem)/62.375rem/g
EOF

BRANCH=`git rev-parse --abbrev-ref HEAD`
if [ $BRANCH = "main" ]; then

# The order of these imports changes the order of the output CSS. The `globals`
# file merely imports token values onto :root which are not overwriten anywhere
# so it's ok for them to come after
cat <<EOF > swap-globals.patch
diff --git a/polaris-react/src/components/AppProvider/AppProvider.tsx b/polaris-react/src/components/AppProvider/AppProvider.tsx
index 38a0d36af..7ef8b47d6 100644
--- a/polaris-react/src/components/AppProvider/AppProvider.tsx
+++ b/polaris-react/src/components/AppProvider/AppProvider.tsx
@@ -25,8 +25,8 @@ import type {LinkLikeComponent} from '../../utilities/link';
 import {FeaturesContext} from '../../utilities/features';
 import type {FeaturesConfig} from '../../utilities/features';
 
-import './AppProvider.scss';
 import './global.scss';
+import './AppProvider.scss';
 
 const MAX_SCROLLBAR_WIDTH = 20;
 const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
EOF

git apply swap-globals.patch
fi

yarn workspace @shopify/polaris add cssnano-preset-lite
yarn
yarn build --filter="@shopify/polaris"

if [ $BRANCH = "main" ]; then
git apply --reverse swap-globals.patch
fi

cp polaris-react/build/esm/styles.css "$1" # Move out of ignored directories
sed -f replace-globals.sed -i "" "$1" # Minimise the diff a bit
yarn prettier -w "$1" # Pre-format to normalize whitespace
npx postcss-cli --yes postcss-cli -r --no-map --config="`pwd`" "$1" # cssnano removes more whitespace prettier doesn't
yarn prettier -w "$1" # Format again to get back into un-minified version
rm postcss.config.js replace-globals.sed swap-globals.patch # Clean up temporary files
yarn workspace @shopify/polaris remove cssnano-preset-lite
