import type {API, FileInfo, Options} from 'jscodeshift';
import type {AtRule, Declaration, Rule, Plugin} from 'postcss';
import postcss from 'postcss';
import stylelint from 'stylelint';

const IGNORED_FILES = [
  'app/global-styles/_common.scss',
  'app/foundation/Frame/Variables.scss',
  'app/foundation/Frame/components/Nav/components/StoreDetails/styles/variables.scss',
  'app/foundation/Frame/components/Nav/spacing.scss',
  'app/foundation/Routes/components/Settings/styles/variables.scss',
  'app/sections/AccountSetup/styles/variables.scss',
  'app/sections/Catalogs/utilities/pagination.scss',
  'app/sections/Flow/CustomConfigurationPage/components/Editor/components/styles/shared/_layout.scss',
  'app/shared/components/AnalyticsBar/variables.scss',
  'app/shared/components/AnalyticsBarNext/variables.scss',
  'app/shared/components/Chat/non-polaris-colors.scss',
  'app/shared/components/FilePickerModal/variables.scss',
  'app/shared/components/ResourcePicker/variables.scss',
  'app/shared/extensibility/app-home/components/EmbeddedApp/components/TitleBar/shared/breakpoints.scss',
  'client/ui-extensions/playground/pages/LocalScript/styles.scss',
  'app/sections/Billing/BillingSettings/components/ChargesDetails/components/shared.scss',
  'app/sections/Products/components/LocationsTable/variables.scss',
  'app/sections/Products/components/MediaContainer/variables.scss',
  'app/sections/ShippingLabels/PurchaseShippingLabels/components/TableView/components/TableListItem/components/variables.scss',
  'app/sections/Analytics/ReportViewer/components/CustomerCohortReport/styles/variables.scss',
  'app/sections/Apps/AppList/shared/styles/other.scss',
  'app/sections/Apps/AppList/shared/styles/breakpoints.scss',
  'app/sections/Apps/AppAbout/shared/styles/other.scss',
  'app/sections/Apps/AppAbout/shared/styles/breakpoints.scss',
  'app/sections/Capital/CapitalIndex/components/FinancingSection/components/FinancingCard/components/FinancingProgressBar/variables.scss',
  'app/sections/Content/variables.scss',
  'app/sections/Banking/BalanceCardManagement/variables.scss',
  'app/sections/Orders/components/OrdersAnalyticsInContext/variables.scss',
  'app/sections/Orders/components/OrdersAnalyticsInContextNext/variables.scss',
  'app/sections/Products/components/MediaContainer/components/MediaPreviewModal/components/DarkImageEditor/variables.scss',
  'app/sections/Shipping/ShippingSettings/components/DeliveryMethodsSection/variables.scss',
  'app/shared/components/Editor/components/EditorField/variables.scss',
  'app/foundation/Admin/components/UIExtensionsDevTool/theme.scss',
  'app/sections/Products/ProductDetails/components/OptionsAndVariantsContainer/components/LegacyVariants/components/shared.scss',
  'app/sections/Marketing/ExternalEditorActivity/components/Editor/components/styles/shared/_layout.scss',
  'app/sections/Catalogs/CatalogList/components/CatalogListTable/components/CatalogListTableRow/components/AssignedLocationsCell/components/LocationsPopover/components/PopoverActivator/PopoverActivator.scss',
  'app/foundation/Frame/components/AppAndChannelRecommendations/styles/_mixins.scss',
  'app/foundation/Frame/components/AppAndChannelRecommendations/components/AppRecommendationsModal/components/AppListing/styles/_mixins.scss',
  'app/shared/app-and-channel-recommendation/components/AppCard/styles/_mixins.scss',
  'app/shared/components/Editor/components/StatusBar/mixins.scss',
  'app/shared/components/SetupGuide/components/GuideRecommendedAppModal/mixins.scss',
  'app/shared/components/SetupGuide/components/OnboardingChannelRecommendationsModal/components/AppAndChannelRecommendations/styles/_mixins.scss',
  'app/sections/Inbox/_mixins.scss',
  'app/sections/Capital/CapitalTransactionList/components/TransactionList/components/shared.scss',
  'app/sections/Taxes/TaxesShow/components/TaxOverrideSection/shared.scss',
  'app/sections/Inventory/InventoryListPage/components/InventoryList/components/InventoryListItem/_mixins.scss',
  'app/sections/Markets/shared-styles.scss',
  'app/sections/Discounts/shared.scss',
  'app/sections/Billing/shared/breakpoints.scss',
  'app/sections/Analytics/LiveView/styles/variables.scss',
  'app/sections/Inventory/Movements/PurchaseOrders/components/PurchaseOrderSummaryCard/components/PurchaseOrderCostAdjustmentModal/PurchaseOrderCostAdjustmentModal.scss',
  'app/sections/Capital/CapitalIndex/components/PastFinancingSection/components/PastFinancingList/baseStyles.scss',
  'app/sections/Capital/CapitalIndex/components/PastFinancingSection/components/PastFinancingList/PastFinancingList.scss',
  'app/sections/Capital/CapitalIndex/CapitalIndexSharedStyles.scss',
  'app/sections/Billing/BillingSettings/BillingSettingsIndex/components/CardSpinner/CardSpinner.scss',
  'app/sections/Marketing/shared-styles.scss',
  'app/sections/ShippingLabels/PurchaseShippingLabels/components/LabelDetailsTable/shared.scss',
  'app/sections/Inventory/Movements/MovementShared.scss',
  'app/shared/components/SetupGuide/components/GuideRecommendedAppModal/_mixins.scss',
  'app/sections/Billing/AccountPricing/components/styles/shared.scss',
];

const SUPPORTED_AT_USE_URLS = [
  'global-styles/legacy-polaris-v8',
  'global-styles/common',
];

const SUPPORTED_INCLUDES = [
  'legacy-polaris-v8.focus-ring',
  "legacy-polaris-v8.focus-ring($style: 'focused')",
  'legacy-polaris-v8.no-focus-ring',
  'legacy-polaris-v8.visually-hidden',
  'legacy-polaris-v8.base-button-disabled',
  'legacy-polaris-v8.unstyled-button',
  'legacy-polaris-v8.unstyled-link',
  'legacy-polaris-v8.unstyled-list',
  'legacy-polaris-v8.page-content-layout',
  'legacy-polaris-v8.page-header-layout',
  'legacy-polaris-v8.text-style-caption',
  'legacy-polaris-v8.text-style-heading',
  'legacy-polaris-v8.text-style-subheading',
  'legacy-polaris-v8.text-style-input',
  'legacy-polaris-v8.text-style-body',
  'legacy-polaris-v8.text-style-display-large',
  'legacy-polaris-v8.text-style-display-medium',
  'legacy-polaris-v8.text-style-display-small',
  'legacy-polaris-v8.text-breakword',
  'legacy-polaris-v8.truncate',
  'legacy-polaris-v8.skeleton-shimmer',
  'legacy-polaris-v8.skeleton-content',
];

const SUPPORTED_VARIABLES = [
  {
    regexp: /legacy-polaris-v8\.control-height\(\)/,
    replace: '$legacy-polaris-v8-control-height',
  },
  {
    regexp: /legacy-polaris-v8\.top-bar-height\(\)/,
    replace: '$legacy-polaris-v8-top-bar-height',
  },
];

const plugin = (filePath: string): Plugin => {
  const atUses: AtRule[] = [];
  const namespaceAccess: string[] = [];
  const mixins: AtRule[] = [];
  const mixinDeclarations: AtRule[] = [];
  const declarations: Declaration[] = [];
  const handledSummerEditions23Rules: Rule[] = [];
  const unhandledSummerEditions23Rules: Rule[] = [];
  const placeholderRules: Rule[] = [];

  return {
    postcssPlugin: 'cy-replace-legacy-mixins',
    AtRule(atRule) {
      if (atRule.name === 'include') {
        mixins.push(atRule);
      } else if (atRule.name === 'use') {
        atUses.push(atRule);
      } else if (atRule.params.includes('legacy-polaris-v8.')) {
        namespaceAccess.push(atRule.params);
      } else if (atRule.name === 'mixin') {
        mixinDeclarations.push(atRule);
      }
    },
    Declaration(decl) {
      if (decl.value.includes('legacy-polaris-v8')) {
        declarations.push(decl);
      }
    },
    Rule(rule) {
      if (rule.selector === '#{common.$se23} &') {
        if (rule.selectors.length === 1) {
          handledSummerEditions23Rules.push(rule);
        } else {
          unhandledSummerEditions23Rules.push(rule);
        }
      } else if (rule.selectors.some((selector) => selector.startsWith('%'))) {
        placeholderRules.push(rule);
      }
    },
    RootExit(root) {
      if (
        IGNORED_FILES.includes(filePath) ||
        Boolean(mixinDeclarations.length) ||
        Boolean(namespaceAccess.length) ||
        Boolean(placeholderRules.length) ||
        Boolean(unhandledSummerEditions23Rules.length) ||
        root.source?.input.css
          .replace(/#\{common.\$se23\} & \{/g, '')
          .includes('#{') ||
        root.source?.input.css
          .replace(/#\{common.\$se23\} & \{/g, '')
          .includes('common.$') ||
        !atUses.every((atUse) =>
          SUPPORTED_AT_USE_URLS.includes(atUse.params.replace(/['"]/g, '')),
        )
      ) {
        return;
      }

      if (mixins.some((mixin) => !SUPPORTED_INCLUDES.includes(mixin.params))) {
        return;
      }

      if (
        declarations.some(
          (declaration) =>
            !SUPPORTED_VARIABLES.some(({regexp}) =>
              regexp.test(declaration.value),
            ),
        )
      ) {
        return;
      }

      mixins.forEach((mixin) => {
        mixin.params = mixin.params
          .replace(/legacy-polaris-v8./, 'legacy-polaris-v8-')
          .replace(/\(\$style: 'focused'\)/, '-focused');

        const prevNode = mixin.prev();

        if (prevNode?.type === 'comment') {
          prevNode.remove();
        }
      });

      declarations.forEach((declaration) => {
        SUPPORTED_VARIABLES.forEach(({regexp, replace}) => {
          declaration.value = declaration.value.replace(regexp, replace);
        });
      });

      atUses.forEach((atUse) => {
        atUse.name = 'import';
        atUse.params = atUse.params.replace(
          /global-styles\/([^']*)/,
          'global/$1.css',
        );
      });

      handledSummerEditions23Rules.forEach((rule) => {
        const include = new postcss.AtRule({
          name: 'include',
          params: 'summer-editions-2023',
          nodes: rule.nodes,
        });

        rule.replaceWith(include);
      });
    },
  };
};

export default async function transformer(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss([
    stylelint({
      config: {
        extends: [options.config ?? '@shopify/stylelint-polaris'],
      },
    }) as Plugin,
    plugin(file.path),
  ])
    .process(file.source, {
      from: file.path,
      syntax: require('postcss-scss'),
    })
    .then((result) => {
      return result.css;
    });
}
