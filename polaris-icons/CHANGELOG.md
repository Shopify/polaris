# Changelog

## 8.6.0

### Minor Changes

- [#11642](https://github.com/Shopify/polaris/pull/11642) [`abb3bf0e4`](https://github.com/Shopify/polaris/commit/abb3bf0e4fcecfab87d0888b9c0846fe9ea45f1e) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Adds sun icon to library

* [#11641](https://github.com/Shopify/polaris/pull/11641) [`adf8600ad`](https://github.com/Shopify/polaris/commit/adf8600ad61b33adb903fe995bd79f71e99bb8bb) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Added `MoonIcon`

## 8.5.0

### Minor Changes

- [#11639](https://github.com/Shopify/polaris/pull/11639) [`4db32af27`](https://github.com/Shopify/polaris/commit/4db32af27edb547d5c3f6fe1fbd81b1737cc5152) Thanks [@ardakaracizmeli](https://github.com/ardakaracizmeli)! - Added a new icon: ArrowDiagonal

### Patch Changes

- [#11633](https://github.com/Shopify/polaris/pull/11633) [`8a9225306`](https://github.com/Shopify/polaris/commit/8a92253064a2a2e572f58eae71312dc895b5fbf1) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Update mobile icon design

## 8.4.0

### Minor Changes

- [#11609](https://github.com/Shopify/polaris/pull/11609) [`c9e217d9d`](https://github.com/Shopify/polaris/commit/c9e217d9d7e1291ce7b83e51c1e1876718895e93) Thanks [@sam-b-rose](https://github.com/sam-b-rose)! - Updated icon set with consistency improvements

## 8.3.0

### Minor Changes

- [#11526](https://github.com/Shopify/polaris/pull/11526) [`b65f1e679`](https://github.com/Shopify/polaris/commit/b65f1e679bd96db4ff9097b36d719b371cf33f8a) Thanks [@j-wanita](https://github.com/j-wanita)! - Add list icons for product, collection, metaobject and text

* [#11531](https://github.com/Shopify/polaris/pull/11531) [`78ed5fe0d`](https://github.com/Shopify/polaris/commit/78ed5fe0d616db8c2cf76f59f9528211f81c23b3) Thanks [@j-wanita](https://github.com/j-wanita)! - Updated metaobject, metaobject reference, and metaobject filled icons

## 8.2.0

### Minor Changes

- [#11420](https://github.com/Shopify/polaris/pull/11420) [`7bb7054e8`](https://github.com/Shopify/polaris/commit/7bb7054e86aec66ce0824884e350c9ebf5f50430) Thanks [@jonarnaldo](https://github.com/jonarnaldo)! - Added `IncentiveIcon`

## 8.1.0

### Minor Changes

- [#11478](https://github.com/Shopify/polaris/pull/11478) [`b786bb93c`](https://github.com/Shopify/polaris/commit/b786bb93c153f853323ac2c2170ec4fb5bdfbecb) Thanks [@Rusty-UX](https://github.com/Rusty-UX)! - Added DatabaseConnectIcon

## 8.0.0

### Major Changes

- [#11138](https://github.com/Shopify/polaris/pull/11138) [`f91c4b661`](https://github.com/Shopify/polaris/commit/f91c4b661b1d9540dd515c6f073aeeb62e914023) Thanks [@alex-page](https://github.com/alex-page)! - This is a major update for `polaris-icons`. Please use the migration to update icon names to the latest version:

  ```shell
  npx @shopify/polaris-migrator icons-v8-update-names <path>
  ```

  Removed Major and Minor icon sizing. All icons are the same size.

  Added `BillIcon`, `BillFilledIcon`, `LogoCriteoIcon`, `LogoMetaIcon`, `LogoGoogleIcon`, `MetaobjectFilledIcon`, `PriceListIcon`, `BlankFilledIcon`, `BlankIcon`, `CursorBannerIcon`, `CursorOptionIcon`, `DomainIcon`, `EmailIcon`, `PersonExitIcon` and `PriceListFilledIcon`

  Updated icon design for `JobsIcon`, `JobsFilledIcon`, `AutomationIcon`, `AutomationFilledIcon`, `GiftCardIcon`, `InventoryFilledIcon`, `ReportsIcon`, `ShipmentFilledIcon`, `AppsFilledIcon`, `MarketsIcon`, `MarketsFilledIcon`, `BillingStatementDollarFilledIcon`, `BillingStatementEuroFilledIcon`, `BillingStatementPoundFilledIcon`, `BillingStatementRupeeFilledIcon`, `BillingStatementYenFilledIcon`, `LegalFilledIcon`, `IdentityCardIcon`, `IdentityCardFilledIcon`, `DomainsIcon`, `DomainNewIcon`, `DomainsFilledIcon`, `StoreIcon`, `StoreOnlineIcon`, `ManagedStoreIcon`, `ImportStoreIcon`, `TaxIcon`, `TaxFilledIcon`, `PackageFilledIcon`, `LocationIcon`, `LocationFilledIcon`, `InactiveLocationIcon`, `PinIcon`, `GlobeIcon`, `TransportIcon`, `NatureIcon`, `FoodIcon`, `ColorsIcon`, `DomainIcon`, `DragHandleIcon`, `EmailIcon`

  Removed `version` `exclusive_use` and `set` from icon `.yml` files

  Renamed many icons and replaced `Major` and `Minor` suffixes with `Icon`. See table:

  | Old name                            | New name                        |
  | ----------------------------------- | ------------------------------- |
  | `AbandonedCartMajor`                | `CartAbandonedIcon`             |
  | `AbandonedCartMinor`                | `CartAbandonedIcon`             |
  | `AbandonedCartFilledMajor`          | `CartAbandonedFilledIcon`       |
  | `AbandonedCartFilledMinor`          | `CartAbandonedFilledIcon`       |
  | `AccessibilityMajor`                | `EyeCheckMarkIcon`              |
  | `AccessibilityMinor`                | `EyeCheckMarkIcon`              |
  | `ActivitiesMajor`                   | `SportsIcon`                    |
  | `ActivitiesMinor`                   | `SportsIcon`                    |
  | `ActivityLogMajor`                  | `PageClockIcon`                 |
  | `ActivityLogMinor`                  | `PageClockIcon`                 |
  | `ActivityLogFilledMajor`            | `PageClockFilledIcon`           |
  | `ActivityLogFilledMinor`            | `PageClockFilledIcon`           |
  | `AddMajor`                          | `PlusIcon`                      |
  | `AddMinor`                          | `PlusIcon`                      |
  | `AddCodeMajor`                      | `CodeAddIcon`                   |
  | `AddCodeMinor`                      | `CodeAddIcon`                   |
  | `AddImageMajor`                     | `ImageAddIcon`                  |
  | `AddImageMinor`                     | `ImageAddIcon`                  |
  | `AddNoteMajor`                      | `NoteAddIcon`                   |
  | `AddNoteMinor`                      | `NoteAddIcon`                   |
  | `AddProductMajor`                   | `ProductAddIcon`                |
  | `AddProductMinor`                   | `ProductAddIcon`                |
  | `AdjustMajor`                       | `AdjustIcon`                    |
  | `AdjustMinor`                       | `AdjustIcon`                    |
  | `AffiliateMajor`                    | `AffiliateIcon`                 |
  | `AffiliateMinor`                    | `AffiliateIcon`                 |
  | `AlertMajor`                        | `AlertCircleIcon`               |
  | `AlertMinor`                        | `AlertCircleIcon`               |
  | `AnalyticsMajor`                    | `ChartVerticalIcon`             |
  | `AnalyticsMinor`                    | `ChartVerticalIcon`             |
  | `AnalyticsBarHorizontalMajor`       | `ChartHorizontalIcon`           |
  | `AnalyticsBarHorizontalMinor`       | `ChartHorizontalIcon`           |
  | `AnalyticsBarStackedMajor`          | `ChartStackedIcon`              |
  | `AnalyticsBarStackedMinor`          | `ChartStackedIcon`              |
  | `AnalyticsCohortMajor`              | `ChartCohortIcon`               |
  | `AnalyticsCohortMinor`              | `ChartCohortIcon`               |
  | `AnalyticsDonutMajor`               | `ChartDonutIcon`                |
  | `AnalyticsDonutMinor`               | `ChartDonutIcon`                |
  | `AnalyticsFilledMajor`              | `ChartVerticalFilledIcon`       |
  | `AnalyticsFilledMinor`              | `ChartVerticalFilledIcon`       |
  | `AnalyticsFunnelMajor`              | `ChartFunnelIcon`               |
  | `AnalyticsFunnelMinor`              | `ChartFunnelIcon`               |
  | `AnalyticsLineMajor`                | `ChartLineIcon`                 |
  | `AnalyticsLineMinor`                | `ChartLineIcon`                 |
  | `AnalyticsTableMajor`               | `DataTableIcon`                 |
  | `AnalyticsTableMinor`               | `DataTableIcon`                 |
  | `AnyClickModelMajor`                | `ChartHistogramFullIcon`        |
  | `AnyClickModelMinor`                | `ChartHistogramFullIcon`        |
  | `AppExtensionMajor`                 | `AppExtensionIcon`              |
  | `AppExtensionMinor`                 | `AppExtensionIcon`              |
  | `AppsMajor`                         | `AppsIcon`                      |
  | `AppsMinor`                         | `AppsIcon`                      |
  | `AppsFilledMajor`                   | `AppsFilledIcon`                |
  | `AppsFilledMinor`                   | `AppsFilledIcon`                |
  | `ArchiveMajor`                      | `ArchiveIcon`                   |
  | `ArchiveMinor`                      | `ArchiveIcon`                   |
  | `ArrowDownMajor`                    | `ArrowDownIcon`                 |
  | `ArrowDownMinor`                    | `ArrowDownIcon`                 |
  | `ArrowLeftMajor`                    | `ArrowLeftIcon`                 |
  | `ArrowLeftMinor`                    | `ArrowLeftIcon`                 |
  | `ArrowRightMajor`                   | `ArrowRightIcon`                |
  | `ArrowRightMinor`                   | `ArrowRightIcon`                |
  | `ArrowUpMajor`                      | `ArrowUpIcon`                   |
  | `ArrowUpMinor`                      | `ArrowUpIcon`                   |
  | `AttachmentMajor`                   | `AttachmentIcon`                |
  | `AttachmentMinor`                   | `AttachmentIcon`                |
  | `AttachmentFilledMajor`             | `AttachmentFilledIcon`          |
  | `AttachmentFilledMinor`             | `AttachmentFilledIcon`          |
  | `AutomationMajor`                   | `AutomationIcon`                |
  | `AutomationMinor`                   | `AutomationIcon`                |
  | `AutomationFilledMajor`             | `AutomationFilledIcon`          |
  | `AutomationFilledMinor`             | `AutomationFilledIcon`          |
  | `BackspaceMajor`                    | `BackspaceIcon`                 |
  | `BackspaceMinor`                    | `BackspaceIcon`                 |
  | `BalanceMajor`                      | `WalletIcon`                    |
  | `BalanceMinor`                      | `WalletIcon`                    |
  | `BalanceFilledMajor`                | `WalletFilledIcon`              |
  | `BalanceFilledMinor`                | `WalletFilledIcon`              |
  | `BankMajor`                         | `BankIcon`                      |
  | `BankMinor`                         | `BankIcon`                      |
  | `BankFilledMajor`                   | `BankFilledIcon`                |
  | `BankFilledMinor`                   | `BankFilledIcon`                |
  | `BarcodeMajor`                      | `BarcodeIcon`                   |
  | `BarcodeMinor`                      | `BarcodeIcon`                   |
  | `BehaviorMajor`                     | `CursorIcon`                    |
  | `BehaviorMinor`                     | `CursorIcon`                    |
  | `BehaviorFilledMajor`               | `CursorFilledIcon`              |
  | `BehaviorFilledMinor`               | `CursorFilledIcon`              |
  | `BillingStatementDollarMajor`       | `ReceiptDollarIcon`             |
  | `BillingStatementDollarMinor`       | `ReceiptDollarIcon`             |
  | `BillingStatementDollarFilledMajor` | `ReceiptDollarFilledIcon`       |
  | `BillingStatementDollarFilledMinor` | `ReceiptDollarFilledIcon`       |
  | `BillingStatementEuroMajor`         | `ReceiptEuroIcon`               |
  | `BillingStatementEuroMinor`         | `ReceiptEuroIcon`               |
  | `BillingStatementEuroFilledMajor`   | `ReceiptEuroFilledIcon`         |
  | `BillingStatementEuroFilledMinor`   | `ReceiptEuroFilledIcon`         |
  | `BillingStatementPoundMajor`        | `ReceiptPoundIcon`              |
  | `BillingStatementPoundMinor`        | `ReceiptPoundIcon`              |
  | `BillingStatementPoundFilledMajor`  | `ReceiptPoundFilledIcon`        |
  | `BillingStatementPoundFilledMinor`  | `ReceiptPoundFilledIcon`        |
  | `BillingStatementRupeeMajor`        | `ReceiptRupeeIcon`              |
  | `BillingStatementRupeeMinor`        | `ReceiptRupeeIcon`              |
  | `BillingStatementRupeeFilledMajor`  | `ReceiptRupeeFilledIcon`        |
  | `BillingStatementRupeeFilledMinor`  | `ReceiptRupeeFilledIcon`        |
  | `BillingStatementYenMajor`          | `ReceiptYenIcon`                |
  | `BillingStatementYenMinor`          | `ReceiptYenIcon`                |
  | `BillingStatementYenFilledMajor`    | `ReceiptYenFilledIcon`          |
  | `BillingStatementYenFilledMinor`    | `ReceiptYenFilledIcon`          |
  | `BillPayMajor`                      | `ReceiptFoldedIcon`             |
  | `BillPayMinor`                      | `ReceiptFoldedIcon`             |
  | `BillPayFilledMajor`                | `ReceiptFoldedFilledIcon`       |
  | `BillPayFilledMinor`                | `ReceiptFoldedFilledIcon`       |
  | `BlockMajor`                        | `LayoutBlockIcon`               |
  | `BlockMinor`                        | `LayoutBlockIcon`               |
  | `BlockquoteMajor`                   | `TextQuoteIcon`                 |
  | `BlockquoteMinor`                   | `TextQuoteIcon`                 |
  | `BlogMajor`                         | `BlogIcon`                      |
  | `BlogMinor`                         | `BlogIcon`                      |
  | `BoldMajor`                         | `TextBoldIcon`                  |
  | `BoldMinor`                         | `TextBoldIcon`                  |
  | `BugMajor`                          | `BugIcon`                       |
  | `BugMinor`                          | `BugIcon`                       |
  | `ButtonMajor`                       | `ButtonIcon`                    |
  | `ButtonMinor`                       | `ButtonIcon`                    |
  | `ButtonCornerPillMajor`             | `CornerPillIcon`                |
  | `ButtonCornerPillMinor`             | `CornerPillIcon`                |
  | `ButtonCornerRoundedMajor`          | `CornerRoundIcon`               |
  | `ButtonCornerRoundedMinor`          | `CornerRoundIcon`               |
  | `ButtonCornerSquareMajor`           | `CornerSquareIcon`              |
  | `ButtonCornerSquareMinor`           | `CornerSquareIcon`              |
  | `BuyButtonMajor`                    | `ButtonPressIcon`               |
  | `BuyButtonMinor`                    | `ButtonPressIcon`               |
  | `BuyButtonButtonLayoutMajor`        | `LayoutBuyButtonIcon`           |
  | `BuyButtonButtonLayoutMinor`        | `LayoutBuyButtonIcon`           |
  | `BuyButtonHorizontalLayoutMajor`    | `LayoutBuyButtonHorizontalIcon` |
  | `BuyButtonHorizontalLayoutMinor`    | `LayoutBuyButtonHorizontalIcon` |
  | `BuyButtonVerticalLayoutMajor`      | `LayoutBuyButtonVerticalIcon`   |
  | `BuyButtonVerticalLayoutMinor`      | `LayoutBuyButtonVerticalIcon`   |
  | `CalendarMajor`                     | `CalendarIcon`                  |
  | `CalendarMinor`                     | `CalendarIcon`                  |
  | `CalendarTickMajor`                 | `CalendarCheckIcon`             |
  | `CalendarTickMinor`                 | `CalendarCheckIcon`             |
  | `CalendarTimeMajor`                 | `CalendarTimeIcon`              |
  | `CalendarTimeMinor`                 | `CalendarTimeIcon`              |
  | `CameraMajor`                       | `CameraIcon`                    |
  | `CameraMinor`                       | `CameraIcon`                    |
  | `CancelMajor`                       | `XIcon`                         |
  | `CancelMinor`                       | `XIcon`                         |
  | `CancelSmallMajor`                  | `XSmallIcon`                    |
  | `CancelSmallMinor`                  | `XSmallIcon`                    |
  | `CapitalMajor`                      | `FlowerIcon`                    |
  | `CapitalMinor`                      | `FlowerIcon`                    |
  | `CapitalFilledMajor`                | `FlowerFilledIcon`              |
  | `CapitalFilledMinor`                | `FlowerFilledIcon`              |
  | `CapturePaymentMajor`               | `PaymentCaptureIcon`            |
  | `CapturePaymentMinor`               | `PaymentCaptureIcon`            |
  | `CardReaderMajor`                   | `CreditCardReaderIcon`          |
  | `CardReaderMinor`                   | `CreditCardReaderIcon`          |
  | `CardReaderChipMajor`               | `CreditCardReaderChipIcon`      |
  | `CardReaderChipMinor`               | `CreditCardReaderChipIcon`      |
  | `CardReaderTapMajor`                | `CreditCardReaderTapIcon`       |
  | `CardReaderTapMinor`                | `CreditCardReaderTapIcon`       |
  | `CaretDownMajor`                    | `CaretDownIcon`                 |
  | `CaretDownMinor`                    | `CaretDownIcon`                 |
  | `CaretUpMajor`                      | `CaretUpIcon`                   |
  | `CaretUpMinor`                      | `CaretUpIcon`                   |
  | `CartMajor`                         | `CartIcon`                      |
  | `CartMinor`                         | `CartIcon`                      |
  | `CartDownMajor`                     | `CartDownIcon`                  |
  | `CartDownMinor`                     | `CartDownIcon`                  |
  | `CartDownFilledMajor`               | `CartDownFilledIcon`            |
  | `CartDownFilledMinor`               | `CartDownFilledIcon`            |
  | `CartFilledMajor`                   | `CartFilledIcon`                |
  | `CartFilledMinor`                   | `CartFilledIcon`                |
  | `CartUpMajor`                       | `CartUpIcon`                    |
  | `CartUpMinor`                       | `CartUpIcon`                    |
  | `CashDollarMajor`                   | `CashDollarIcon`                |
  | `CashDollarMinor`                   | `CashDollarIcon`                |
  | `CashDollarFilledMajor`             | `CashDollarFilledIcon`          |
  | `CashDollarFilledMinor`             | `CashDollarFilledIcon`          |
  | `CashEuroMajor`                     | `CashEuroIcon`                  |
  | `CashEuroMinor`                     | `CashEuroIcon`                  |
  | `CashPoundMajor`                    | `CashPoundIcon`                 |
  | `CashPoundMinor`                    | `CashPoundIcon`                 |
  | `CashRupeeMajor`                    | `CashRupeeIcon`                 |
  | `CashRupeeMinor`                    | `CashRupeeIcon`                 |
  | `CashYenMajor`                      | `CashYenIcon`                   |
  | `CashYenMinor`                      | `CashYenIcon`                   |
  | `CategoriesMajor`                   | `CategoriesIcon`                |
  | `CategoriesMinor`                   | `CategoriesIcon`                |
  | `ChannelsMajor`                     | `ChannelsIcon`                  |
  | `ChannelsMinor`                     | `ChannelsIcon`                  |
  | `ChatMajor`                         | `ChatIcon`                      |
  | `ChatMinor`                         | `ChatIcon`                      |
  | `ChecklistMajor`                    | `ClipboardCheckIcon`            |
  | `ChecklistMinor`                    | `ClipboardCheckIcon`            |
  | `ChecklistAlternateMajor`           | `ClipboardChecklistIcon`        |
  | `ChecklistAlternateMinor`           | `ClipboardChecklistIcon`        |
  | `CheckoutMajor`                     | `CartIcon`                      |
  | `CheckoutMinor`                     | `CartIcon`                      |
  | `ChevronDownMajor`                  | `ChevronDownIcon`               |
  | `ChevronDownMinor`                  | `ChevronDownIcon`               |
  | `ChevronLeftMajor`                  | `ChevronLeftIcon`               |
  | `ChevronLeftMinor`                  | `ChevronLeftIcon`               |
  | `ChevronRightMajor`                 | `ChevronRightIcon`              |
  | `ChevronRightMinor`                 | `ChevronRightIcon`              |
  | `ChevronUpMajor`                    | `ChevronUpIcon`                 |
  | `ChevronUpMinor`                    | `ChevronUpIcon`                 |
  | `CircleAlertMajor`                  | `AlertCircleIcon`               |
  | `CircleAlertMinor`                  | `AlertCircleIcon`               |
  | `CircleCancelMajor`                 | `XCircleIcon`                   |
  | `CircleCancelMinor`                 | `XCircleIcon`                   |
  | `CircleChevronDownMajor`            | `CircleChevronDownIcon`         |
  | `CircleChevronDownMinor`            | `CircleChevronDownIcon`         |
  | `CircleChevronLeftMajor`            | `CircleChevronLeftIcon`         |
  | `CircleChevronLeftMinor`            | `CircleChevronLeftIcon`         |
  | `CircleChevronRightMajor`           | `CircleChevronRightIcon`        |
  | `CircleChevronRightMinor`           | `CircleChevronRightIcon`        |
  | `CircleChevronUpMajor`              | `CircleChevronUpIcon`           |
  | `CircleChevronUpMinor`              | `CircleChevronUpIcon`           |
  | `CircleDisabledMajor`               | `DisabledIcon`                  |
  | `CircleDisableMinor`                | `DisabledIcon`                  |
  | `CircleDotsMajor`                   | `MenuHorizontalIcon`            |
  | `CircleDotsMinor`                   | `MenuHorizontalIcon`            |
  | `CircleDownMajor`                   | `CircleDownIcon`                |
  | `CircleDownMinor`                   | `CircleDownIcon`                |
  | `CircleInformationMajor`            | `InfoIcon`                      |
  | `CircleInformationMinor`            | `InfoIcon`                      |
  | `CircleLeftMajor`                   | `CircleLeftIcon`                |
  | `CircleLeftMinor`                   | `CircleLeftIcon`                |
  | `CircleMinusMajor`                  | `MinusCircleIcon`               |
  | `CircleMinusMinor`                  | `MinusCircleIcon`               |
  | `CircleMinusOutlineMajor`           | `MinusCircleIcon`               |
  | `CircleMinusOutlineMinor`           | `MinusCircleIcon`               |
  | `CirclePlusMajor`                   | `PlusCircleIcon`                |
  | `CirclePlusMinor`                   | `PlusCircleIcon`                |
  | `CirclePlusOutlineMajor`            | `PlusCircleIcon`                |
  | `CirclePlusOutlineMinor`            | `PlusCircleIcon`                |
  | `CircleRightMajor`                  | `CircleRightIcon`               |
  | `CircleRightMinor`                  | `CircleRightIcon`               |
  | `CircleTickMajor`                   | `CheckCircleIcon`               |
  | `CircleTickMinor`                   | `CheckCircleIcon`               |
  | `CircleTickOutlineMajor`            | `CheckCircleIcon`               |
  | `CircleTickOutlineMinor`            | `CheckCircleIcon`               |
  | `CircleUpMajor`                     | `CircleUpIcon`                  |
  | `CircleUpMinor`                     | `CircleUpIcon`                  |
  | `ClipboardMajor`                    | `ClipboardIcon`                 |
  | `ClipboardMinor`                    | `ClipboardIcon`                 |
  | `ClockMajor`                        | `ClockIcon`                     |
  | `ClockMinor`                        | `ClockIcon`                     |
  | `CodeMajor`                         | `CodeIcon`                      |
  | `CodeMinor`                         | `CodeIcon`                      |
  | `CollectionReferenceMajor`          | `CollectionReferenceIcon`       |
  | `CollectionReferenceMinor`          | `CollectionReferenceIcon`       |
  | `CollectionsMajor`                  | `CollectionIcon`                |
  | `CollectionsMinor`                  | `CollectionIcon`                |
  | `CollectionsFilledMajor`            | `CollectionFilledIcon`          |
  | `CollectionsFilledMinor`            | `CollectionFilledIcon`          |
  | `ColorNoneMajor`                    | `ColorNoneIcon`                 |
  | `ColorNoneMinor`                    | `ColorNoneIcon`                 |
  | `ColorsMajor`                       | `ColorIcon`                     |
  | `ColorsMinor`                       | `ColorIcon`                     |
  | `Column1Major`                      | `LayoutColumn1Icon`             |
  | `Column1Minor`                      | `LayoutColumn1Icon`             |
  | `Columns2Major`                     | `LayoutColumns2Icon`            |
  | `Columns2Minor`                     | `LayoutColumns2Icon`            |
  | `Columns3Major`                     | `LayoutColumns3Icon`            |
  | `Columns3Minor`                     | `LayoutColumns3Icon`            |
  | `ColumnWithTextMajor`               | `TextInColumnsIcon`             |
  | `ColumnWithTextMinor`               | `TextInColumnsIcon`             |
  | `ComposeMajor`                      | `ComposeIcon`                   |
  | `ComposeMinor`                      | `ComposeIcon`                   |
  | `ConfettiMajor`                     | `ConfettiIcon`                  |
  | `ConfettiMinor`                     | `ConfettiIcon`                  |
  | `ConnectMajor`                      | `ConnectIcon`                   |
  | `ConnectMinor`                      | `ConnectIcon`                   |
  | `ContentMajor`                      | `ContentIcon`                   |
  | `ContentMinor`                      | `ContentIcon`                   |
  | `ContentFilledMajor`                | `ContentFilledIcon`             |
  | `ContentFilledMinor`                | `ContentFilledIcon`             |
  | `ConversationMajor`                 | `ChatIcon`                      |
  | `ConversationMinor`                 | `ChatIcon`                      |
  | `CreditCardMajor`                   | `CreditCardIcon`                |
  | `CreditCardMinor`                   | `CreditCardIcon`                |
  | `CreditCardCancelMajor`             | `CreditCardCancelIcon`          |
  | `CreditCardCancelMinor`             | `CreditCardCancelIcon`          |
  | `CreditCardPercentMajor`            | `CreditCardPercentIcon`         |
  | `CreditCardPercentMinor`            | `CreditCardPercentIcon`         |
  | `CreditCardSecureMajor`             | `CreditCardSecureIcon`          |
  | `CreditCardSecureMinor`             | `CreditCardSecureIcon`          |
  | `CurrencyConvertMajor`              | `CurrencyConvertIcon`           |
  | `CurrencyConvertMinor`              | `CurrencyConvertIcon`           |
  | `CustomerMinusMajor`                | `PersonRemoveIcon`              |
  | `CustomerMinusMinor`                | `PersonRemoveIcon`              |
  | `CustomerPlusMajor`                 | `PersonAddIcon`                 |
  | `CustomerPlusMinor`                 | `PersonAddIcon`                 |
  | `CustomersMajor`                    | `PersonIcon`                    |
  | `CustomersMinor`                    | `PersonIcon`                    |
  | `CustomersFilledMajor`              | `PersonFilledIcon`              |
  | `CustomersFilledMinor`              | `PersonFilledIcon`              |
  | `DataDrivenModelMajor`              | `ChartVerticalIcon`             |
  | `DataDrivenModelMinor`              | `ChartVerticalIcon`             |
  | `DataVisualizationMajor`            | `DataPresentationIcon`          |
  | `DataVisualizationMinor`            | `DataPresentationIcon`          |
  | `DecimalMajor`                      | `HashtagDecimalIcon`            |
  | `DecimalMinor`                      | `HashtagDecimalIcon`            |
  | `DeleteMajor`                       | `DeleteIcon`                    |
  | `DeleteMinor`                       | `DeleteIcon`                    |
  | `DesktopMajor`                      | `DesktopIcon`                   |
  | `DesktopMinor`                      | `DesktopIcon`                   |
  | `DetailedPopUpMajor`                | `LayoutPopupIcon`               |
  | `DetailedPopUpMinor`                | `LayoutPopupIcon`               |
  | `DiamondAlertMajor`                 | `AlertDiamondIcon`              |
  | `DiamondAlertMinor`                 | `AlertDiamondIcon`              |
  | `DigitalMediaReceiverMajor`         | `MediaReceiverIcon`             |
  | `DigitalMediaReceiverMinor`         | `MediaReceiverIcon`             |
  | `DiscountAutomaticMajor`            | `CartDiscountIcon`              |
  | `DiscountAutomaticMinor`            | `CartDiscountIcon`              |
  | `DiscountCodeMajor`                 | `DiscountCodeIcon`              |
  | `DiscountCodeMinor`                 | `DiscountCodeIcon`              |
  | `DiscountsMajor`                    | `DiscountIcon`                  |
  | `DiscountsMinor`                    | `DiscountIcon`                  |
  | `DiscountsFilledMajor`              | `DiscountFilledIcon`            |
  | `DiscountsFilledMinor`              | `DiscountFilledIcon`            |
  | `DisputeMajor`                      | `AlertBubbleIcon`               |
  | `DisputeMinor`                      | `AlertBubbleIcon`               |
  | `DnsSettingsMajor`                  | `DnsSettingsIcon`               |
  | `DnsSettingsMinor`                  | `DnsSettingsIcon`               |
  | `DockFloatingMajor`                 | `DockFloatingIcon`              |
  | `DockFloatingMinor`                 | `DockFloatingIcon`              |
  | `DockSideMajor`                     | `DockSideIcon`                  |
  | `DockSideMinor`                     | `DockSideIcon`                  |
  | `DomainNewMajor`                    | `DomainNewIcon`                 |
  | `DomainNewMinor`                    | `DomainNewIcon`                 |
  | `DomainRedirectMajor`               | `DomainRedirectIcon`            |
  | `DomainRedirectMinor`               | `DomainRedirectIcon`            |
  | `DomainsMajor`                      | `DomainIcon`                    |
  | `DomainsMinor`                      | `DomainIcon`                    |
  | `DomainsFilledMajor`                | `DomainFilledIcon`              |
  | `DomainsFilledMinor`                | `DomainFilledIcon`              |
  | `DraftOrdersMajor`                  | `OrderDraftIcon`                |
  | `DraftOrdersMinor`                  | `OrderDraftIcon`                |
  | `DraftOrdersFilledMajor`            | `OrderDraftFilledIcon`          |
  | `DraftOrdersFilledMinor`            | `OrderDraftFilledIcon`          |
  | `DragDropMajor`                     | `DragDropIcon`                  |
  | `DragDropMinor`                     | `DragDropIcon`                  |
  | `DragHandleMajor`                   | `DragHandleIcon`                |
  | `DragHandleMinor`                   | `DragHandleIcon`                |
  | `DropdownMajor`                     | `CaretDownIcon`                 |
  | `DropdownMinor`                     | `CaretDownIcon`                 |
  | `DuplicateMajor`                    | `DuplicateIcon`                 |
  | `DuplicateMinor`                    | `DuplicateIcon`                 |
  | `DynamicSourceMajor`                | `DatabaseIcon`                  |
  | `DynamicSourceMinor`                | `DatabaseIcon`                  |
  | `EditMajor`                         | `EditIcon`                      |
  | `EditMinor`                         | `EditIcon`                      |
  | `EmailMajor`                        | `EmailIcon`                     |
  | `EmailMinor`                        | `EmailIcon`                     |
  | `EmailNewsletterMajor`              | `EmailNewsletterIcon`           |
  | `EmailNewsletterMinor`              | `EmailNewsletterIcon`           |
  | `EmbedMajor`                        | `CodeIcon`                      |
  | `EmbedMinor`                        | `CodeIcon`                      |
  | `EnableSelectionMajor`              | `CheckboxIcon`                  |
  | `EnableSelectionMinor`              | `CheckboxIcon`                  |
  | `EnterMajor`                        | `EnterIcon`                     |
  | `EnterMinor`                        | `EnterIcon`                     |
  | `EnvelopeMajor`                     | `EnvelopeIcon`                  |
  | `EnvelopeMinor`                     | `EnvelopeIcon`                  |
  | `ExchangeMajor`                     | `ExchangeIcon`                  |
  | `ExchangeMinor`                     | `ExchangeIcon`                  |
  | `ExistingInventoryMajor`            | `InventoryIcon`                 |
  | `ExistingInventoryMinor`            | `InventoryIcon`                 |
  | `ExitMajor`                         | `ExitIcon`                      |
  | `ExitMinor`                         | `ExitIcon`                      |
  | `ExploreImagesMajor`                | `ImageExploreIcon`              |
  | `ExploreImagesMinor`                | `ImageExploreIcon`              |
  | `ExportMajor`                       | `ExportIcon`                    |
  | `ExportMinor`                       | `ExportIcon`                    |
  | `ExtendMajor`                       | `ArrowsOutHorizontalIcon`       |
  | `ExtendMinor`                       | `ArrowsOutHorizontalIcon`       |
  | `ExternalMajor`                     | `ExternalIcon`                  |
  | `ExternalMinor`                     | `ExternalIcon`                  |
  | `ExternalSmallMajor`                | `ExternalSmallIcon`             |
  | `ExternalSmallMinor`                | `ExternalSmallIcon`             |
  | `EyeDropperMajor`                   | `EyeDropperIcon`                |
  | `EyeDropperMinor`                   | `EyeDropperIcon`                |
  | `FacebookMajor`                     | `LogoFacebookIcon`              |
  | `FacebookMinor`                     | `LogoFacebookIcon`              |
  | `FaviconMajor`                      | `FaviconIcon`                   |
  | `FaviconMinor`                      | `FaviconIcon`                   |
  | `FavoriteMajor`                     | `StarIcon`                      |
  | `FavoriteMinor`                     | `StarIcon`                      |
  | `FeaturedCollectionMajor`           | `CollectionFeaturedIcon`        |
  | `FeaturedCollectionMinor`           | `CollectionFeaturedIcon`        |
  | `FeaturedContentMajor`              | `PageHeartIcon`                 |
  | `FeaturedContentMinor`              | `PageHeartIcon`                 |
  | `FileMajor`                         | `FileIcon`                      |
  | `FileMinor`                         | `FileIcon`                      |
  | `FileFilledMajor`                   | `FileFilledIcon`                |
  | `FileFilledMinor`                   | `FileFilledIcon`                |
  | `FilterMajor`                       | `FilterIcon`                    |
  | `FilterMinor`                       | `FilterIcon`                    |
  | `FinancesMajor`                     | `MoneyIcon`                     |
  | `FinancesMinor`                     | `BankIcon`                      |
  | `FinancesFilledMajor`               | `MoneyFilledIcon`               |
  | `FinancesFilledMinor`               | `MoneyFilledIcon`               |
  | `FirstClickModelMajor`              | `ChartHistogramFirstIcon`       |
  | `FirstClickModelMinor`              | `ChartHistogramFirstIcon`       |
  | `FirstOrderMajor`                   | `OrderFirstIcon`                |
  | `FirstOrderMinor`                   | `OrderFirstIcon`                |
  | `FirstVisitMajor`                   | `EyeFirstIcon`                  |
  | `FirstVisitMinor`                   | `EyeFirstIcon`                  |
  | `FlagMajor`                         | `FlagIcon`                      |
  | `FlagMinor`                         | `FlagIcon`                      |
  | `FlipCameraMajor`                   | `CameraFlipIcon`                |
  | `FlipCameraMinor`                   | `CameraFlipIcon`                |
  | `FolderMajor`                       | `FolderIcon`                    |
  | `FolderMinor`                       | `FolderIcon`                    |
  | `FolderDownMajor`                   | `FolderDownIcon`                |
  | `FolderDownMinor`                   | `FolderDownIcon`                |
  | `FolderMinusMajor`                  | `FolderRemoveIcon`              |
  | `FolderMinusMinor`                  | `FolderRemoveIcon`              |
  | `FolderPlusMajor`                   | `FolderAddIcon`                 |
  | `FolderPlusMinor`                   | `FolderAddIcon`                 |
  | `FolderUpMajor`                     | `FolderUpIcon`                  |
  | `FolderUpMinor`                     | `FolderUpIcon`                  |
  | `FollowUpEmailMajor`                | `EmailFollowUpIcon`             |
  | `FollowUpEmailMinor`                | `EmailFollowUpIcon`             |
  | `FoodMajor`                         | `FoodIcon`                      |
  | `FoodMinor`                         | `FoodIcon`                      |
  | `FooterMajor`                       | `LayoutFooterIcon`              |
  | `FooterMinor`                       | `LayoutFooterIcon`              |
  | `FormsMajor`                        | `FormsIcon`                     |
  | `FormsMinor`                        | `FormsIcon`                     |
  | `FraudProtectMajor`                 | `ShieldPersonIcon`              |
  | `FraudProtectMinor`                 | `ShieldPersonIcon`              |
  | `FraudProtectPendingMajor`          | `ShieldPendingIcon`             |
  | `FraudProtectPendingMinor`          | `ShieldPendingIcon`             |
  | `FraudProtectUnprotectedMajor`      | `ShieldNoneIcon`                |
  | `FraudProtectUnprotectedMinor`      | `ShieldNoneIcon`                |
  | `FulfillmentFulfilledMajor`         | `PackageFulfilledIcon`          |
  | `FulfillmentFulfilledMinor`         | `PackageFulfilledIcon`          |
  | `FulfillmentOnHoldMajor`            | `PackageOnHoldIcon`             |
  | `FulfillmentOnHoldMinor`            | `PackageOnHoldIcon`             |
  | `GamesConsoleMajor`                 | `GamesIcon`                     |
  | `GamesConsoleMinor`                 | `GamesIcon`                     |
  | `GaugeMajor`                        | `GaugeIcon`                     |
  | `GaugeMinor`                        | `GaugeIcon`                     |
  | `GiftCardMajor`                     | `GiftCardIcon`                  |
  | `GiftCardMinor`                     | `GiftCardIcon`                  |
  | `GiftCardFilledMajor`               | `GiftCardFilledIcon`            |
  | `GiftCardFilledMinor`               | `GiftCardFilledIcon`            |
  | `GlobeMajor`                        | `GlobeIcon`                     |
  | `GlobeMinor`                        | `GlobeIcon`                     |
  | `GrammarMajor`                      | `TextGrammarIcon`               |
  | `GrammarMinor`                      | `TextGrammarIcon`               |
  | `HashtagMajor`                      | `HashtagIcon`                   |
  | `HashtagMinor`                      | `HashtagIcon`                   |
  | `HeaderMajor`                       | `LayoutHeaderIcon`              |
  | `HeaderMinor`                       | `LayoutHeaderIcon`              |
  | `HeartMajor`                        | `HeartIcon`                     |
  | `HeartMinor`                        | `HeartIcon`                     |
  | `HideMajor`                         | `HideIcon`                      |
  | `HideMinor`                         | `HideIcon`                      |
  | `HideKeyboardMajor`                 | `KeyboardHideIcon`              |
  | `HideKeyboardMinor`                 | `KeyboardHideIcon`              |
  | `HintMajor`                         | `LightbulbIcon`                 |
  | `HintMinor`                         | `LightbulbIcon`                 |
  | `HomeMajor`                         | `HomeIcon`                      |
  | `HomeMinor`                         | `HomeIcon`                      |
  | `HomeFilledMajor`                   | `HomeFilledIcon`                |
  | `HomeFilledMinor`                   | `HomeFilledIcon`                |
  | `HorizontalDotsMajor`               | `MenuHorizontalIcon`            |
  | `HorizontalDotsMinor`               | `MenuHorizontalIcon`            |
  | `IconsMajor`                        | `IconsIcon`                     |
  | `IconsMinor`                        | `IconsIcon`                     |
  | `IconsFilledMajor`                  | `IconsFilledIcon`               |
  | `IconsFilledMinor`                  | `IconsFilledIcon`               |
  | `IdentityCardMajor`                 | `IdentityCardIcon`              |
  | `IdentityCardMinor`                 | `IdentityCardIcon`              |
  | `IdentityCardFilledMajor`           | `IdentityCardFilledIcon`        |
  | `IdentityCardFilledMinor`           | `IdentityCardFilledIcon`        |
  | `IllustrationMajor`                 | `PaintBrushRoundIcon`           |
  | `IllustrationMinor`                 | `PaintBrushRoundIcon`           |
  | `ImageMajor`                        | `ImageIcon`                     |
  | `ImageMinor`                        | `ImageIcon`                     |
  | `ImageAltMajor`                     | `ImageAltIcon`                  |
  | `ImageAltMinor`                     | `ImageAltIcon`                  |
  | `ImagesMajor`                       | `ImagesIcon`                    |
  | `ImagesMinor`                       | `ImagesIcon`                    |
  | `ImageWithTextMajor`                | `TextWithImageIcon`             |
  | `ImageWithTextMinor`                | `TextWithImageIcon`             |
  | `ImageWithTextOverlayMajor`         | `ImageWithTextOverlayIcon`      |
  | `ImageWithTextOverlayMinor`         | `ImageWithTextOverlayIcon`      |
  | `ImportMajor`                       | `ImportIcon`                    |
  | `ImportMinor`                       | `ImportIcon`                    |
  | `ImportStoreMajor`                  | `StoreImportIcon`               |
  | `ImportStoreMinor`                  | `StoreImportIcon`               |
  | `IncomingMajor`                     | `IncomingIcon`                  |
  | `IncomingMinor`                     | `IncomingIcon`                  |
  | `IndentMajor`                       | `TextIndentIcon`                |
  | `IndentMinor`                       | `TextIndentIcon`                |
  | `InfoMajor`                         | `InfoIcon`                      |
  | `InfoMinor`                         | `InfoIcon`                      |
  | `InsertDynamicSourceMajor`          | `DatabaseAddIcon`               |
  | `InsertDynamicSourceMinor`          | `DatabaseAddIcon`               |
  | `InstagramMajor`                    | `LogoInstagramIcon`             |
  | `InstagramMinor`                    | `LogoInstagramIcon`             |
  | `InstallMajor`                      | `ImportIcon`                    |
  | `InstallMinor`                      | `ImportIcon`                    |
  | `InventoryMajor`                    | `InventoryIcon`                 |
  | `InventoryMinor`                    | `InventoryIcon`                 |
  | `InventoryFilledMajor`              | `InventoryFilledIcon`           |
  | `InventoryFilledMinor`              | `InventoryFilledIcon`           |
  | `InviteMajor`                       | `EmailIcon`                     |
  | `InviteMinor`                       | `EmailIcon`                     |
  | `IqMajor`                           | `IqIcon`                        |
  | `IqMinor`                           | `IqIcon`                        |
  | `ItalicMajor`                       | `TextItalicIcon`                |
  | `ItalicMinor`                       | `TextItalicIcon`                |
  | `JobsMajor`                         | `WorkIcon`                      |
  | `JobsMinor`                         | `WorkIcon`                      |
  | `JobsFilledMajor`                   | `WorkFilledIcon`                |
  | `JobsFilledMinor`                   | `WorkFilledIcon`                |
  | `KeyMajor`                          | `KeyIcon`                       |
  | `KeyMinor`                          | `KeyIcon`                       |
  | `KeyboardMajor`                     | `KeyboardIcon`                  |
  | `KeyboardMinor`                     | `KeyboardIcon`                  |
  | `LabelPrinterMajor`                 | `LabelPrinterIcon`              |
  | `LabelPrinterMinor`                 | `LabelPrinterIcon`              |
  | `LandingPageMajor`                  | `DomainLandingPageIcon`         |
  | `LandingPageMinor`                  | `DomainLandingPageIcon`         |
  | `LanguageMajor`                     | `LanguageIcon`                  |
  | `LanguageMinor`                     | `LanguageIcon`                  |
  | `LanguageFilledMajor`               | `LanguageFilledIcon`            |
  | `LanguageFilledMinor`               | `LanguageFilledIcon`            |
  | `LastClickModelMajor`               | `ChartHistogramLastIcon`        |
  | `LastClickModelMinor`               | `ChartHistogramLastIcon`        |
  | `LastNonDirectClickModelMajor`      | `ChartHistogramSecondLastIcon`  |
  | `LastNonDirectClickModelMinor`      | `ChartHistogramSecondLastIcon`  |
  | `LegalMajor`                        | `ContractIcon`                  |
  | `LegalMinor`                        | `ContractIcon`                  |
  | `LegalFilledMajor`                  | `ContractFilledIcon`            |
  | `LegalFilledMinor`                  | `ContractFilledIcon`            |
  | `LinearModelMajor`                  | `ChartHistogramFlatIcon`        |
  | `LinearModelMinor`                  | `ChartHistogramFlatIcon`        |
  | `LinkMajor`                         | `LinkIcon`                      |
  | `LinkMinor`                         | `LinkIcon`                      |
  | `ListMajor`                         | `ListBulletedIcon`              |
  | `ListMinor`                         | `ListBulletedIcon`              |
  | `LiveViewMajor`                     | `LiveIcon`                      |
  | `LiveViewMinor`                     | `LiveIcon`                      |
  | `LiveViewFilledMajor`               | `LiveFilledIcon`                |
  | `LiveViewFilledMinor`               | `LiveFilledIcon`                |
  | `LocationMajor`                     | `LocationIcon`                  |
  | `LocationMinor`                     | `LocationIcon`                  |
  | `LocationFilledMajor`               | `LocationFilledIcon`            |
  | `LocationFilledMinor`               | `LocationFilledIcon`            |
  | `InactiveLocationMajor`             | `LocationNoneIcon`              |
  | `InactiveLocationMinor`             | `LocationNoneIcon`              |
  | `LocationsMajor`                    | `LocationIcon`                  |
  | `LocationsMinor`                    | `LocationIcon`                  |
  | `LocationsInactiveMajor`            | `LocationNoneIcon`              |
  | `LocationsInactiveMinor`            | `LocationNoneIcon`              |
  | `LockMajor`                         | `LockIcon`                      |
  | `LockMinor`                         | `LockIcon`                      |
  | `LockFilledMajor`                   | `LockFilledIcon`                |
  | `LockFilledMinor`                   | `LockFilledIcon`                |
  | `LogoBlockMajor`                    | `LayoutLogoBlockIcon`           |
  | `LogoBlockMinor`                    | `LayoutLogoBlockIcon`           |
  | `LogOutMajor`                       | `ExitIcon`                      |
  | `LogOutMinor`                       | `ExitIcon`                      |
  | `MagicMajor`                        | `MagicIcon`                     |
  | `MagicMinor`                        | `MagicIcon`                     |
  | `ManagedStoreMajor`                 | `StoreManagedIcon`              |
  | `ManagedStoreMinor`                 | `StoreManagedIcon`              |
  | `MarketingMajor`                    | `TargetIcon`                    |
  | `MarketingMinor`                    | `TargetIcon`                    |
  | `MarketingFilledMajor`              | `TargetFilledIcon`              |
  | `MarketingFilledMinor`              | `TargetFilledIcon`              |
  | `MarketsMajor`                      | `MarketsIcon`                   |
  | `MarketsMinor`                      | `MarketsIcon`                   |
  | `MarketsFilledMajor`                | `MarketsFilledIcon`             |
  | `MarketsFilledMinor`                | `MarketsFilledIcon`             |
  | `MarkFulfilledMajor`                | `OrderFulfilledIcon`            |
  | `MarkFulfilledMinor`                | `OrderFulfilledIcon`            |
  | `MarkPaidMajor`                     | `ReceiptPaidIcon`               |
  | `MarkPaidMinor`                     | `ReceiptPaidIcon`               |
  | `MaximizeMajor`                     | `MaximizeIcon`                  |
  | `MaximizeMinor`                     | `MaximizeIcon`                  |
  | `MeasurementMajor`                  | `MeasurementSizeIcon`           |
  | `MeasurementMinor`                  | `MeasurementSizeIcon`           |
  | `MentionMajor`                      | `MentionIcon`                   |
  | `MentionMinor`                      | `MentionIcon`                   |
  | `MergeMajor`                        | `MergeIcon`                     |
  | `MergeMinor`                        | `MergeIcon`                     |
  | `MetafieldsMajor`                   | `MetafieldsIcon`                |
  | `MetafieldsMinor`                   | `MetafieldsIcon`                |
  | `MetafieldsFilledMajor`             | `MetafieldsFilledIcon`          |
  | `MetafieldsFilledMinor`             | `MetafieldsFilledIcon`          |
  | `MetaobjectMajor`                   | `MetaobjectIcon`                |
  | `MetaobjectMinor`                   | `MetaobjectIcon`                |
  | `MetaobjectFilledMajor`             | `MetaobjectFilledIcon`          |
  | `MetaobjectFilledMinor`             | `MetaobjectFilledIcon`          |
  | `MetaobjectReferenceMajor`          | `MetaobjectReferenceIcon`       |
  | `MetaobjectReferenceMinor`          | `MetaobjectReferenceIcon`       |
  | `MicrophoneMajor`                   | `MicrophoneIcon`                |
  | `MicrophoneMinor`                   | `MicrophoneIcon`                |
  | `MinimizeMajor`                     | `MinimizeIcon`                  |
  | `MinimizeMinor`                     | `MinimizeIcon`                  |
  | `MinusMajor`                        | `MinusIcon`                     |
  | `MinusMinor`                        | `MinusIcon`                     |
  | `MobileMajor`                       | `MobileIcon`                    |
  | `MobileMinor`                       | `MobileIcon`                    |
  | `MobileAcceptMajor`                 | `CheckIcon`                     |
  | `MobileAcceptMinor`                 | `CheckIcon`                     |
  | `MobileBackArrowMajor`              | `ArrowLeftIcon`                 |
  | `MobileBackArrowMinor`              | `ArrowLeftIcon`                 |
  | `MobileCancelMajor`                 | `XIcon`                         |
  | `MobileCancelMinor`                 | `XIcon`                         |
  | `MobileChevronMajor`                | `ChevronLeftIcon`               |
  | `MobileChevronMinor`                | `ChevronLeftIcon`               |
  | `MobileHamburgerMajor`              | `MenuIcon`                      |
  | `MobileHamburgerMinor`              | `MenuIcon`                      |
  | `MobileHorizontalDotsMajor`         | `MenuHorizontalIcon`            |
  | `MobileHorizontalDotsMinor`         | `MenuHorizontalIcon`            |
  | `MobilePlusMajor`                   | `PlusIcon`                      |
  | `MobilePlusMinor`                   | `PlusIcon`                      |
  | `MobileVerticalDotsMajor`           | `MenuVerticalIcon`              |
  | `MobileVerticalDotsMinor`           | `MenuVerticalIcon`              |
  | `MonerisMajor`                      | `CalculatorIcon`                |
  | `MonerisMinor`                      | `CalculatorIcon`                |
  | `MoneyMajor`                        | `MoneyIcon`                     |
  | `MoneyMinor`                        | `MoneyIcon`                     |
  | `MoneyFilledMajor`                  | `MoneyFilledIcon`               |
  | `MoneyFilledMinor`                  | `MoneyFilledIcon`               |
  | `NatureMajor`                       | `NatureIcon`                    |
  | `NatureMinor`                       | `NatureIcon`                    |
  | `NavigationMajor`                   | `CompassIcon`                   |
  | `NavigationMinor`                   | `CompassIcon`                   |
  | `NoteMajor`                         | `NoteIcon`                      |
  | `NoteMinor`                         | `NoteIcon`                      |
  | `NotificationMajor`                 | `NotificationIcon`              |
  | `NotificationMinor`                 | `NotificationIcon`              |
  | `NotificationFilledMajor`           | `NotificationFilledIcon`        |
  | `NotificationFilledMinor`           | `NotificationFilledIcon`        |
  | `OnlineStoreMajor`                  | `StoreOnlineIcon`               |
  | `OnlineStoreMinor`                  | `StoreOnlineIcon`               |
  | `OrderedListMajor`                  | `ListNumberedIcon`              |
  | `OrderedListMinor`                  | `ListNumberedIcon`              |
  | `OrdersMajor`                       | `OrderIcon`                     |
  | `OrdersMinor`                       | `OrderIcon`                     |
  | `OrdersFilledMajor`                 | `OrderFilledIcon`               |
  | `OrdersFilledMinor`                 | `OrderFilledIcon`               |
  | `OrderStatusMajor`                  | `OrdersStatusIcon`              |
  | `OrderStatusMinor`                  | `OrdersStatusIcon`              |
  | `OrganizationMajor`                 | `OrganizationIcon`              |
  | `OrganizationMinor`                 | `OrganizationIcon`              |
  | `OutdateMajor`                      | `TextIndentRemoveIcon`          |
  | `OutdateMinor`                      | `TextIndentRemoveIcon`          |
  | `OutdentMajor`                      | `Outdent`                       |
  | `OutdentMinor`                      | `Outdent`                       |
  | `OutgoingMajor`                     | `OutgoingIcon`                  |
  | `OutgoingMinor`                     | `OutgoingIcon`                  |
  | `PackageMajor`                      | `PackageIcon`                   |
  | `PackageMinor`                      | `PackageIcon`                   |
  | `PackageFilledMajor`                | `PackageFilledIcon`             |
  | `PackageFilledMinor`                | `PackageFilledIcon`             |
  | `PageMajor`                         | `PageIcon`                      |
  | `PageMinor`                         | `PageIcon`                      |
  | `PageClockMajor`                    | `PageClockIcon`                 |
  | `PageClockFilledMinor`              | `PageClockFilledIcon`           |
  | `PageDownMajor`                     | `PageDownIcon`                  |
  | `PageDownMinor`                     | `PageDownIcon`                  |
  | `PageMinusMajor`                    | `PageRemoveIcon`                |
  | `PageMinusMinor`                    | `PageRemoveIcon`                |
  | `PagePlusMajor`                     | `PageAddIcon`                   |
  | `PagePlusMinor`                     | `PageAddIcon`                   |
  | `PageReferenceMajor`                | `PageReferenceIcon`             |
  | `PageReferenceMinor`                | `PageReferenceIcon`             |
  | `PageUpMajor`                       | `PageUpIcon`                    |
  | `PageUpMinor`                       | `PageUpIcon`                    |
  | `PaginationEndMajor`                | `PaginationEndIcon`             |
  | `PaginationEndMinor`                | `PaginationEndIcon`             |
  | `PaginationStartMajor`              | `PaginationStartIcon`           |
  | `PaginationStartMinor`              | `PaginationStartIcon`           |
  | `PaintBrushMajor`                   | `PaintBrushFlatIcon`            |
  | `PaintBrushMinor`                   | `PaintBrushFlatIcon`            |
  | `PaperCheckMajor`                   | `PaperCheckIcon`                |
  | `PaperCheckMinor`                   | `PaperCheckIcon`                |
  | `PasskeyMajor`                      | `PasskeyIcon`                   |
  | `PasskeyMinor`                      | `PasskeyIcon`                   |
  | `PasskeyFilledMajor`                | `PasskeyFilledIcon`             |
  | `PasskeyFilledMinor`                | `PasskeyFilledIcon`             |
  | `PauseMajor`                        | `PauseCircleIcon`               |
  | `PauseMinor`                        | `PauseCircleIcon`               |
  | `PauseCircleMajor`                  | `PauseCircleIcon`               |
  | `PauseCircleMinor`                  | `PauseCircleIcon`               |
  | `PaymentsMajor`                     | `PaymentIcon`                   |
  | `PaymentsMinor`                     | `PaymentIcon`                   |
  | `PaymentsFilledMajor`               | `PaymentFilledIcon`             |
  | `PaymentsFilledMinor`               | `PaymentFilledIcon`             |
  | `PayoutsBlockedMajor`               | `MoneyNoneIcon`                 |
  | `PayoutsBlockedMinor`               | `MoneyNoneIcon`                 |
  | `PersonalizedTextMajor`             | `PersonalizedTextIcon`          |
  | `PersonalizedTextMinor`             | `PersonalizedTextIcon`          |
  | `PhoneMajor`                        | `PhoneIcon`                     |
  | `PhoneMinor`                        | `PhoneIcon`                     |
  | `PhoneInMajor`                      | `PhoneInIcon`                   |
  | `PhoneInMinor`                      | `PhoneInIcon`                   |
  | `PhoneOutMajor`                     | `PhoneOutIcon`                  |
  | `PhoneOutMinor`                     | `PhoneOutIcon`                  |
  | `PinMajor`                          | `PinFilledIcon`                 |
  | `PinMinor`                          | `PinFilledIcon`                 |
  | `PintrestMajor`                     | `LogoPinterestIcon`             |
  | `PintrestMinor`                     | `LogoPinterestIcon`             |
  | `PinUnfilledMajor`                  | `PinIcon`                       |
  | `PinUnfilledMinor`                  | `PinIcon`                       |
  | `PlanMajor`                         | `PlanIcon`                      |
  | `PlanMinor`                         | `PlanIcon`                      |
  | `PlanFilledMajor`                   | `PlanFilledIcon`                |
  | `PlanFilledMinor`                   | `PlanFilledIcon`                |
  | `PlayMajor`                         | `PlayIcon`                      |
  | `PlayMinor`                         | `PlayIcon`                      |
  | `PlayCircleMajor`                   | `PlayCircleIcon`                |
  | `PlayCircleMinor`                   | `PlayCircleIcon`                |
  | `PlusMajor`                         | `PlusIcon`                      |
  | `PlusMinor`                         | `PlusIcon`                      |
  | `PointOfSaleMajor`                  | `PointOfSaleIcon`               |
  | `PointOfSaleMinor`                  | `PointOfSaleIcon`               |
  | `PopularMajor`                      | `ChartPopularIcon`              |
  | `PopularMinor`                      | `ChartPopularIcon`              |
  | `PositionBasedModelMajor`           | `ChartHistogramFirstLastIcon`   |
  | `PositionBasedModelMinor`           | `ChartHistogramFirstLastIcon`   |
  | `PriceListMajor`                    | `PriceListIcon`                 |
  | `PriceListMinor`                    | `PriceListIcon`                 |
  | `PriceListFilledMajor`              | `PriceListFilledIcon`           |
  | `PriceListFilledMinor`              | `PriceListFilledIcon`           |
  | `PriceLookupMajor`                  | `SearchListIcon`                |
  | `PriceLookupMinor`                  | `SearchListIcon`                |
  | `PrintMajor`                        | `PrintIcon`                     |
  | `PrintMinor`                        | `PrintIcon`                     |
  | `ProductCostMajor`                  | `ProductCostIcon`               |
  | `ProductCostMinor`                  | `ProductCostIcon`               |
  | `ProductReferenceMajor`             | `ProductReferenceIcon`          |
  | `ProductReferenceMinor`             | `ProductReferenceIcon`          |
  | `ProductReturnsMajor`               | `ProductReturnIcon`             |
  | `ProductReturnsMinor`               | `ProductReturnIcon`             |
  | `ProductsMajor`                     | `ProductIcon`                   |
  | `ProductsMinor`                     | `ProductIcon`                   |
  | `ProductsFilledMajor`               | `ProductFilledIcon`             |
  | `ProductsFilledMinor`               | `ProductFilledIcon`             |
  | `ProfileMajor`                      | `ProfileIcon`                   |
  | `ProfileMinor`                      | `ProfileIcon`                   |
  | `PromoteMajor`                      | `MegaphoneIcon`                 |
  | `PromoteMinor`                      | `MegaphoneIcon`                 |
  | `PromoteFilledMajor`                | `MegaphoneFilledIcon`           |
  | `PromoteFilledMinor`                | `MegaphoneFilledIcon`           |
  | `QuestionMarkMajor`                 | `QuestionCircleIcon`            |
  | `QuestionMarkMinor`                 | `QuestionCircleIcon`            |
  | `QuestionMarkInverseMajor`          | `QuestionCircleIcon`            |
  | `QuestionMarkInverseMinor`          | `QuestionCircleIcon`            |
  | `QuickSaleMajor`                    | `CartSaleIcon`                  |
  | `QuickSaleMinor`                    | `CartSaleIcon`                  |
  | `ReadTimeMajor`                     | `BookIcon`                      |
  | `ReadTimeMinor`                     | `BookIcon`                      |
  | `ReceiptMajor`                      | `ReceiptIcon`                   |
  | `ReceiptMinor`                      | `ReceiptIcon`                   |
  | `RecentSearchesMajor`               | `SearchRecentIcon`              |
  | `RecentSearchesMinor`               | `SearchRecentIcon`              |
  | `RedoMajor`                         | `RedoIcon`                      |
  | `RedoMinor`                         | `RedoIcon`                      |
  | `ReferralMajor`                     | `ChatReferralIcon`              |
  | `ReferralMinor`                     | `ChatReferralIcon`              |
  | `ReferralCodeMajor`                 | `ReferralCodeIcon`              |
  | `ReferralCodeMinor`                 | `ReferralCodeIcon`              |
  | `RefreshMajor`                      | `RefreshIcon`                   |
  | `RefreshMinor`                      | `RefreshIcon`                   |
  | `RefundMajor`                       | `ReceiptRefundIcon`             |
  | `RefundMinor`                       | `ReceiptRefundIcon`             |
  | `RemoveProductMajor`                | `ProductRemoveIcon`             |
  | `RemoveProductMinor`                | `ProductRemoveIcon`             |
  | `RepeatOrderMajor`                  | `OrderRepeatIcon`               |
  | `RepeatOrderMinor`                  | `OrderRepeatIcon`               |
  | `ReplaceMajor`                      | `ReplaceIcon`                   |
  | `ReplaceMinor`                      | `ReplaceIcon`                   |
  | `ReplayMajor`                       | `ReplayIcon`                    |
  | `ReplayMinor`                       | `ReplayIcon`                    |
  | `ReportMajor`                       | `SearchResourceIcon`            |
  | `ReportMinor`                       | `SearchResourceIcon`            |
  | `ReportsMajor`                      | `SearchResourceIcon`            |
  | `ReportsMinor`                      | `SearchResourceIcon`            |
  | `ReportFilledMinor`                 | `SearchResourceIcon`            |
  | `ResetMajor`                        | `ResetIcon`                     |
  | `ResetMinor`                        | `ResetIcon`                     |
  | `ResourcesMajor`                    | `EyeglassesIcon`                |
  | `ResourcesMinor`                    | `EyeglassesIcon`                |
  | `ReturnMajor`                       | `ReturnIcon`                    |
  | `ReturnMinor`                       | `ReturnIcon`                    |
  | `ReturnsMajor`                      | `PackageReturnedIcon`           |
  | `ReturnsMinor`                      | `PackageReturnedIcon`           |
  | `RichTextMajor`                     | `TextWithImageIcon`             |
  | `RichTextMinor`                     | `TextWithImageIcon`             |
  | `RiskMajor`                         | `AlertTriangleIcon`             |
  | `RiskMinor`                         | `AlertTriangleIcon`             |
  | `Rows2Major`                        | `LayoutRows2Icon`               |
  | `Rows2Minor`                        | `LayoutRows2Icon`               |
  | `SandboxMajor`                      | `SandboxIcon`                   |
  | `SandboxMinor`                      | `SandboxIcon`                   |
  | `SaveMajor`                         | `SaveIcon`                      |
  | `SaveMinor`                         | `SaveIcon`                      |
  | `SearchMajor`                       | `SearchIcon`                    |
  | `SearchMinor`                       | `SearchIcon`                    |
  | `SectionMajor`                      | `LayoutSectionIcon`             |
  | `SectionMinor`                      | `LayoutSectionIcon`             |
  | `SecureMajor`                       | `ShieldCheckMarkIcon`           |
  | `SecureMinor`                       | `ShieldCheckMarkIcon`           |
  | `SelectMajor`                       | `SelectIcon`                    |
  | `SelectMinor`                       | `SelectIcon`                    |
  | `SendMajor`                         | `SendIcon`                      |
  | `SendMinor`                         | `SendIcon`                      |
  | `SettingsMajor`                     | `SettingsIcon`                  |
  | `SettingsMinor`                     | `SettingsIcon`                  |
  | `SettingsFilledMajor`               | `SettingsFilledIcon`            |
  | `SettingsFilledMinor`               | `SettingsFilledIcon`            |
  | `ShareMajor`                        | `ShareIcon`                     |
  | `ShareMinor`                        | `ShareIcon`                     |
  | `ShareIosMajor`                     | `ShareIcon`                     |
  | `ShareIosMinor`                     | `ShareIcon`                     |
  | `ShipmentMajor`                     | `DeliveryIcon`                  |
  | `ShipmentMinor`                     | `DeliveryIcon`                  |
  | `ShipmentFilledMajor`               | `DeliveryFilledIcon`            |
  | `ShipmentFilledMinor`               | `DeliveryFilledIcon`            |
  | `ShippingLabelsMajor`               | `ShippingLabelIcon`             |
  | `ShippingLabelsMinor`               | `ShippingLabelIcon`             |
  | `ShippingLabelsFilledMajor`         | `ShippingLabelFilledIcon`       |
  | `ShippingLabelsFilledMinor`         | `ShippingLabelFilledIcon`       |
  | `ShopcodesMajor`                    | `ShopcodesIcon`                 |
  | `ShopcodesMinor`                    | `ShopcodesIcon`                 |
  | `SidebarLeftMajor`                  | `LayoutSidebarLeftIcon`         |
  | `SidebarLeftMinor`                  | `LayoutSidebarLeftIcon`         |
  | `SidebarRightMajor`                 | `LayoutSidebarRightIcon`        |
  | `SidebarRightMinor`                 | `LayoutSidebarRightIcon`        |
  | `SidekickMajor`                     | `SidekickIcon`                  |
  | `SidekickMinor`                     | `SidekickIcon`                  |
  | `SimplifyMajor`                     | `ArrowsInHorizontalIcon`        |
  | `SimplifyMinor`                     | `ArrowsInHorizontalIcon`        |
  | `SlideshowMajor`                    | `SlideshowIcon`                 |
  | `SlideshowMinor`                    | `SlideshowIcon`                 |
  | `SmileyHappyMajor`                  | `SmileyHappyIcon`               |
  | `SmileyHappyMinor`                  | `SmileyHappyIcon`               |
  | `SmileyJoyMajor`                    | `SmileyJoyIcon`                 |
  | `SmileyJoyMinor`                    | `SmileyJoyIcon`                 |
  | `SmileyNeutralMajor`                | `SmileyNeutralIcon`             |
  | `SmileyNeutralMinor`                | `SmileyNeutralIcon`             |
  | `SmileySadMajor`                    | `SmileySadIcon`                 |
  | `SmileySadMinor`                    | `SmileySadIcon`                 |
  | `SnapchatMajor`                     | `LogoSnapchatIcon`              |
  | `SnapchatMinor`                     | `LogoSnapchatIcon`              |
  | `SocialAdMajor`                     | `SocialAdIcon`                  |
  | `SocialAdMinor`                     | `SocialAdIcon`                  |
  | `SocialPostMajor`                   | `SocialPostIcon`                |
  | `SocialPostMinor`                   | `SocialPostIcon`                |
  | `SoftPackMajor`                     | `EnvelopeSoftPackIcon`          |
  | `SoftPackMinor`                     | `EnvelopeSoftPackIcon`          |
  | `SortMajor`                         | `SortIcon`                      |
  | `SortMinor`                         | `SortIcon`                      |
  | `SortAscendingMajor`                | `SortAscendingIcon`             |
  | `SortAscendingMinor`                | `SortAscendingIcon`             |
  | `SortDescendingMajor`               | `SortDescendingIcon`            |
  | `SortDescendingMinor`               | `SortDescendingIcon`            |
  | `SoundMajor`                        | `SoundIcon`                     |
  | `SoundMinor`                        | `SoundIcon`                     |
  | `StarFilledMajor`                   | `StarFilledIcon`                |
  | `StarFilledMinor`                   | `StarFilledIcon`                |
  | `StarOutlineMajor`                  | `StarIcon`                      |
  | `StarOutlineMinor`                  | `StarIcon`                      |
  | `StatusActiveMajor`                 | `StatusActiveIcon`              |
  | `StatusActiveMinor`                 | `StatusActiveIcon`              |
  | `StopMajor`                         | `StopCircleIcon`                |
  | `StopMinor`                         | `StopCircleIcon`                |
  | `StoreMajor`                        | `StoreIcon`                     |
  | `StoreMinor`                        | `StoreIcon`                     |
  | `StoreDetailsMajor`                 | `TextInRowsIcon`                |
  | `StoreDetailsMinor`                 | `TextInRowsIcon`                |
  | `StoreDetailsFilledMajor`           | `TextInRowsFilledIcon`          |
  | `StoreDetailsFilledMinor`           | `TextInRowsFilledIcon`          |
  | `StoreFilledMajor`                  | `StoreFilledIcon`               |
  | `StoreFilledMinor`                  | `StoreFilledIcon`               |
  | `StoreStatusMajor`                  | `StatusIcon`                    |
  | `StoreStatusMinor`                  | `StatusIcon`                    |
  | `TabletMajor`                       | `TabletIcon`                    |
  | `TabletMinor`                       | `TabletIcon`                    |
  | `TapChipMajor`                      | `CreditCardTapChipIcon`         |
  | `TapChipMinor`                      | `CreditCardTapChipIcon`         |
  | `TaxMajor`                          | `TaxIcon`                       |
  | `TaxMinor`                          | `TaxIcon`                       |
  | `TaxFilledMajor`                    | `TaxFilledIcon`                 |
  | `TaxFilledMinor`                    | `TaxFilledIcon`                 |
  | `TeamMajor`                         | `TeamIcon`                      |
  | `TeamMinor`                         | `TeamIcon`                      |
  | `TemplateMajor`                     | `ThemeTemplateIcon`             |
  | `TemplateMinor`                     | `ThemeTemplateIcon`             |
  | `TextMajor`                         | `TextIcon`                      |
  | `TextMinor`                         | `TextIcon`                      |
  | `TextAlignmentCenterMajor`          | `TextAlignCenterIcon`           |
  | `TextAlignmentCenterMinor`          | `TextAlignCenterIcon`           |
  | `TextAlignmentLeftMajor`            | `TextAlignLeftIcon`             |
  | `TextAlignmentLeftMinor`            | `TextAlignLeftIcon`             |
  | `TextAlignmentRightMajor`           | `TextAlignRightIcon`            |
  | `TextAlignmentRightMinor`           | `TextAlignRightIcon`            |
  | `TextBlockMajor`                    | `TextBlockIcon`                 |
  | `TextBlockMinor`                    | `TextBlockIcon`                 |
  | `TextColorMajor`                    | `TextColorIcon`                 |
  | `TextColorMinor`                    | `TextColorIcon`                 |
  | `ThemeEditMajor`                    | `ThemeEditIcon`                 |
  | `ThemeEditMinor`                    | `ThemeEditIcon`                 |
  | `ThemesMajor`                       | `ThemeIcon`                     |
  | `ThemesMinor`                       | `ThemeIcon`                     |
  | `ThemeStoreMajor`                   | `ThemeStoreIcon`                |
  | `ThemeStoreMinor`                   | `ThemeStoreIcon`                |
  | `ThumbsDownMajor`                   | `ThumbsDownIcon`                |
  | `ThumbsDownMinor`                   | `ThumbsDownIcon`                |
  | `ThumbsUpMajor`                     | `ThumbsUpIcon`                  |
  | `ThumbsUpMinor`                     | `ThumbsUpIcon`                  |
  | `TickMajor`                         | `CheckIcon`                     |
  | `TickMinor`                         | `CheckIcon`                     |
  | `TickSmallMajor`                    | `CheckSmallIcon`                |
  | `TickSmallMinor`                    | `CheckSmallIcon`                |
  | `TiktokMajor`                       | `LogoTiktokIcon`                |
  | `TiktokMinor`                       | `LogoTiktokIcon`                |
  | `TimeDecayModelMajor`               | `ChartHistogramGrowthIcon`      |
  | `TimeDecayModelMinor`               | `ChartHistogramGrowthIcon`      |
  | `TimelineAttachmentMajor`           | `PageAttachmentIcon`            |
  | `TimelineAttachmentMinor`           | `PageAttachmentIcon`            |
  | `TipsMajor`                         | `TipJarIcon`                    |
  | `TipsMinor`                         | `TipJarIcon`                    |
  | `TitleMajor`                        | `TextTitleIcon`                 |
  | `TitleMinor`                        | `TextTitleIcon`                 |
  | `ToggleMajor`                       | `ToggleOffIcon`                 |
  | `ToggleMinor`                       | `ToggleOffIcon`                 |
  | `ToolsMajor`                        | `WrenchIcon`                    |
  | `ToolsMinor`                        | `WrenchIcon`                    |
  | `TransactionMajor`                  | `TransactionIcon`               |
  | `TransactionMinor`                  | `TransactionIcon`               |
  | `TransactionFeeDollarMajor`         | `TransactionFeeDollarIcon`      |
  | `TransactionFeeDollarMinor`         | `TransactionFeeDollarIcon`      |
  | `TransactionFeeEuroMajor`           | `TransactionFeeEuroIcon`        |
  | `TransactionFeeEuroMinor`           | `TransactionFeeEuroIcon`        |
  | `TransactionFeePoundMajor`          | `TransactionFeePoundIcon`       |
  | `TransactionFeePoundMinor`          | `TransactionFeePoundIcon`       |
  | `TransactionFeeRupeeMajor`          | `TransactionFeeRupeeIcon`       |
  | `TransactionFeeRupeeMinor`          | `TransactionFeeRupeeIcon`       |
  | `TransactionFeeYenMajor`            | `TransactionFeeYenIcon`         |
  | `TransactionFeeYenMinor`            | `TransactionFeeYenIcon`         |
  | `TransferMajor`                     | `TransferIcon`                  |
  | `TransferMinor`                     | `TransferIcon`                  |
  | `TransferInMajor`                   | `TransferInIcon`                |
  | `TransferInMinor`                   | `TransferInIcon`                |
  | `TransferOutMajor`                  | `TransferOutIcon`               |
  | `TransferOutMinor`                  | `TransferOutIcon`               |
  | `TransferFilledMajor`               | `ArrowsOutHorizontalFilledIcon` |
  | `TransfersFilledMinor`              | `ArrowsOutHorizontalFilledIcon` |
  | `TransferWithinShopifyMajor`        | `TransferInternalIcon`          |
  | `TransferWithinShopifyMinor`        | `TransferInternalIcon`          |
  | `TranslateMajor`                    | `LanguageTranslateIcon`         |
  | `TranslateMinor`                    | `LanguageTranslateIcon`         |
  | `TransportMajor`                    | `AirplaneIcon`                  |
  | `TransportMinor`                    | `AirplaneIcon`                  |
  | `TroubleshootMajor`                 | `WrenchIcon`                    |
  | `TroubleshootMinor`                 | `WrenchIcon`                    |
  | `TumblrMajor`                       | `LogoTumblrIcon`                |
  | `TumblrMinor`                       | `LogoTumblrIcon`                |
  | `TwitchMajor`                       | `LogoTwitchIcon`                |
  | `TwitchMinor`                       | `LogoTwitchIcon`                |
  | `TwitterMajor`                      | `LogoXIcon`                     |
  | `TwitterMinor`                      | `LogoXIcon`                     |
  | `TypeMajor`                         | `TextFontIcon`                  |
  | `TypeMinor`                         | `TextFontIcon`                  |
  | `UnderlineMajor`                    | `TextUnderlineIcon`             |
  | `UnderlineMinor`                    | `TextUnderlineIcon`             |
  | `UndoMajor`                         | `UndoIcon`                      |
  | `UndoMinor`                         | `UndoIcon`                      |
  | `UnfulfilledMajor`                  | `OrderUnfulfilledIcon`          |
  | `UnfulfilledMinor`                  | `OrderUnfulfilledIcon`          |
  | `UnknownDeviceMajor`                | `UnknownDeviceIcon`             |
  | `UnknownDeviceMinor`                | `UnknownDeviceIcon`             |
  | `UpdateInventoryMajor`              | `InventoryUpdatedIcon`          |
  | `UpdateInventoryMinor`              | `InventoryUpdatedIcon`          |
  | `UploadMajor`                       | `UploadIcon`                    |
  | `UploadMinor`                       | `UploadIcon`                    |
  | `UsersAndPermissionsMajor`          | `PersonLockIcon`                |
  | `UsersAndPermissionsMinor`          | `PersonLockIcon`                |
  | `UsersAndPermissionsFilledMajor`    | `PersonLockFilledIcon`          |
  | `UsersAndPermissionsFilledMinor`    | `PersonLockFilledIcon`          |
  | `VariantMajor`                      | `VariantIcon`                   |
  | `VariantMinor`                      | `VariantIcon`                   |
  | `ViewMajor`                         | `ViewIcon`                      |
  | `ViewMinor`                         | `ViewIcon`                      |
  | `ViewportNarrowMajor`               | `ViewportNarrowIcon`            |
  | `ViewportNarrowMinor`               | `ViewportNarrowIcon`            |
  | `ViewportShortMajor`                | `ViewportShortIcon`             |
  | `ViewportShortMinor`                | `ViewportShortIcon`             |
  | `ViewportTallMajor`                 | `ViewportTallIcon`              |
  | `ViewportTallMinor`                 | `ViewportTallIcon`              |
  | `ViewportWideMajor`                 | `ViewportWideIcon`              |
  | `ViewportWideMinor`                 | `ViewportWideIcon`              |
  | `VimeoMajor`                        | `LogoVimeoIcon`                 |
  | `VimeoMinor`                        | `LogoVimeoIcon`                 |
  | `VocabularyMajor`                   | `BookOpenIcon`                  |
  | `VocabularyMinor`                   | `BookOpenIcon`                  |
  | `VolumeMajor`                       | `MeasurementVolumeIcon`         |
  | `VolumeMinor`                       | `MeasurementVolumeIcon`         |
  | `WandMajor`                         | `WandIcon`                      |
  | `WandMinor`                         | `WandIcon`                      |
  | `WearableMajor`                     | `WatchIcon`                     |
  | `WearableMinor`                     | `WatchIcon`                     |
  | `WeightMajor`                       | `MeasurementWeightIcon`         |
  | `WeightMinor`                       | `MeasurementWeightIcon`         |
  | `WholesaleMajor`                    | `ForkliftIcon`                  |
  | `WholesaleMinor`                    | `ForkliftIcon`                  |
  | `WifiMajor`                         | `WifiIcon`                      |
  | `WifiMinor`                         | `WifiIcon`                      |
  | `YoutubeMajor`                      | `LogoYoutubeIcon`               |
  | `YoutubeMinor`                      | `LogoYoutubeIcon`               |

## 7.13.0

### Minor Changes

- [#11349](https://github.com/Shopify/polaris/pull/11349) [`0a2f1659d`](https://github.com/Shopify/polaris/commit/0a2f1659d1141dba5cb93f6d64aeceab89155cfb) Thanks [@alex-page](https://github.com/alex-page)! - Add PageClock and PageClockFilled icons

## 7.12.0

### Minor Changes

- [#11316](https://github.com/Shopify/polaris/pull/11316) [`235bc7d0c`](https://github.com/Shopify/polaris/commit/235bc7d0c327c450f94650ffe6f64d68eee2a28e) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added `SkeletonMajor`

## 7.11.0

### Minor Changes

- [#11292](https://github.com/Shopify/polaris/pull/11292) [`2b5ecf8df`](https://github.com/Shopify/polaris/commit/2b5ecf8df3dcc07a3a6a75939e6f3b588f710ea1) Thanks [@alex-page](https://github.com/alex-page)! - Add ClipboardCheckFilledMajor icon

### Patch Changes

- [#11271](https://github.com/Shopify/polaris/pull/11271) [`bd0cede27`](https://github.com/Shopify/polaris/commit/bd0cede27d266ec827220ad9da1016b788811922) Thanks [@alex-page](https://github.com/alex-page)! - - Remove fill as we already remove it as a plugin with rollup
  - Fix svgo config as the convertPathData was not correctly running with the overridden option
  - Add a new test to make sure that optimized svg code matches the code in the .svg file
  - Remove unnecessary tests that are resolved with svgo config
  - Reduce icons library SVG size by 383.75kb

## 7.10.0

### Minor Changes

- [#11073](https://github.com/Shopify/polaris/pull/11073) [`c3cad73cb`](https://github.com/Shopify/polaris/commit/c3cad73cb58217577ebd6c9b94ce184a1d362f0d) Thanks [@lntn2022](https://github.com/lntn2022)! - Add PayoutsBlocked icon

* [#11136](https://github.com/Shopify/polaris/pull/11136) [`0b1961c16`](https://github.com/Shopify/polaris/commit/0b1961c162c6401589acf7d1ac5b9f12ab3b8f97) Thanks [@alex-page](https://github.com/alex-page)! - Update Metaobject and MetaobjectReference icon SVGs

## 7.9.0

### Minor Changes

- [#9856](https://github.com/Shopify/polaris/pull/9856) [`47652f7d6`](https://github.com/Shopify/polaris/commit/47652f7d67f98d7bef8ef8485fae803b9f3c1056) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Updates social media icons, removing them from their containers and adds a one for the Twitch platform.

## 7.8.1

### Patch Changes

- [#9879](https://github.com/Shopify/polaris/pull/9879) [`d1bee0f87`](https://github.com/Shopify/polaris/commit/d1bee0f87879c7dba57e0b3c4585d0addbe835c9) Thanks [@kyledurand](https://github.com/kyledurand)! - Optimized some unoptimized icons

## 7.8.0

### Minor Changes

- [#9858](https://github.com/Shopify/polaris/pull/9858) [`3fc3d5923`](https://github.com/Shopify/polaris/commit/3fc3d5923b5ed23c4a460bb2c40f31eab21e5f89) Thanks [@ardakaracizmeli](https://github.com/ardakaracizmeli)! - Added SidekickMajor

* [#9871](https://github.com/Shopify/polaris/pull/9871) [`bac86a621`](https://github.com/Shopify/polaris/commit/bac86a6212467ed4695c4c979f7b5f5f4c6bf8e2) Thanks [@fortmarek](https://github.com/fortmarek)! - Added displayName to transpiled icons

- [#9854](https://github.com/Shopify/polaris/pull/9854) [`5dabf0fe0`](https://github.com/Shopify/polaris/commit/5dabf0fe050ababf9bd5f78fd4a1fa69098c95b2) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Updated CancelMajor and CancelMinor icons

## 7.7.0

### Minor Changes

- [#9810](https://github.com/Shopify/polaris/pull/9810) [`6bb284d11`](https://github.com/Shopify/polaris/commit/6bb284d11f100b5813c27ded6cc9779eb7fc9a49) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Updated FirstViewMajor icon

## 7.6.0

### Minor Changes

- [#9777](https://github.com/Shopify/polaris/pull/9777) [`8228de0f6`](https://github.com/Shopify/polaris/commit/8228de0f61e49caeab538de36b19616e19daecce) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Added social media icons

## 7.5.0

### Minor Changes

- [#9756](https://github.com/Shopify/polaris/pull/9756) [`c8e5779f0`](https://github.com/Shopify/polaris/commit/c8e5779f097c6509ff84deacf17c41d1b5ecfd41) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Updated bold and italic icon sets

## 7.4.0

### Minor Changes

- [#9727](https://github.com/Shopify/polaris/pull/9727) [`ad287e384`](https://github.com/Shopify/polaris/commit/ad287e3842eb7e1ebf2f63079e3ffbc20271f8bb) Thanks [@kyledurand](https://github.com/kyledurand)! - Updated LanguageFilledMinor, LanguageMinor, and added TranslateMajor

* [#9718](https://github.com/Shopify/polaris/pull/9718) [`ae40558df`](https://github.com/Shopify/polaris/commit/ae40558dfc5ed5faabd7ba5812307a077b00a27f) Thanks [@kyledurand](https://github.com/kyledurand)! - Updated pin minor and pin unfilled minor

### Patch Changes

- [#9730](https://github.com/Shopify/polaris/pull/9730) [`639395406`](https://github.com/Shopify/polaris/commit/6393954066675721b9d9a8c9543b78d97e8af19b) Thanks [@lgriffee](https://github.com/lgriffee)! - Fixed distinction between ascending and descending sorting icons

## 7.3.0

### Minor Changes

- [#9520](https://github.com/Shopify/polaris/pull/9520) [`e566211ef`](https://github.com/Shopify/polaris/commit/e566211ef79c9d178615a85895007bdef45d755e) Thanks [@kyledurand](https://github.com/kyledurand)! - Updated all icon styles

## 7.2.0

### Minor Changes

- [#9581](https://github.com/Shopify/polaris/pull/9581) [`991d9fe69`](https://github.com/Shopify/polaris/commit/991d9fe696faaee22f112d30820943bff9f5ee35) Thanks [@Rusty-UX](https://github.com/Rusty-UX)! - Added BoldMajor, BoldMinor, IndentMajor, IndentMinor, ItalicMajor, ItalicMinor, OrderedListMajor, OrderedListMinor, OutdentMajor, OutdentMinor, TextColorMajor, TextColorMinor, UnderlineMajor, UnderlineMinor icons

* [#9580](https://github.com/Shopify/polaris/pull/9580) [`75f08f32c`](https://github.com/Shopify/polaris/commit/75f08f32c2cf594a73d3d32276bab5bcf87490bf) Thanks [@kyledurand](https://github.com/kyledurand)! - Added optimize script

## 7.1.0

### Minor Changes

- [#9328](https://github.com/Shopify/polaris/pull/9328) [`f907a55a1`](https://github.com/Shopify/polaris/commit/f907a55a1e144fb9d448ad55c5009b535bc598a4) Thanks [@richardmarquezshopify](https://github.com/richardmarquezshopify)! - Added GaugeMajor, GaugeMinor

## 7.0.1

### Patch Changes

- [#9305](https://github.com/Shopify/polaris/pull/9305) [`753ff148f`](https://github.com/Shopify/polaris/commit/753ff148fbc5a74f0b1dd85d817bb2c0522d3001) Thanks [@samrose3](https://github.com/samrose3)! - Fixed npm release conflict with 7.0.0

## 7.0.0

### Major Changes

- [#7597](https://github.com/Shopify/polaris/pull/7597) [`9e1350e22`](https://github.com/Shopify/polaris/commit/9e1350e22f286ead5a735e0c4dc6623f530f9806) Thanks [@lgriffee](https://github.com/lgriffee)! - Removed support for NodeJS version 14 and set version 16 as minimum supported version

## 6.16.0

### Minor Changes

- [#9153](https://github.com/Shopify/polaris/pull/9153) [`4e343a180`](https://github.com/Shopify/polaris/commit/4e343a180c837ef29d8117c10053f82eb17bc29b) Thanks [@dGoligorsky](https://github.com/dGoligorsky)! - Updated thumbs up and down icons, major and minor sets

* [#9109](https://github.com/Shopify/polaris/pull/9109) [`5be210bd5`](https://github.com/Shopify/polaris/commit/5be210bd54e95ad694e898750c3f40259b9216be) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Updated design for MarketingMajor icon

## 6.15.0

### Minor Changes

- [#9104](https://github.com/Shopify/polaris/pull/9104) [`92fbd1308`](https://github.com/Shopify/polaris/commit/92fbd1308b6ea0ec22c3f628775e4fbbd5b0921e) Thanks [@pbojinov](https://github.com/pbojinov)! - Added AnalyticsBarHorizontalMinor, AnalyticsBardStackedMinor, AnalyticsCohortMinor, AnalyticsDonutMinor, AnalyticsFunnelMinor, AnalyticsLineMinor, AnalyticsTableMinor, ListMinor.

  Updated ListMajor

* [#9125](https://github.com/Shopify/polaris/pull/9125) [`c28ed7a9e`](https://github.com/Shopify/polaris/commit/c28ed7a9eaf99c856943d1caefa6742b0390b108) Thanks [@jonrundle](https://github.com/jonrundle)! - New icons added for Magic Chat

## 6.14.0

### Minor Changes

- [#9049](https://github.com/Shopify/polaris/pull/9049) [`13b1a9109`](https://github.com/Shopify/polaris/commit/13b1a9109b996dd19f996b9bdf2a15b96c519c49) Thanks [@vngauv](https://github.com/vngauv)! - Added any click attribution model icon

## 6.13.0

### Minor Changes

- [#8924](https://github.com/Shopify/polaris/pull/8924) [`4880e3ed7`](https://github.com/Shopify/polaris/commit/4880e3ed71cade2f88d6211025e662ecb4a9e8ce) Thanks [@tal87](https://github.com/tal87)! - Added PersonalizedTextMajor icon

* [#8861](https://github.com/Shopify/polaris/pull/8861) [`2bc90503d`](https://github.com/Shopify/polaris/commit/2bc90503d88cac89b021dc0114812c37c2f3258e) Thanks [@AlejandroE](https://github.com/AlejandroE)! - Added ExploreImagesMajor

- [#8919](https://github.com/Shopify/polaris/pull/8919) [`7349d4108`](https://github.com/Shopify/polaris/commit/7349d4108f22d1173aa6f4802df1c430bfc3c5ee) Thanks [@skparkk](https://github.com/skparkk)! - Added new keyboard major + minor icons

## 6.12.0

### Minor Changes

- [#6978](https://github.com/Shopify/polaris/pull/6978) [`0ad5a20f7`](https://github.com/Shopify/polaris/commit/0ad5a20f780ad24527083b4bb37f6a411350425f) Thanks [@chrisblinstrub](https://github.com/chrisblinstrub)! - Updated PinMajor and PinMinor icons. Added PinUnfilledMajor and PinUnfilledMinor icons.

* [#8711](https://github.com/Shopify/polaris/pull/8711) [`ed376f714`](https://github.com/Shopify/polaris/commit/ed376f7144d30526649725764420e5a046de359f) Thanks [@dGoligorsky](https://github.com/dGoligorsky)! - Add major and minor icons and yml for new Extend and Simplify icons

## 6.11.3

### Patch Changes

- [#8505](https://github.com/Shopify/polaris/pull/8505) [`886da4fc3`](https://github.com/Shopify/polaris/commit/886da4fc3db468989dff46c7d0938661fb5a5fcb) Thanks [@lfroms](https://github.com/lfroms)! - Converted percentage fill-opacity to float in two icons for better compatibility

## 6.11.2

### Patch Changes

- [#8320](https://github.com/Shopify/polaris/pull/8320) [`29e9004ff`](https://github.com/Shopify/polaris/commit/29e9004ff8a5e5e2feaaf13b7d37963a1db206fd) Thanks [@leileu](https://github.com/leileu)! - Fixed typo in set type for ContentMinor

## 6.11.1

### Patch Changes

- [#8276](https://github.com/Shopify/polaris/pull/8276) [`9eb9e47b9`](https://github.com/Shopify/polaris/commit/9eb9e47b9154f2df770916a4d94bd0e630ee261a) Thanks [@leileu](https://github.com/leileu)! - Corrected some types with Metaobjects and Metafields

## 6.11.0

### Minor Changes

- [#8159](https://github.com/Shopify/polaris/pull/8159) [`977e70a84`](https://github.com/Shopify/polaris/commit/977e70a847cdc446c28c2b06dc771e5970aa0f4f) Thanks [@kmeleta](https://github.com/kmeleta)! - Added Rows2Major icon

## 6.10.0

### Minor Changes

- [#8150](https://github.com/Shopify/polaris/pull/8150) [`a0c6e467b`](https://github.com/Shopify/polaris/commit/a0c6e467b71be484e708d4c06d4172e3890b5a15) Thanks [@leileu](https://github.com/leileu)! - Adding two metaobject icons: Metaobject and Metaobject Reference.

### Patch Changes

- [#8148](https://github.com/Shopify/polaris/pull/8148) [`0ca0b7899`](https://github.com/Shopify/polaris/commit/0ca0b7899d480ca7bf87e7dfca24bc5721b0775c) Thanks [@zecarlostorre](https://github.com/zecarlostorre)! - Updated clipboard icon

## 6.9.0

### Minor Changes

- [#8139](https://github.com/Shopify/polaris/pull/8139) [`b998ca007`](https://github.com/Shopify/polaris/commit/b998ca00736c5cf1a7772a1ee0acc9f3f4a2748e) Thanks [@leileu](https://github.com/leileu)! - Adding content minor icon for left nav in admin

* [#8094](https://github.com/Shopify/polaris/pull/8094) [`94988bc26`](https://github.com/Shopify/polaris/commit/94988bc260b0c4f371a8c1f22a0a3fd5e11fee45) Thanks [@Tamas-Kisss](https://github.com/Tamas-Kisss)! - Added major and minor icon for Papercheck

- [#8121](https://github.com/Shopify/polaris/pull/8121) [`f74e8ffcc`](https://github.com/Shopify/polaris/commit/f74e8ffcc4d0864212e53e28e7bb02f3b224ba33) Thanks [@zecarlostorre](https://github.com/zecarlostorre)! - Added EnterMajor icon

## 6.8.0

### Minor Changes

- [#8049](https://github.com/Shopify/polaris/pull/8049) [`dca31f2a0`](https://github.com/Shopify/polaris/commit/dca31f2a00737c77a96d26da1535cad83e5af0b0) Thanks [@leileu](https://github.com/leileu)! - Added 8 minor icons for metafields

* [#8069](https://github.com/Shopify/polaris/pull/8069) [`f67e2997e`](https://github.com/Shopify/polaris/commit/f67e2997ef6f5ea026ec076fe480bb7924620f34) Thanks [@leileu](https://github.com/leileu)! - Added file minor icon

- [#8063](https://github.com/Shopify/polaris/pull/8063) [`d5da4778c`](https://github.com/Shopify/polaris/commit/d5da4778c73179b5f1606f3a8b029b9c4a3b818c) Thanks [@eric-blue](https://github.com/eric-blue)! - Added minor icon for diamond_alert

* [#8037](https://github.com/Shopify/polaris/pull/8037) [`1aeed2414`](https://github.com/Shopify/polaris/commit/1aeed2414b8be48e7c3009663fbd407bd40aa3c9) Thanks [@dGoligorsky](https://github.com/dGoligorsky)! - Added major and minor icon for Magic

### Patch Changes

- [#8085](https://github.com/Shopify/polaris/pull/8085) [`56b757036`](https://github.com/Shopify/polaris/commit/56b75703622a8abc987cac8b87dcd7b53c16e508) Thanks [@sarahill](https://github.com/sarahill)! - Added icon name for magic major and minor

* [#8066](https://github.com/Shopify/polaris/pull/8066) [`68acc4593`](https://github.com/Shopify/polaris/commit/68acc45939e64239be2d9d1a854db096e3620556) Thanks [@kyledurand](https://github.com/kyledurand)! - Added better error documentation on icon validation

## 6.7.0

### Minor Changes

- [#7816](https://github.com/Shopify/polaris/pull/7816) [`afe77e584`](https://github.com/Shopify/polaris/commit/afe77e5843f5b960574fe04433affc609d8687b1) Thanks [@allyshiasewdat](https://github.com/allyshiasewdat)! - Add returns major icon

## 6.6.0

### Minor Changes

- [#7456](https://github.com/Shopify/polaris/pull/7456) [`3bc63f7f9`](https://github.com/Shopify/polaris/commit/3bc63f7f94f7d66155c0f071833a858756621b20) Thanks [@SereneChen-7](https://github.com/SereneChen-7)! - Add attribution model icons

* [#7724](https://github.com/Shopify/polaris/pull/7724) [`d748c20ef`](https://github.com/Shopify/polaris/commit/d748c20ef54e7e07e519b4d94ac50ebefca04b99) Thanks [@jaychashop](https://github.com/jaychashop)! - Added passkey major and minor icons

- [#7686](https://github.com/Shopify/polaris/pull/7686) [`6b989379e`](https://github.com/Shopify/polaris/commit/6b989379e82e5bcea973ff1b5c1b1e105ac90608) Thanks [@matyikriszta](https://github.com/matyikriszta)! - Update FormMajor icon

## 6.5.0

### Minor Changes

- [#7548](https://github.com/Shopify/polaris/pull/7548) [`432bdd5fe`](https://github.com/Shopify/polaris/commit/432bdd5fe7f7c3e6c0e570b985b26debbf953433) Thanks [@anthonymenecola](https://github.com/anthonymenecola)! - add cancel major icon

* [#7620](https://github.com/Shopify/polaris/pull/7620) [`35be8a003`](https://github.com/Shopify/polaris/commit/35be8a0035cfb50fc30bea2dbbf2718cd99fdb09) Thanks [@rdott](https://github.com/rdott)! - Added inactive location minor and major icons

## 6.4.0

### Minor Changes

- [#7292](https://github.com/Shopify/polaris/pull/7292) [`a7d9cad7a`](https://github.com/Shopify/polaris/commit/a7d9cad7aa24ea251e42be919cbfcae16676587f) Thanks [@clarkjennings](https://github.com/clarkjennings)! - [#7292](https://github.com/Shopify/polaris/pull/7292) - Add a new icon `OrganizationMajor`

## 6.3.0

### Minor Changes

- [#7184](https://github.com/Shopify/polaris/pull/7184) [`17c4fe2ac`](https://github.com/Shopify/polaris/commit/17c4fe2acc0bcd493d0febec06102173cc759aff) Thanks [@leileu](https://github.com/leileu)! - Added CashDollarMinor, CodeMinor, EyeDropperMinor, MeasurementMinor, and MoneyMinor.

## 6.2.0

### Minor Changes

- [#7128](https://github.com/Shopify/polaris/pull/7128) [`9d6497970`](https://github.com/Shopify/polaris/commit/9d64979708a2e961a537e5b152ad028e6aa52795) Thanks [@james-a-c](https://github.com/james-a-c)! - Add new icon `FilterMinor`

## 6.1.0

### Minor Changes

- [#7105](https://github.com/Shopify/polaris/pull/7105) [`811af5907`](https://github.com/Shopify/polaris/commit/811af590780f4546b4add345205382f87b429569) Thanks [@Rusty-UX](https://github.com/Rusty-UX)! - Add dynamic source icons

## 6.0.0

### Major Changes

- [#7012](https://github.com/Shopify/polaris/pull/7012) [`bd00ef4ed`](https://github.com/Shopify/polaris/commit/bd00ef4ed5307aa07bb7fbd00ff4328179b859e1) Thanks [@leileu](https://github.com/leileu)! - Adding Metafields icon to polaris

### Minor Changes

- [#7013](https://github.com/Shopify/polaris/pull/7013) [`1e0645f33`](https://github.com/Shopify/polaris/commit/1e0645f334e16cff5051f321a822324dd70e16c1) Thanks [@jpmarra](https://github.com/jpmarra)! - Added IdentityCard icon

* [#7028](https://github.com/Shopify/polaris/pull/7028) [`635bcfeb7`](https://github.com/Shopify/polaris/commit/635bcfeb710504847f46f10c68722bbc7e452bde) Thanks [@joelzwarrington](https://github.com/joelzwarrington)! - add vertical viewport icon variations

## 5.4.0

### Minor Changes

- [#6928](https://github.com/Shopify/polaris/pull/6928) [`0e7b06524`](https://github.com/Shopify/polaris/commit/0e7b065240d09d5b349f634a96d21c7be0fb117e) Thanks [@joelzwarrington](https://github.com/joelzwarrington)! - - [#6928](https://github.com/Shopify/polaris/pull/6928) Add fulfillment icons (FulfillmentFulfilledMajor, FulfillmentOnHoldMajor)

### Patch Changes

- [#6942](https://github.com/Shopify/polaris/pull/6942) [`d676abda9`](https://github.com/Shopify/polaris/commit/d676abda906ca13411a469aa211eb1a0ff363f55) Thanks [@samrose3](https://github.com/samrose3)! - Fix casing of the the "Active status" icon in the icon metadata

* [#6881](https://github.com/Shopify/polaris/pull/6881) [`1f8950cdc`](https://github.com/Shopify/polaris/commit/1f8950cdceb391a2ac899cad8648c1e16aa512ee) Thanks [@alex-page](https://github.com/alex-page)! - Replaced glob with globby

## 5.3.0

### Minor Changes

- [#6874](https://github.com/Shopify/polaris/pull/6874) [`f87ce09c0`](https://github.com/Shopify/polaris/commit/f87ce09c0f85046f83426f46f70c9ecac4976eca) Thanks [@alex-page](https://github.com/alex-page)! - Support esm style imports for metadata

* [#6876](https://github.com/Shopify/polaris/pull/6876) [`214678021`](https://github.com/Shopify/polaris/commit/2146780213886bb633fd4cfc6bb1c89d90ccfe10) Thanks [@anthonymenecola](https://github.com/anthonymenecola)! - minor visual updates to icons with product tag visual and addition of the ProductCostMajor icon

### Patch Changes

- [#6866](https://github.com/Shopify/polaris/pull/6866) [`dcc7cbc26`](https://github.com/Shopify/polaris/commit/dcc7cbc2633da4f4a9d5aff71a2031ebcf8c7491) Thanks [@alex-page](https://github.com/alex-page)! - Run yarn format across monorepo, remove custom prettier config from polaris.shopify.com

## 5.2.0

### Minor Changes

- [#6690](https://github.com/Shopify/polaris/pull/6690) [`11816f2c5`](https://github.com/Shopify/polaris/commit/11816f2c526c98ef0f1839ce233baeaf9173c4fb) Thanks [@vladabee](https://github.com/vladabee)! - Making the descriptions and use cases for diamond and circle alert icons clearer.

## 5.1.0

### Minor Changes

- [#6649](https://github.com/Shopify/polaris/pull/6649) [`a6a972f7f`](https://github.com/Shopify/polaris/commit/a6a972f7f186bbc03c60f925755056a9de1b056f) Thanks [@dGoligorsky](https://github.com/dGoligorsky)! - Added PlanMajor and PlanMinor icons, which are for use on the Settings sheet for Plan

* [#6514](https://github.com/Shopify/polaris/pull/6514) [`327a73381`](https://github.com/Shopify/polaris/commit/327a73381ffb9a3f0ac3de4b76632d08070b8720) Thanks [@james-a-c](https://github.com/james-a-c)! - Add new icon `TemplateMinor`

- [#6457](https://github.com/Shopify/polaris/pull/6457) [`b541f5449`](https://github.com/Shopify/polaris/commit/b541f54498462ce513b9903dfcfcb966f43e0038) Thanks [@brandonlawshop](https://github.com/brandonlawshop)! - Added `StatusActiveMajor` icon

### Patch Changes

- [#6617](https://github.com/Shopify/polaris/pull/6617) [`305368d57`](https://github.com/Shopify/polaris/commit/305368d57745ab532063cb7370730f6e87e00632) Thanks [@alex-page](https://github.com/alex-page)! - Update component links so they no longer hit the redirect

* [#6633](https://github.com/Shopify/polaris/pull/6633) [`4c0301bbb`](https://github.com/Shopify/polaris/commit/4c0301bbbb0612afaa5111fc579f52175c8b3ada) Thanks [@sambostock](https://github.com/sambostock)! - Update GitHub repo references in package.json

## 5.0.0

### Major Changes

- [#6550](https://github.com/Shopify/polaris/pull/6550) [`dcbf307b4`](https://github.com/Shopify/polaris/commit/dcbf307b4f9521d38cb6fb008d4daa4de16b7c3a) Thanks [@ErickTamayo](https://github.com/ErickTamayo)! - Replaced SortAscendingMajor and SortDescendingMajor icons. Changed sorting icons in the Data Table

### Minor Changes

- [`54ba0f716`](https://github.com/Shopify/polaris/commit/54ba0f716088ae36e7fae08d2768d2541b9107b6) Thanks [@alex-page](https://github.com/alex-page)! - Added id to the metadata value to reduce need to transform objects

* [#6484](https://github.com/Shopify/polaris/pull/6484) [`9269e5ee6`](https://github.com/Shopify/polaris/commit/9269e5ee62171cf7b8ced1b9edef68da3bcd9dd2) Thanks [@martenbjork](https://github.com/martenbjork)! - Change icon names to start with an uppercase

### Patch Changes

- [#6591](https://github.com/Shopify/polaris/pull/6591) [`9426d0108`](https://github.com/Shopify/polaris/commit/9426d01088930c761a4ab14c5a94008f129e70d0) Thanks [@qw-in](https://github.com/qw-in)! - Update polaris icons website url

## 4.23.0

### Minor Changes

- [#6112](https://github.com/Shopify/polaris/pull/6112) [`75f46e50e`](https://github.com/Shopify/polaris/commit/75f46e50e88e1b93ef0075b5474cc632acdfc81d) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Added toggle, hashtag, behavior, type minor icons and updated design of calendar minor icon

## 4.22.0

### Minor Changes

- [#5896](https://github.com/Shopify/polaris/pull/5896) [`c7c6295a4`](https://github.com/Shopify/polaris/commit/c7c6295a4c6b75a01545dbbfa16aaebe3330f4ce) Thanks [@aveline](https://github.com/aveline)! - Update `MinusMinor` icon

## 4.21.0

- Updated icon `TickSmallMinor` ([#5836](https://github.com/Shopify/polaris-icons/issues/5836))
- Updated icon `PlusMinor` ([5726](https://github.com/Shopify/polaris/pull/5726))

## 4.20.0

- Added metadata for the icons
- New icon `MergeMinor` ([#1476](https://github.com/Shopify/polaris-icons/pull/1477))
- Types are now React 18 compatible ([#5704](https://github.com/Shopify/polaris/pull/5704))

## 4.19.1

- New icon `MergeMinor` ([#1476](https://github.com/Shopify/polaris-icons/pull/1477))

## 4.19.0

- Updated icon `FinancesMinor` ([#1464](https://github.com/Shopify/polaris-icons/issues/1464))

## 4.18.4

- New icon `CreditCardCancelMajor` ([#1457](https://github.com/Shopify/polaris-icons/pull/1457) & [#1460](https://github.com/Shopify/polaris-icons/pull/1460))

## 4.18.3

### Bug fixes

- Updated SVG optimization process for greater cross-platform compatibility. ([#1447](https://github.com/Shopify/polaris-icons/pull/1447))

## 4.18.2

- Updated icon `CancelSmallMinor` ([#1440](https://github.com/Shopify/polaris-icons/pull/1440))

## 4.18.1

- New icon `MarketsMajor` ([#1425](https://github.com/Shopify/polaris-icons/pull/1425))
- Fix path for `ColorsMajor` ([#1424](https://github.com/Shopify/polaris-icons/pull/1424))
- Fix path for `DraftOrdersMajor` ([#1424](https://github.com/Shopify/polaris-icons/pull/1424))
- Fix path for `LanguageMinor` ([#1424](https://github.com/Shopify/polaris-icons/pull/1424))

## 4.18.0

- New icon `DomainRedirectMinor` ([#1407](https://github.com/Shopify/polaris-icons/pull/1407))

## 4.17.0

- New icon `AdjustMinor` ([#1370](https://github.com/Shopify/polaris-icons/pull/1370))

## 4.16.0

- Updated icon `AppsMinor` ([#1347](https://github.com/Shopify/polaris-icons/pull/1347))

## 4.15.0

- New icon `AppsMinor` ([#1338](https://github.com/Shopify/polaris-icons/pull/1338))
- Updated icon `FinancesMinor` ([#1338](https://github.com/Shopify/polaris-icons/pull/1338))

## 4.14.0

- Updated icon `Columns3Minor` ([#1330](https://github.com/Shopify/polaris-icons/pull/1330))

## 4.13.0

- New icon `AnalyticsMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `DiscountsMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `FinancesMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `HomeMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `MarketingMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `OnlineStoreMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `OrdersMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- New icon `ProductsMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))
- Updated icon `CustomersMinor` ([#1332](https://github.com/Shopify/polaris-icons/pull/1332))

## 4.12.0

- New icon `Columns3Minor` ([#1315](https://github.com/Shopify/polaris-icons/pull/1315))

## 4.11.0

- New icon `CircleTickMinor` ([#1243](https://github.com/Shopify/polaris-icons/pull/1243))
- New icon `FinancesMajor` ([#1271](https://github.com/Shopify/polaris-icons/pull/1271))
- New icon `WandMinor` ([#1291](https://github.com/Shopify/polaris-icons/pull/1291))
- Updated icon metadata for various icons, and cleaned up the changelog ([#1241](https://github.com/Shopify/polaris-icons/pull/1241))

## 4.10.0

- Updated icon `SelectMinor` ([#1238](https://github.com/Shopify/polaris-icons/pull/1238))
- Updated icon `CaretDownMinor` ([#1238](https://github.com/Shopify/polaris-icons/pull/1238))
- Updated icon `CaretUpMinor` ([#1238](https://github.com/Shopify/polaris-icons/pull/1238))
- Updated icon `DropDownMinor` ([#1238](https://github.com/Shopify/polaris-icons/pull/1238))

## 4.9.0

- Updated icon `DropdownMinor` ([#1226](https://github.com/Shopify/polaris-icons/pull/1226))

## 4.8.0

- New icon `BlockMinor` ([#1125](https://github.com/Shopify/polaris-icons/pull/1125))
- New icon `ButtonMinor` ([#1125](https://github.com/Shopify/polaris-icons/pull/1125))
- New icon `TitleMinor` ([#1125](https://github.com/Shopify/polaris-icons/pull/1125))

## 4.7.0

- New icon `QuestionMarkInverseMajor` ([#1050](https://github.com/Shopify/polaris-icons/pull/1050))
- New icon `QuestionMarkInverseMinor` ([#1050](https://github.com/Shopify/polaris-icons/pull/1050))

## 4.6.2

- Remove deprecated GOOGLE_APPLICATION_CREDENTIALS usage ([#1005](https://github.com/Shopify/polaris-icons/pull/1005))

## 4.6.1

- Fix breakage in svg imports thanks to incorrect React imports by downgrading `@svgr/core` to v4 ([#1001](https://github.com/Shopify/polaris-icons/pull/1001))

## 4.6.0

- New icon `ExitMajor`

## 4.5.0

- New icon `StoreMinor`

## 4.4.0

- New icon `ButtonCornerSquareMajor`
- New icon `ButtonCornerPillMajor`
- New icon `ButtonCornerRoundedMajor`

## 4.3.0

- New icon `TemplateMajor`

## 4.2.0

- New icon `Column1Major`
- New icon `Columns2Major`
- New icon `Columns3Major`

## 4.1.0

- New icon `DiamondAlertMajor`

## 4.0.0

Polaris Icons v4.0.0 updates icon styles across the board. It replaces monotone, twotone and filled major icon variants with a single style and icons that previously lived in the `@shopify/polaris-icons-internal` package are now part of the public `@shopify/polaris-icons` package.

### Major Changes

In Polaris Icons v3 Major icons came in three styles `Monotone`, `Twotone` and `Filled` as denoted by a suffix on their import name. In v4 we have removed this distinction and thus the suffix on the import name. You should update icon imports to omit these suffixes. For instance `HomeMajorMonotone` and `HomeMajorTwotone` would both become `HomeMajor`.

Update imports from `@shopify/polaris-icons` to remove the `Monotone`, `Twotone` and `Filled` suffixes:

```diff
import {
  DuplicateMinor,
  ViewMinor,
-  HomeMajorMonotone,
-  CircleInformationMajorFilled,
-  CircleInformationMajorTwotone,
+  HomeMajor,
+  CircleInformationMajor,
} from '@shopify/polaris-icons';
```

Update the component code that references the imports.

```diff
- <Icon source={MobileCancelMajorMonotone} />
+ <Icon source={MobileCancelMajor} />
```

For non-React consumers, svg files have moved from `/images` to `/dist/svg`. The svg files have been renamed to match the names used within JS imports. Remove any hyphens and underscores and convert the name to be PascalCase. Remove the Monotone, Twotone and Filled suffixes. For instance `home-major_monotone.svg` becomes `HomeMajor.svg`.

### Renamed deprecated icons

The following deprecated icon names have been removed. The same icons are now available under new names. Replace removed icon names with their updated versions.

- `ColorMajor` has been replaced with `ColorsMajor`
- `FavouriteMajor` has been replaced with `FavoriteMajor`
- `NotesMinor` has been replaced with `NoteMinor`
- `SelectMinor` has been replaced with `ArrowUpDownMinor`
- `SidebarMajor` has been replaced with `SidebarLeftMajor`

### Enhancements

Fraud-related icons were previously part of a separate internal package and are now part of the public package.

1. Remove `@shopify/polaris-icons-internal` from the project’s dependencies in `package.json`
2. Replace imports of `@shopify/polaris-icons-internal` with `@shopify/polaris-icons`:

```diff
import {
-  FraudProtectMajorMonotone
-} from '@shopify/polaris-icons-internal';
+  FraudProtectMajor
+} from '@shopify/polaris-icons';
```

## 3.12.0

- New icon `ComposeMajor`

## 3.11.0

- New icon `ProductReturnsMinor`

## 3.10.0

- New icon `AnalyticsMajorFilled`
- New icon `AppsMajorFilled`
- New icon `CustomersMajorFilled`
- New icon `DiscountsMajorFilled`
- New icon `HomeMajorFilled`
- New icon `MarketingMajorFilled`
- New icon `OnlineStoreMajorFilled`
- New icon `OrdersMajorFilled`
- New icon `ProductsMajorFilled`
- New icon `CircleAlertMajorFilled`
- New icon `CircleDisabledMajorFilled`
- New icon `CircleInformationMajorFilled`
- New icon `CircleTickMajorFilled`

## 3.9.0

### Enhancements

- Updated build output so icons are individually exported instead of inlined into a single file. This helps improve chunking in consuming projects as it no longer forces a single chunk for all icons used an app, which can result in smaller initial bundle downloads.

## 3.8.0

- `FavouriteMajor` was renamed to `FavoriteMajor` to match the American spelling
- New icon `AutomationMajorMonotone`
- New icon `AutomationMajorTwotone`
- New icon `CapitalMajorMonotone` (exports were missing in v3.6.0)
- New icon `CapitalMajorTwotone` (exports were missing in v3.6.0)
- New icon `CustomersMinor`
- New icon `ReferralMajorMonotone`
- New icon `ReferralMajorTwotone`
- New icon `ReferralCodeMajorMonotone`
- New icon `ReferralCodeMajorTwotone`
- Fixed an issue in `FavoriteMajor` where the top branch of the star had a visual artifact

## 3.7.0

- Added iOS asset catalog.
- Added Android drawables.

## 3.6.0

- New icon `CapitalMajorMonotone`
- New icon `CapitalMajorTwotone`

## 3.5.1

- `StarFilledMinor` and `StarOutlineMinor` - Centred the icons in their viewboxes

## 3.5.0

- New icon `TextAlignmentCenterMajorMonotone`
- New icon `TextAlignmentCenterMajorTwotone`
- New icon `TextAlignmentLeftMajorMonotone`
- New icon `TextAlignmentLeftMajorTwotone`
- New icon `TextAlignmentRightMajorMonotone`
- New icon `TextAlignmentRightMajorTwotone`
- Added a test to restrict attributes on `<svg>` to `xmlns` and `viewBox` ([#649](https://github.com/Shopify/polaris-icons/pull/649))

## 3.4.0

- Added plain SVG files in the `/images` folder for consumers that can't consume React components

## 3.3.0

- `ArrowUpDownMinor` has been renamed to `SelectMinor` to match the name used in Sketch. `ArrowUpDownMinor` will continue to exist as an alias until v4.0.0.
- `ColorMajorMonotone` has been renamed to `ColorsMajorMonotone` to match the name used in Sketch. `ColorMajorMonotone` will continue to exist as an alias until v4.0.0.
- `SidebarMajorMonotone` has been renamed to `SidebarLeftMajorMonotone` to match the name used in Sketch. `SidebarMajorMonotone` will continue to exist as an alias until v4.0.0.
- Fixed issue with `ImportStoreMajorMonotone`
- New icon `AbandonedCartMajorMonotone`
- New icon `AbandonedCartMajorTwotone`
- New icon `AccessibilityMajorMonotone`
- New icon `AccessibilityMajorTwotone`
- New icon `ActivitiesMajorMonotone`
- New icon `ActivitiesMajorTwotone`
- New icon `AddCodeMajorMonotone`
- New icon `AddCodeMajorTwotone`
- New icon `AddImageMajorMonotone`
- New icon `AddImageMajorTwotone`
- New icon `AddMajorTwotone`
- New icon `AddNoteMajorMonotone`
- New icon `AddNoteMajorTwotone`
- New icon `AddProductMajorMonotone`
- New icon `AddProductMajorTwotone`
- New icon `AffiliateMajorMonotone`
- New icon `AffiliateMajorTwotone`
- New icon `AnalyticsMajorMonotone`
- New icon `ArchiveMajorMonotone`
- New icon `ArchiveMajorTwotone`
- New icon `AttachmentMajorMonotone`
- New icon `AttachmentMajorTwotone`
- New icon `BackspaceMajorMonotone`
- New icon `BackspaceMajorTwotone`
- New icon `BalanceMajorMonotone`
- New icon `BalanceMajorTwotone`
- New icon `BankMajorMonotone`
- New icon `BankMajorTwotone`
- New icon `BarcodeMajorMonotone`
- New icon `BarcodeMajorTwotone`
- New icon `BehaviorMajorMonotone`
- New icon `BehaviorMajorTwotone`
- New icon `BillingStatementDollarMajorMonotone`
- New icon `BillingStatementDollarMajorTwotone`
- New icon `BillingStatementEuroMajorMonotone`
- New icon `BillingStatementEuroMajorTwotone`
- New icon `BillingStatementPoundMajorMonotone`
- New icon `BillingStatementPoundMajorTwotone`
- New icon `BillingStatementRupeeMajorMonotone`
- New icon `BillingStatementRupeeMajorTwotone`
- New icon `BillingStatementYenMajorMonotone`
- New icon `BillingStatementYenMajorTwotone`
- New icon `BlockquoteMajorTwotone`
- New icon `BlogMajorMonotone`
- New icon `BugMajorMonotone`
- New icon `BugMajorTwotone`
- New icon `BuyButtonButtonLayoutMajorMonotone`
- New icon `BuyButtonButtonLayoutMajorTwotone`
- New icon `BuyButtonHorizontalLayoutMajorMonotone`
- New icon `BuyButtonHorizontalLayoutMajorTwotone`
- New icon `BuyButtonMajorMonotone`
- New icon `BuyButtonMajorTwotone`
- New icon `BuyButtonVerticalLayoutMajorMonotone`
- New icon `BuyButtonVerticalLayoutMajorTwotone`
- New icon `CalendarMajorMonotone`
- New icon `CalendarTickMajorMonotone`
- New icon `CalendarTickMajorTwotone`
- New icon `CameraMajorMonotone`
- New icon `CameraMajorTwotone`
- New icon `CardReaderChipMajorMonotone`
- New icon `CardReaderChipMajorTwotone`
- New icon `CardReaderMajorMonotone`
- New icon `CardReaderMajorTwotone`
- New icon `CardReaderTapMajorMonotone`
- New icon `CardReaderTapMajorTwotone`
- New icon `CartDownMajorMonotone`
- New icon `CartDownMajorTwotone`
- New icon `CartMajorMonotone`
- New icon `CartUpMajorMonotone`
- New icon `CartUpMajorTwotone`
- New icon `CashDollarMajorTwotone`
- New icon `CashEuroMajorMonotone`
- New icon `CashEuroMajorTwotone`
- New icon `CashPoundMajorMonotone`
- New icon `CashPoundMajorTwotone`
- New icon `CashRupeeMajorMonotone`
- New icon `CashRupeeMajorTwotone`
- New icon `CashYenMajorMonotone`
- New icon `CashYenMajorTwotone`
- New icon `CategoriesMajorMonotone`
- New icon `CategoriesMajorTwotone`
- New icon `ChannelsMajorMonotone`
- New icon `ChannelsMajorTwotone`
- New icon `ChatMajorMonotone`
- New icon `ChatMajorTwotone`
- New icon `ChecklistAlternateMajorMonotone`
- New icon `ChecklistAlternateMajorTwotone`
- New icon `ChecklistMajorMonotone`
- New icon `ChecklistMajorTwotone`
- New icon `CheckoutMajorMonotone`
- New icon `CircleCancelMajorMonotone`
- New icon `CircleCancelMajorTwotone`
- New icon `CircleDisabledMajorMonotone`
- New icon `CircleDotsMajorMonotone`
- New icon `CircleDotsMajorTwotone`
- New icon `CircleDownMajorMonotone`
- New icon `CircleDownMajorTwotone`
- New icon `CircleInformationMajorMonotone`
- New icon `CircleLeftMajorMonotone`
- New icon `CircleLeftMajorTwotone`
- New icon `CircleMinusMajorMonotone`
- New icon `CircleMinusMajorTwotone`
- New icon `CirclePlusMajorTwotone`
- New icon `CircleRightMajorMonotone`
- New icon `CircleRightMajorTwotone`
- New icon `CircleUpMajorMonotone`
- New icon `CircleUpMajorTwotone`
- New icon `ClockMajorMonotone`
- New icon `ClockMajorTwotone`
- New icon `CodeMajorTwotone`
- New icon `CollectionsMajorMonotone`
- New icon `ColorsMajorMonotone`
- New icon `ColorsMajorTwotone`
- New icon `ColumnImageWithTextMajorMonotone`
- New icon `ColumnImageWithTextMajorTwotone`
- New icon `ConfettiMajorMonotone`
- New icon `ConfettiMajorTwotone`
- New icon `CreditCardMajorMonotone`
- New icon `CreditCardMajorTwotone`
- New icon `CreditCardPercentMajorMonotone`
- New icon `CreditCardPercentMajorTwotone`
- New icon `CreditCardSecureMajorMonotone`
- New icon `CreditCardSecureMajorTwotone`
- New icon `CustomerMinusMajorMonotone`
- New icon `CustomerMinusMajorTwotone`
- New icon `CustomerPlusMajorMonotone`
- New icon `CustomerPlusMajorTwotone`
- New icon `CustomersMajorMonotone`
- New icon `DataVisualizationMajorMonotone`
- New icon `DataVisualizationMajorTwotone`
- New icon `DeleteMajorMonotone`
- New icon `DeleteMajorTwotone`
- New icon `DesktopMajorMonotone`
- New icon `DigitalMediaReceiverMajorMonotone`
- New icon `DigitalMediaReceiverMajorTwotone`
- New icon `DiscountAutomaticMajorMonotone`
- New icon `DiscountAutomaticMajorTwotone`
- New icon `DiscountCodeMajorMonotone`
- New icon `DiscountCodeMajorTwotone`
- New icon `DiscountsMajorMonotone`
- New icon `DnsSettingsMajorMonotone`
- New icon `DnsSettingsMajorTwotone`
- New icon `DomainAddMajorMonotone`
- New icon `DomainAddMajorTwotone`
- New icon `DomainsMajorTwotone`
- New icon `DraftOrdersMajorMonotone`
- New icon `DraftOrdersMajorTwotone`
- New icon `DragDropMajorTwotone`
- New icon `EditMajorMonotone`
- New icon `EditMajorTwotone`
- New icon `EmailMajorMonotone`
- New icon `EmailNewsletterMajorMonotone`
- New icon `EmailNewsletterMajorTwotone`
- New icon `EnvelopeMajorMonotone`
- New icon `EnvelopeMajorTwotone`
- New icon `ExchangeMajorMonotone`
- New icon `ExchangeMajorTwotone`
- New icon `ExistingInventoryMajorMonotone`
- New icon `ExistingInventoryMajorTwotone`
- New icon `FaviconMajorTwotone`
- New icon `FavouriteMajorMonotone`
- New icon `FavouriteMajorTwotone`
- New icon `FeaturedCollectionMajorTwotone`
- New icon `FeaturedContentMajorTwotone`
- New icon `FilterMajorMonotone`
- New icon `FilterMajorTwotone`
- New icon `FirstOrderMajorMonotone`
- New icon `FirstOrderMajorTwotone`
- New icon `FirstVisitMajorMonotone`
- New icon `FirstVisitMajorTwotone`
- New icon `FlagMajorMonotone`
- New icon `FlipCameraMajorMonotone`
- New icon `FlipCameraMajorTwotone`
- New icon `FolderDownMajorMonotone`
- New icon `FolderDownMajorTwotone`
- New icon `FolderMajorMonotone`
- New icon `FolderMajorTwotone`
- New icon `FolderMinusMajorMonotone`
- New icon `FolderMinusMajorTwotone`
- New icon `FolderPlusMajorMonotone`
- New icon `FolderPlusMajorTwotone`
- New icon `FolderUpMajorMonotone`
- New icon `FolderUpMajorTwotone`
- New icon `FollowUpEmailMajorMonotone`
- New icon `FollowUpEmailMajorTwotone`
- New icon `FoodMajorMonotone`
- New icon `FoodMajorTwotone`
- New icon `FooterMajorTwotone`
- New icon `FormsMajorMonotone`
- New icon `FormsMajorTwotone`
- New icon `GamesConsoleMajorMonotone`
- New icon `GamesConsoleMajorTwotone`
- New icon `GiftCardMajorMonotone`
- New icon `GlobeMajorMonotone`
- New icon `GlobeMajorTwotone`
- New icon `GrammarMajorMonotone`
- New icon `GrammarMajorTwotone`
- New icon `HashtagMajorMonotone`
- New icon `HashtagMajorTwotone`
- New icon `HeartMajorMonotone`
- New icon `HeartMajorTwotone`
- New icon `HideKeyboardMajorMonotone`
- New icon `HideKeyboardMajorTwotone`
- New icon `HintMajorTwotone`
- New icon `IconsMajorMonotone`
- New icon `IconsMajorTwotone`
- New icon `IllustrationMajorMonotone`
- New icon `IllustrationMajorTwotone`
- New icon `ImageAltMajorTwotone`
- New icon `ImageMajorMonotone`
- New icon `ImagesMajorMonotone`
- New icon `ImagesMajorTwotone`
- New icon `ImageWithTextMajorTwotone`
- New icon `ImageWithTextOverlayMajorTwotone`
- New icon `ImportStoreMajorMonotone`
- New icon `ImportStoreMajorTwotone`
- New icon `IncomingMajorMonotone`
- New icon `IncomingMajorTwotone`
- New icon `InventoryMajorMonotone`
- New icon `InventoryMajorTwotone`
- New icon `IqMajorMonotone`
- New icon `IqMajorTwotone`
- New icon `JobsMajorMonotone`
- New icon `JobsMajorTwotone`
- New icon `KeyMajorMonotone`
- New icon `KeyMajorTwotone`
- New icon `LabelPrinterMajorMonotone`
- New icon `LabelPrinterMajorTwotone`
- New icon `LandingPageMajorMonotone`
- New icon `LandingPageMajorTwotone`
- New icon `LegalMajorTwotone`
- New icon `ListMajorMonotone`
- New icon `ListMajorTwotone`
- New icon `LiveViewMajorMonotone`
- New icon `LiveViewMajorTwotone`
- New icon `LocationMajorMonotone`
- New icon `LockMajorMonotone`
- New icon `LockMajorTwotone`
- New icon `LogoBlockMajorTwotone`
- New icon `ManagedStoreMajorMonotone`
- New icon `ManagedStoreMajorTwotone`
- New icon `MarketingMajorTwotone`
- New icon `MaximizeMajorMonotone`
- New icon `MaximizeMajorTwotone`
- New icon `MentionMajorMonotone`
- New icon `MentionMajorTwotone`
- New icon `MicrophoneMajorMonotone`
- New icon `MicrophoneMajorTwotone`
- New icon `MinimizeMajorMonotone`
- New icon `MinimizeMajorTwotone`
- New icon `MobileAcceptMajorMonotone`
- New icon `MobileAcceptMajorTwotone`
- New icon `MobileBackArrowMajorMonotone`
- New icon `MobileBackArrowMajorTwotone`
- New icon `MobileCancelMajorTwotone`
- New icon `MobileChevronMajorMonotone`
- New icon `MobileChevronMajorTwotone`
- New icon `MobileHamburgerMajorTwotone`
- New icon `MobileHorizontalDotsMajorMonotone`
- New icon `MobileHorizontalDotsMajorTwotone`
- New icon `MobileMajorMonotone`
- New icon `MobilePlusMajorMonotone`
- New icon `MobilePlusMajorTwotone`
- New icon `MobileVerticalDotsMajorMonotone`
- New icon `MobileVerticalDotsMajorTwotone`
- New icon `MonerisMajorMonotone`
- New icon `MonerisMajorTwotone`
- New icon `NatureMajorMonotone`
- New icon `NatureMajorTwotone`
- New icon `NavigationMajorMonotone`
- New icon `NoteMajorMonotone`
- New icon `NoteMajorMonotone`
- New icon `NoteMajorTwotone`
- New icon `NoteMajorTwotone`
- New icon `NotificationMajorTwotone`
- New icon `OnlineStoreMajorMonotone`
- New icon `OrdersMajorMonotone`
- New icon `OutgoingMajorMonotone`
- New icon `OutgoingMajorTwotone`
- New icon `PackageMajorMonotone`
- New icon `PageDownMajorMonotone`
- New icon `PageDownMajorTwotone`
- New icon `PageMajorMonotone`
- New icon `PageMinusMajorMonotone`
- New icon `PageMinusMajorTwotone`
- New icon `PagePlusMajorMonotone`
- New icon `PagePlusMajorTwotone`
- New icon `PageUpMajorMonotone`
- New icon `PageUpMajorTwotone`
- New icon `PaintBrushMajorMonotone`
- New icon `PauseCircleMajorMonotone`
- New icon `PauseCircleMajorTwotone`
- New icon `PauseMajorMonotone`
- New icon `PauseMajorTwotone`
- New icon `PaymentsMajorMonotone`
- New icon `PhoneInMajorMonotone`
- New icon `PhoneInMajorTwotone`
- New icon `PhoneMajorMonotone`
- New icon `PhoneMajorTwotone`
- New icon `PhoneOutMajorMonotone`
- New icon `PhoneOutMajorTwotone`
- New icon `PinMajorMonotone`
- New icon `PinMajorTwotone`
- New icon `PlayCircleMajorTwotone`
- New icon `PlayMajorMonotone`
- New icon `PlayMajorTwotone`
- New icon `PointOfSaleMajorMonotone`
- New icon `PointOfSaleMajorTwotone`
- New icon `PopularMajorMonotone`
- New icon `PopularMajorTwotone`
- New icon `PrintMajorMonotone`
- New icon `PrintMajorTwotone`
- New icon `ProductsMajorMonotone`
- New icon `QuestionMarkMajorMonotone`
- New icon `QuickSaleMajorMonotone`
- New icon `QuickSaleMajorTwotone`
- New icon `ReceiptMajorMonotone`
- New icon `ReceiptMajorTwotone`
- New icon `RecentSearchesMajorMonotone`
- New icon `RecentSearchesMajorTwotone`
- New icon `RedoMajorTwotone`
- New icon `RefreshMajorMonotone`
- New icon `RefreshMajorTwotone`
- New icon `RefundMajorMonotone`
- New icon `RefundMajorTwotone`
- New icon `RemoveProductMajorMonotone`
- New icon `RemoveProductMajorTwotone`
- New icon `RepeatOrderMajorMonotone`
- New icon `RepeatOrderMajorTwotone`
- New icon `ReplaceMajorTwotone`
- New icon `ReportsMajorMonotone`
- New icon `ReportsMajorTwotone`
- New icon `ResourcesMajorMonotone`
- New icon `ResourcesMajorTwotone`
- New icon `RiskMajorMonotone`
- New icon `RiskMajorTwotone`
- New icon `SandboxMajorMonotone`
- New icon `SandboxMajorTwotone`
- New icon `SearchMajorMonotone`
- New icon `SearchMajorTwotone`
- New icon `SectionMajorMonotone`
- New icon `SecureMajorMonotone`
- New icon `SecureMajorTwotone`
- New icon `SendMajorMonotone`
- New icon `SendMajorTwotone`
- New icon `SettingsMajorMonotone`
- New icon `ShipmentMajorTwotone`
- New icon `ShopcodesMajorMonotone`
- New icon `ShopcodesMajorTwotone`
- New icon `SidebarLeftMajorMonotone`
- New icon `SidebarLeftMajorTwotone`
- New icon `SidebarRightMajorMonotone`
- New icon `SidebarRightMajorTwotone`
- New icon `SlideshowMajorTwotone`
- New icon `SmileyHappyMajorMonotone`
- New icon `SmileyHappyMajorTwotone`
- New icon `SmileyJoyMajorMonotone`
- New icon `SmileyJoyMajorTwotone`
- New icon `SmileyNeutralMajorMonotone`
- New icon `SmileyNeutralMajorTwotone`
- New icon `SmileySadMajorMonotone`
- New icon `SmileySadMajorTwotone`
- New icon `SocialAdMajorTwotone`
- New icon `SocialPostMajorMonotone`
- New icon `SocialPostMajorTwotone`
- New icon `SoftPackMajorTwotone`
- New icon `SortAscendingMajorMonotone`
- New icon `SortAscendingMajorTwotone`
- New icon `SortDescendingMajorMonotone`
- New icon `SortDescendingMajorTwotone`
- New icon `SoundMajorMonotone`
- New icon `SoundMajorTwotone`
- New icon `StoreMajorMonotone`
- New icon `StoreMajorTwotone`
- New icon `StoreStatusMajorMonotone`
- New icon `StoreStatusMajorTwotone`
- New icon `TabletMajorMonotone`
- New icon `TabletMajorTwotone`
- New icon `TapChipMajorMonotone`
- New icon `TapChipMajorTwotone`
- New icon `TaxMajorMonotone`
- New icon `TaxMajorTwotone`
- New icon `TeamMajorMonotone`
- New icon `TeamMajorTwotone`
- New icon `TextBlockMajorMonotone`
- New icon `TextMajorMonotone`
- New icon `TextMajorTwotone`
- New icon `ThemeEditMajorMonotone`
- New icon `ThemeEditMajorTwotone`
- New icon `ThemesMajorTwotone`
- New icon `ThemeStoreMajorTwotone`
- New icon `ThumbsDownMajorMonotone`
- New icon `ThumbsDownMajorTwotone`
- New icon `ThumbsUpMajorTwotone`
- New icon `TimelineAttachmentMajorMonotone`
- New icon `TimelineAttachmentMajorTwotone`
- New icon `TipsMajorMonotone`
- New icon `TipsMajorTwotone`
- New icon `ToolsMajorMonotone`
- New icon `ToolsMajorTwotone`
- New icon `TransactionFeeDollarMajorMonotone`
- New icon `TransactionFeeDollarMajorTwotone`
- New icon `TransactionFeeEuroMajorMonotone`
- New icon `TransactionFeeEuroMajorTwotone`
- New icon `TransactionFeePoundMajorMonotone`
- New icon `TransactionFeePoundMajorTwotone`
- New icon `TransactionFeeRupeeMajorMonotone`
- New icon `TransactionFeeRupeeMajorTwotone`
- New icon `TransactionFeeYenMajorMonotone`
- New icon `TransactionFeeYenMajorTwotone`
- New icon `TransactionMajorMonotone`
- New icon `TransactionMajorTwotone`
- New icon `TransferInMajorMonotone`
- New icon `TransferInMajorTwotone`
- New icon `TransferMajorMonotone`
- New icon `TransferMajorTwotone`
- New icon `TransferOutMajorMonotone`
- New icon `TransferOutMajorTwotone`
- New icon `TransferWithinShopifyMajorMonotone`
- New icon `TransferWithinShopifyMajorTwotone`
- New icon `TransportMajorMonotone`
- New icon `TransportMajorTwotone`
- New icon `TroubleshootMajorMonotone`
- New icon `TroubleshootMajorTwotone`
- New icon `TypeMajorTwotone`
- New icon `UndoMajorTwotone`
- New icon `UnfulfilledMajorMonotone`
- New icon `UnfulfilledMajorTwotone`
- New icon `UnknownDeviceMajorMonotone`
- New icon `UnknownDeviceMajorTwotone`
- New icon `UpdateInventoryMajorMonotone`
- New icon `UpdateInventoryMajorTwotone`
- New icon `VariantMajorMonotone`
- New icon `VariantMajorTwotone`
- New icon `ViewMajorTwotone`
- New icon `ViewportNarrowMajorMonotone`
- New icon `ViewportNarrowMajorTwotone`
- New icon `ViewportWideMajorTwotone`
- New icon `VocabularyMajorTwotone`
- New icon `WandMajorMonotone`
- New icon `WandMajorTwotone`
- New icon `WearableMajorMonotone`
- New icon `WearableMajorTwotone`
- New icon `WholesaleMajorMonotone`
- New icon `WifiMajorMonotone`
- New icon `WifiMajorTwotone`
- New icon `AppExtensionMinor`
- New icon `ArchiveMinor`
- New icon `CapturePaymentMinor`
- New icon `CircleMinusMinor`
- New icon `CircleMinusOutlineMinor`
- New icon `CircleTickOutlineMinor`
- New icon `ClipboardMinor`
- New icon `ConnectMinor`
- New icon `DragHandleMinor`
- New icon `DropdownMinor`
- New icon `ExternalSmallMinor`
- New icon `GiftCardMinor`
- New icon `GlobeMinor`
- New icon `ImageAltMinor`
- New icon `InfoMinor`
- New icon `InstallMinor`
- New icon `InviteMinor`
- New icon `LanguageMinor`
- New icon `LockMinor`
- New icon `MarkFulfilledMinor`
- New icon `MarkPaidMinor`
- New icon `MaximizeMinor`
- New icon `MinimizeMinor`
- New icon `NotesMinor`
- New icon `OrderStatusMinor`
- New icon `PaginationEndMinor`
- New icon `PaginationStartMinor`
- New icon `PauseMinor`
- New icon `PinMinor`
- New icon `PlayMinor`
- New icon `PriceLookupMinor`
- New icon `PromoteMinor`
- New icon `QuestionMarkMinor`
- New icon `ReadTimeMinor`
- New icon `RefundMinor`
- New icon `ReplayMinor`
- New icon `ReportMinor`
- New icon `ResetMinor`
- New icon `ReturnMinor`
- New icon `SettingsMinor`
- New icon `ShareIosMinor`
- New icon `ShareMinor`
- New icon `SortMinor`
- New icon `ThumbsDownMinor`
- New icon `ThumbsUpMinor`
- New icon `TickMinor`

## 3.2.0

- New icon `CirclePlusMajorMonotone`
- New icon `RedoMajorMonotone`
- New icon `ThemeStoreMajorMonotone`
- New icon `ThemesMajorMonotone`
- New icon `UndoMajorMonotone`

## 3.1.0

- New icon `AnalyticsMajorTwotone`
- New icon `AppsMajorMonotone`
- New icon `AppsMajorTwotone`
- New icon `CalendarMajorTwotone`
- New icon `CartMajorTwotone`
- New icon `CashDollarMajorMonotone`
- New icon `CircleTickMajorMonotone`
- New icon `ClockMinor`
- New icon `CurrencyConvertMinor`
- New icon `CustomersMajorTwotone`
- New icon `DiscountsMajorTwotone`
- New icon `DomainsMajorMonotone`
- New icon `EditMinor`
- New icon `GiftCardMajorTwotone`
- New icon `HeaderMajorTwotone`
- New icon `HintMajorMonotone`
- New icon `HomeMajorTwotone`
- New icon `ImageAltMajorMonotone`
- New icon `LinkMinor`
- New icon `LocationsMinor`
- New icon `MarketingMajorMonotone`
- New icon `NavigationMajorTwotone`
- New icon `PackageMajorTwotone`
- New icon `PaymentsMajorTwotone`
- New icon `ProfileMajorTwotone`
- New icon `ShipmentMajorMonotone`
- New icon `SocialAdMajorMonotone`
- New icon `SoftPackMajorMonotone`
- New icon `VocabularyMajorMonotone`
- New icon `WholesaleMajorTwotone`

## 3.0.0

### Major Changes

- Export icons as React Components built using [SVGR](https://www.smooth-code.com/open-source/svgr/) instead of a bespoke object format.
- Export names are now PascalCase instead of camelCase to denote that they are React Components. For example: `addMinor` is now `AddMinor`
- Major icon exports are now suffixed with their “style” - either “Monotone” to “Twotone”. For example: `ordersMajor` is now `ordersMajorTwotone`.
- Several icons have been renamed so that their export name matches their name in Abstract to ensure we have a common language between designers and developers. See [#203](https://github.com/Shopify/polaris-icons/pull/203), [#215](https://github.com/Shopify/polaris-icons/pull/215), [#195](https://github.com/Shopify/polaris-icons/pull/195), [#182](https://github.com/Shopify/polaris-icons/pull/182), [#183](https://github.com/Shopify/polaris-icons/pull/183) and [#184](https://github.com/Shopify/polaris-icons/pull/184).

### Enhancements

- Added several new icons from the online-store-web project.

## 2.0.0

### Major Changes

- Export icons individually in order to enable tree shaking.
- Icon exports are now suffixed with their type (`Major` or `Minor`). This allows for a future where the same concept has both a major and minor icon. It also avoids inconsistencies to work around cases where icons names clashed with JS reserved keywords (e.g. delete, import and export).
- Removed the `ellipsis` icon as has been deprecated in favor of the `horizontalDots` icon. The icons are visually identical so this is a straight replacement.

## 1.0.0

Initial Release
