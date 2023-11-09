import React from 'react';
import {Icon} from '@shopify/polaris';
import {
  AbandonedCartFilledMajor,
  AbandonedCartMajor,
  AccessibilityMajor,
  ActivitiesMajor,
  AddCodeMajor,
  AddImageMajor,
  AddMajor,
  AddNoteMajor,
  AddProductMajor,
  AdjustMinor,
  AffiliateMajor,
  AlertMinor,
  AnalyticsBarHorizontalMinor,
  AnalyticsBarStackedMinor,
  AnalyticsCohortMinor,
  AnalyticsDonutMinor,
  AnalyticsFilledMinor,
  AnalyticsFunnelMinor,
  AnalyticsLineMinor,
  AnalyticsMajor,
  AnalyticsMinor,
  AnalyticsTableMinor,
  AnyClickModelMinor,
  AppExtensionMinor,
  AppsFilledMajor,
  AppsMajor,
  AppsMinor,
  ArchiveMajor,
  ArchiveMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  AttachmentFilledMajor,
  AttachmentMajor,
  AutomationFilledMajor,
  AutomationMajor,
  BackspaceMajor,
  BalanceFilledMajor,
  BalanceMajor,
  BankFilledMajor,
  BankMajor,
  BarcodeMajor,
  BehaviorFilledMajor,
  BehaviorMajor,
  BehaviorMinor,
  BillingStatementDollarFilledMajor,
  BillingStatementDollarMajor,
  BillingStatementEuroFilledMajor,
  BillingStatementEuroMajor,
  BillingStatementPoundFilledMajor,
  BillingStatementPoundMajor,
  BillingStatementRupeeFilledMajor,
  BillingStatementRupeeMajor,
  BillingStatementYenFilledMajor,
  BillingStatementYenMajor,
  BlockMinor,
  BlockquoteMajor,
  BlogMajor,
  BoldMajor,
  BoldMinor,
  BugMajor,
  ButtonCornerPillMajor,
  ButtonCornerRoundedMajor,
  ButtonCornerSquareMajor,
  ButtonMinor,
  BuyButtonButtonLayoutMajor,
  BuyButtonHorizontalLayoutMajor,
  BuyButtonMajor,
  BuyButtonVerticalLayoutMajor,
  CalendarMajor,
  CalendarMinor,
  CalendarTickMajor,
  CalendarTimeMinor,
  CameraMajor,
  CancelMajor,
  CancelMinor,
  CancelSmallMinor,
  CapitalFilledMajor,
  CapitalMajor,
  CapturePaymentMinor,
  CardReaderChipMajor,
  CardReaderMajor,
  CardReaderTapMajor,
  CaretDownMinor,
  CaretUpMinor,
  CartDownFilledMajor,
  CartDownMajor,
  CartFilledMajor,
  CartMajor,
  CartUpMajor,
  CashDollarFilledMajor,
  CashDollarMajor,
  CashDollarMinor,
  CashEuroMajor,
  CashPoundMajor,
  CashRupeeMajor,
  CashYenMajor,
  CategoriesMajor,
  ChannelsMajor,
  ChatMajor,
  ChecklistAlternateMajor,
  ChecklistMajor,
  CheckoutMajor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleAlertMajor,
  CircleCancelMajor,
  CircleCancelMinor,
  CircleChevronDownMinor,
  CircleChevronLeftMinor,
  CircleChevronRightMinor,
  CircleChevronUpMinor,
  CircleDisableMinor,
  CircleDisabledMajor,
  CircleDotsMajor,
  CircleDownMajor,
  CircleInformationMajor,
  CircleLeftMajor,
  CircleMinusMajor,
  CircleMinusMinor,
  CircleMinusOutlineMinor,
  CirclePlusMajor,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  CircleRightMajor,
  CircleTickMajor,
  CircleTickMinor,
  CircleTickOutlineMinor,
  CircleUpMajor,
  ClipboardMinor,
  ClockMajor,
  ClockMinor,
  CodeMajor,
  CodeMinor,
  CollectionReferenceMinor,
  CollectionsFilledMajor,
  CollectionsMajor,
  ColorNoneMinor,
  ColorsMajor,
  Column1Major,
  ColumnWithTextMajor,
  Columns2Major,
  Columns3Major,
  Columns3Minor,
  ComposeMajor,
  ConfettiMajor,
  ConnectMinor,
  ContentFilledMinor,
  ContentMinor,
  ConversationMinor,
  CreditCardCancelMajor,
  CreditCardMajor,
  CreditCardPercentMajor,
  CreditCardSecureMajor,
  CurrencyConvertMinor,
  CustomerMinusMajor,
  CustomerPlusMajor,
  CustomersFilledMinor,
  CustomersMajor,
  CustomersMinor,
  DataDrivenModelMinor,
  DataVisualizationMajor,
  DecimalMinor,
  DeleteMajor,
  DeleteMinor,
  DesktopMajor,
  DetailedPopUpMajor,
  DiamondAlertMajor,
  DiamondAlertMinor,
  DigitalMediaReceiverMajor,
  DiscountAutomaticMajor,
  DiscountCodeMajor,
  DiscountsFilledMinor,
  DiscountsMajor,
  DiscountsMinor,
  DisputeMinor,
  DnsSettingsMajor,
  DockFloatingMajor,
  DockSideMajor,
  DomainNewMajor,
  DomainRedirectMinor,
  DomainsFilledMajor,
  DomainsMajor,
  DraftOrdersFilledMajor,
  DraftOrdersMajor,
  DragDropMajor,
  DragHandleMinor,
  DropdownMinor,
  DuplicateMinor,
  DynamicSourceMajor,
  DynamicSourceMinor,
  EditMajor,
  EditMinor,
  EmailMajor,
  EmailNewsletterMajor,
  EmbedMinor,
  EnableSelectionMinor,
  EnterMajor,
  EnvelopeMajor,
  ExchangeMajor,
  ExistingInventoryMajor,
  ExitMajor,
  ExploreImagesMajor,
  ExportMinor,
  ExtendMajor,
  ExtendMinor,
  ExternalMinor,
  ExternalSmallMinor,
  EyeDropperMinor,
  FacebookMinor,
  FaviconMajor,
  FavoriteMajor,
  FeaturedCollectionMajor,
  FeaturedContentMajor,
  FileFilledMinor,
  FileMinor,
  FilterMajor,
  FilterMinor,
  FinancesMajor,
  FinancesMinor,
  FirstClickModelMinor,
  FirstOrderMajor,
  FirstVisitMajor,
  FlagMajor,
  FlipCameraMajor,
  FolderDownMajor,
  FolderMajor,
  FolderMinusMajor,
  FolderPlusMajor,
  FolderUpMajor,
  FollowUpEmailMajor,
  FoodMajor,
  FooterMajor,
  FormsMajor,
  FraudProtectMajor,
  FraudProtectMinor,
  FraudProtectPendingMajor,
  FraudProtectPendingMinor,
  FraudProtectUnprotectedMajor,
  FraudProtectUnprotectedMinor,
  FulfillmentFulfilledMajor,
  FulfillmentOnHoldMajor,
  GamesConsoleMajor,
  GaugeMajor,
  GaugeMinor,
  GiftCardFilledMinor,
  GiftCardMajor,
  GiftCardMinor,
  GlobeMajor,
  GlobeMinor,
  GrammarMajor,
  HashtagMajor,
  HashtagMinor,
  HeaderMajor,
  HeartMajor,
  HideKeyboardMajor,
  HideMinor,
  HintMajor,
  HomeFilledMinor,
  HomeMajor,
  HomeMinor,
  HorizontalDotsMinor,
  IconsFilledMajor,
  IconsMajor,
  IdentityCardFilledMajor,
  IdentityCardMajor,
  IllustrationMajor,
  ImageAltMajor,
  ImageAltMinor,
  ImageMajor,
  ImageWithTextMajor,
  ImageWithTextOverlayMajor,
  ImagesMajor,
  ImportMinor,
  ImportStoreMajor,
  InactiveLocationMajor,
  InactiveLocationMinor,
  IncomingMajor,
  IndentMajor,
  IndentMinor,
  InfoMinor,
  InsertDynamicSourceMajor,
  InsertDynamicSourceMinor,
  InstagramMinor,
  InstallMinor,
  InventoryFilledMajor,
  InventoryMajor,
  InviteMinor,
  IqMajor,
  ItalicMajor,
  ItalicMinor,
  JobsFilledMajor,
  JobsMajor,
  KeyMajor,
  KeyboardMajor,
  KeyboardMinor,
  LabelPrinterMajor,
  LandingPageMajor,
  LanguageFilledMinor,
  LanguageMinor,
  LastClickModelMinor,
  LastNonDirectClickModelMinor,
  LegalFilledMajor,
  LegalMajor,
  LinearModelMinor,
  LinkMinor,
  ListFilledMajor,
  ListMajor,
  ListMinor,
  LiveViewFilledMajor,
  LiveViewMajor,
  LocationFilledMajor,
  LocationMajor,
  LocationsMinor,
  LockFilledMajor,
  LockMajor,
  LockMinor,
  LogOutMinor,
  LogoBlockMajor,
  MagicMajor,
  MagicMinor,
  ManagedStoreMajor,
  MarkFulfilledMinor,
  MarkPaidMinor,
  MarketingFilledMinor,
  MarketingMajor,
  MarketingMinor,
  MarketsFilledMajor,
  MarketsMajor,
  MaximizeMajor,
  MaximizeMinor,
  MeasurementMinor,
  MentionMajor,
  MergeMinor,
  MetafieldsFilledMinor,
  MetafieldsMajor,
  MetafieldsMinor,
  MetaobjectMinor,
  MetaobjectReferenceMinor,
  MicrophoneMajor,
  MinimizeMajor,
  MinimizeMinor,
  MinusMajor,
  MinusMinor,
  MobileAcceptMajor,
  MobileBackArrowMajor,
  MobileCancelMajor,
  MobileChevronMajor,
  MobileHamburgerMajor,
  MobileHorizontalDotsMajor,
  MobileMajor,
  MobilePlusMajor,
  MobileVerticalDotsMajor,
  MonerisMajor,
  MoneyFilledMinor,
  MoneyMinor,
  NatureMajor,
  NavigationMajor,
  NoteMajor,
  NoteMinor,
  NotificationFilledMajor,
  NotificationMajor,
  OnlineStoreMajor,
  OnlineStoreMinor,
  OrderStatusMinor,
  OrderedListMajor,
  OrderedListMinor,
  OrdersFilledMinor,
  OrdersMajor,
  OrdersMinor,
  OrganizationMajor,
  OutdentMajor,
  OutdentMinor,
  OutgoingMajor,
  PackageFilledMajor,
  PackageMajor,
  PageDownMajor,
  PageMajor,
  PageMinusMajor,
  PagePlusMajor,
  PageReferenceMinor,
  PageUpMajor,
  PaginationEndMinor,
  PaginationStartMinor,
  PaintBrushMajor,
  PaperCheckMajor,
  PaperCheckMinor,
  PasskeyFilledMinor,
  PasskeyMajor,
  PasskeyMinor,
  PauseCircleMajor,
  PauseMajor,
  PauseMinor,
  PaymentsFilledMajor,
  PaymentsMajor,
  PersonalizedTextMajor,
  PhoneInMajor,
  PhoneMajor,
  PhoneOutMajor,
  PinMajor,
  PinMinor,
  PinUnfilledMajor,
  PinUnfilledMinor,
  PintrestMinor,
  PlanFilledMinor,
  PlanMajor,
  PlanMinor,
  PlayCircleMajor,
  PlayMajor,
  PlayMinor,
  PlusMinor,
  PointOfSaleMajor,
  PopularMajor,
  PositionBasedModelMinor,
  PriceLookupMinor,
  PrintMajor,
  PrintMinor,
  ProductCostMajor,
  ProductReferenceMinor,
  ProductReturnsMinor,
  ProductsFilledMinor,
  ProductsMajor,
  ProductsMinor,
  ProfileMajor,
  ProfileMinor,
  PromoteFilledMinor,
  PromoteMinor,
  QuestionMarkInverseMajor,
  QuestionMarkInverseMinor,
  QuestionMarkMajor,
  QuestionMarkMinor,
  QuickSaleMajor,
  ReadTimeMinor,
  ReceiptMajor,
  RecentSearchesMajor,
  RedoMajor,
  ReferralCodeMajor,
  ReferralMajor,
  RefreshMajor,
  RefreshMinor,
  RefundMajor,
  RefundMinor,
  RemoveProductMajor,
  RepeatOrderMajor,
  ReplaceMajor,
  ReplayMinor,
  ReportFilledMinor,
  ReportMinor,
  ReportsMajor,
  ResetMinor,
  ResourcesMajor,
  ReturnMinor,
  ReturnsMajor,
  RichTextMinor,
  RiskMajor,
  RiskMinor,
  Rows2Major,
  SandboxMajor,
  SaveMinor,
  SearchMajor,
  SearchMinor,
  SectionMajor,
  SecureMajor,
  SelectMinor,
  SendMajor,
  SettingsFilledMinor,
  SettingsMajor,
  SettingsMinor,
  ShareIosMinor,
  ShareMinor,
  ShipmentFilledMajor,
  ShipmentMajor,
  ShopcodesMajor,
  SidebarLeftMajor,
  SidebarRightMajor,
  SidekickMajor,
  SimplifyMajor,
  SimplifyMinor,
  SlideshowMajor,
  SmileyHappyMajor,
  SmileyJoyMajor,
  SmileyNeutralMajor,
  SmileySadMajor,
  SnapchatMinor,
  SocialAdMajor,
  SocialPostMajor,
  SoftPackMajor,
  SortAscendingMajor,
  SortDescendingMajor,
  SortMinor,
  SoundMajor,
  StarFilledMinor,
  StarOutlineMinor,
  StatusActiveMajor,
  StopMajor,
  StoreDetailsFilledMinor,
  StoreDetailsMinor,
  StoreFilledMinor,
  StoreMajor,
  StoreMinor,
  StoreStatusMajor,
  TabletMajor,
  TapChipMajor,
  TaxFilledMajor,
  TaxMajor,
  TeamMajor,
  TemplateMajor,
  TemplateMinor,
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
  TextAlignmentRightMajor,
  TextBlockMajor,
  TextColorMajor,
  TextColorMinor,
  TextMajor,
  ThemeEditMajor,
  ThemeStoreMajor,
  ThemesMajor,
  ThumbsDownMajor,
  ThumbsDownMinor,
  ThumbsUpMajor,
  ThumbsUpMinor,
  TickMinor,
  TickSmallMinor,
  TiktokMinor,
  TimeDecayModelMinor,
  TimelineAttachmentMajor,
  TipsMajor,
  TitleMinor,
  ToggleMinor,
  ToolsMajor,
  TransactionFeeDollarMajor,
  TransactionFeeEuroMajor,
  TransactionFeePoundMajor,
  TransactionFeeRupeeMajor,
  TransactionFeeYenMajor,
  TransactionMajor,
  TransferFilledMajor,
  TransferInMajor,
  TransferMajor,
  TransferOutMajor,
  TransferWithinShopifyMajor,
  TranslateMajor,
  TransportMajor,
  TroubleshootMajor,
  TumblrMinor,
  TwitchMinor,
  TwitterMinor,
  TypeMajor,
  TypeMinor,
  UnderlineMajor,
  UnderlineMinor,
  UndoMajor,
  UnfulfilledMajor,
  UnknownDeviceMajor,
  UpdateInventoryMajor,
  UploadMajor,
  VariantMajor,
  ViewMajor,
  ViewMinor,
  ViewportNarrowMajor,
  ViewportShortMajor,
  ViewportTallMajor,
  ViewportWideMajor,
  VimeoMinor,
  VocabularyMajor,
  VolumeMinor,
  WandMajor,
  WandMinor,
  WearableMajor,
  WeightMinor,
  WholesaleMajor,
  WifiMajor,
  YoutubeMinor,
} from '@shopify/polaris-icons';

export function App() {
  return (
    <>
      <Icon source={AbandonedCartFilledMajor} />
      <Icon source={AbandonedCartMajor} />
      <Icon source={AccessibilityMajor} />
      <Icon source={ActivitiesMajor} />
      <Icon source={AddCodeMajor} />
      <Icon source={AddImageMajor} />
      <Icon source={AddMajor} />
      <Icon source={AddNoteMajor} />
      <Icon source={AddProductMajor} />
      <Icon source={AdjustMinor} />
      <Icon source={AffiliateMajor} />
      <Icon source={AlertMinor} />
      <Icon source={AnalyticsBarHorizontalMinor} />
      <Icon source={AnalyticsBarStackedMinor} />
      <Icon source={AnalyticsCohortMinor} />
      <Icon source={AnalyticsDonutMinor} />
      <Icon source={AnalyticsFilledMinor} />
      <Icon source={AnalyticsFunnelMinor} />
      <Icon source={AnalyticsLineMinor} />
      <Icon source={AnalyticsMajor} />
      <Icon source={AnalyticsMinor} />
      <Icon source={AnalyticsTableMinor} />
      <Icon source={AnyClickModelMinor} />
      <Icon source={AppExtensionMinor} />
      <Icon source={AppsFilledMajor} />
      <Icon source={AppsMajor} />
      <Icon source={AppsMinor} />
      <Icon source={ArchiveMajor} />
      <Icon source={ArchiveMinor} />
      <Icon source={ArrowDownMinor} />
      <Icon source={ArrowLeftMinor} />
      <Icon source={ArrowRightMinor} />
      <Icon source={ArrowUpMinor} />
      <Icon source={AttachmentFilledMajor} />
      <Icon source={AttachmentMajor} />
      <Icon source={AutomationFilledMajor} />
      <Icon source={AutomationMajor} />
      <Icon source={BackspaceMajor} />
      <Icon source={BalanceFilledMajor} />
      <Icon source={BalanceMajor} />
      <Icon source={BankFilledMajor} />
      <Icon source={BankMajor} />
      <Icon source={BarcodeMajor} />
      <Icon source={BehaviorFilledMajor} />
      <Icon source={BehaviorMajor} />
      <Icon source={BehaviorMinor} />
      <Icon source={BillingStatementDollarFilledMajor} />
      <Icon source={BillingStatementDollarMajor} />
      <Icon source={BillingStatementEuroFilledMajor} />
      <Icon source={BillingStatementEuroMajor} />
      <Icon source={BillingStatementPoundFilledMajor} />
      <Icon source={BillingStatementPoundMajor} />
      <Icon source={BillingStatementRupeeFilledMajor} />
      <Icon source={BillingStatementRupeeMajor} />
      <Icon source={BillingStatementYenFilledMajor} />
      <Icon source={BillingStatementYenMajor} />
      <Icon source={BlockMinor} />
      <Icon source={BlockquoteMajor} />
      <Icon source={BlogMajor} />
      <Icon source={BoldMajor} />
      <Icon source={BoldMinor} />
      <Icon source={BugMajor} />
      <Icon source={ButtonCornerPillMajor} />
      <Icon source={ButtonCornerRoundedMajor} />
      <Icon source={ButtonCornerSquareMajor} />
      <Icon source={ButtonMinor} />
      <Icon source={BuyButtonButtonLayoutMajor} />
      <Icon source={BuyButtonHorizontalLayoutMajor} />
      <Icon source={BuyButtonMajor} />
      <Icon source={BuyButtonVerticalLayoutMajor} />
      <Icon source={CalendarMajor} />
      <Icon source={CalendarMinor} />
      <Icon source={CalendarTickMajor} />
      <Icon source={CalendarTimeMinor} />
      <Icon source={CameraMajor} />
      <Icon source={CancelMajor} />
      <Icon source={CancelMinor} />
      <Icon source={CancelSmallMinor} />
      <Icon source={CapitalFilledMajor} />
      <Icon source={CapitalMajor} />
      <Icon source={CapturePaymentMinor} />
      <Icon source={CardReaderChipMajor} />
      <Icon source={CardReaderMajor} />
      <Icon source={CardReaderTapMajor} />
      <Icon source={CaretDownMinor} />
      <Icon source={CaretUpMinor} />
      <Icon source={CartDownFilledMajor} />
      <Icon source={CartDownMajor} />
      <Icon source={CartFilledMajor} />
      <Icon source={CartMajor} />
      <Icon source={CartUpMajor} />
      <Icon source={CashDollarFilledMajor} />
      <Icon source={CashDollarMajor} />
      <Icon source={CashDollarMinor} />
      <Icon source={CashEuroMajor} />
      <Icon source={CashPoundMajor} />
      <Icon source={CashRupeeMajor} />
      <Icon source={CashYenMajor} />
      <Icon source={CategoriesMajor} />
      <Icon source={ChannelsMajor} />
      <Icon source={ChatMajor} />
      <Icon source={ChecklistAlternateMajor} />
      <Icon source={ChecklistMajor} />
      <Icon source={CheckoutMajor} />
      <Icon source={ChevronDownMinor} />
      <Icon source={ChevronLeftMinor} />
      <Icon source={ChevronRightMinor} />
      <Icon source={ChevronUpMinor} />
      <Icon source={CircleAlertMajor} />
      <Icon source={CircleCancelMajor} />
      <Icon source={CircleCancelMinor} />
      <Icon source={CircleChevronDownMinor} />
      <Icon source={CircleChevronLeftMinor} />
      <Icon source={CircleChevronRightMinor} />
      <Icon source={CircleChevronUpMinor} />
      <Icon source={CircleDisableMinor} />
      <Icon source={CircleDisabledMajor} />
      <Icon source={CircleDotsMajor} />
      <Icon source={CircleDownMajor} />
      <Icon source={CircleInformationMajor} />
      <Icon source={CircleLeftMajor} />
      <Icon source={CircleMinusMajor} />
      <Icon source={CircleMinusMinor} />
      <Icon source={CircleMinusOutlineMinor} />
      <Icon source={CirclePlusMajor} />
      <Icon source={CirclePlusMinor} />
      <Icon source={CirclePlusOutlineMinor} />
      <Icon source={CircleRightMajor} />
      <Icon source={CircleTickMajor} />
      <Icon source={CircleTickMinor} />
      <Icon source={CircleTickOutlineMinor} />
      <Icon source={CircleUpMajor} />
      <Icon source={ClipboardMinor} />
      <Icon source={ClockMajor} />
      <Icon source={ClockMinor} />
      <Icon source={CodeMajor} />
      <Icon source={CodeMinor} />
      <Icon source={CollectionReferenceMinor} />
      <Icon source={CollectionsFilledMajor} />
      <Icon source={CollectionsMajor} />
      <Icon source={ColorNoneMinor} />
      <Icon source={ColorsMajor} />
      <Icon source={Column1Major} />
      <Icon source={ColumnWithTextMajor} />
      <Icon source={Columns2Major} />
      <Icon source={Columns3Major} />
      <Icon source={Columns3Minor} />
      <Icon source={ComposeMajor} />
      <Icon source={ConfettiMajor} />
      <Icon source={ConnectMinor} />
      <Icon source={ContentFilledMinor} />
      <Icon source={ContentMinor} />
      <Icon source={ConversationMinor} />
      <Icon source={CreditCardCancelMajor} />
      <Icon source={CreditCardMajor} />
      <Icon source={CreditCardPercentMajor} />
      <Icon source={CreditCardSecureMajor} />
      <Icon source={CurrencyConvertMinor} />
      <Icon source={CustomerMinusMajor} />
      <Icon source={CustomerPlusMajor} />
      <Icon source={CustomersFilledMinor} />
      <Icon source={CustomersMajor} />
      <Icon source={CustomersMinor} />
      <Icon source={DataDrivenModelMinor} />
      <Icon source={DataVisualizationMajor} />
      <Icon source={DecimalMinor} />
      <Icon source={DeleteMajor} />
      <Icon source={DeleteMinor} />
      <Icon source={DesktopMajor} />
      <Icon source={DetailedPopUpMajor} />
      <Icon source={DiamondAlertMajor} />
      <Icon source={DiamondAlertMinor} />
      <Icon source={DigitalMediaReceiverMajor} />
      <Icon source={DiscountAutomaticMajor} />
      <Icon source={DiscountCodeMajor} />
      <Icon source={DiscountsFilledMinor} />
      <Icon source={DiscountsMajor} />
      <Icon source={DiscountsMinor} />
      <Icon source={DisputeMinor} />
      <Icon source={DnsSettingsMajor} />
      <Icon source={DockFloatingMajor} />
      <Icon source={DockSideMajor} />
      <Icon source={DomainNewMajor} />
      <Icon source={DomainRedirectMinor} />
      <Icon source={DomainsFilledMajor} />
      <Icon source={DomainsMajor} />
      <Icon source={DraftOrdersFilledMajor} />
      <Icon source={DraftOrdersMajor} />
      <Icon source={DragDropMajor} />
      <Icon source={DragHandleMinor} />
      <Icon source={DropdownMinor} />
      <Icon source={DuplicateMinor} />
      <Icon source={DynamicSourceMajor} />
      <Icon source={DynamicSourceMinor} />
      <Icon source={EditMajor} />
      <Icon source={EditMinor} />
      <Icon source={EmailMajor} />
      <Icon source={EmailNewsletterMajor} />
      <Icon source={EmbedMinor} />
      <Icon source={EnableSelectionMinor} />
      <Icon source={EnterMajor} />
      <Icon source={EnvelopeMajor} />
      <Icon source={ExchangeMajor} />
      <Icon source={ExistingInventoryMajor} />
      <Icon source={ExitMajor} />
      <Icon source={ExploreImagesMajor} />
      <Icon source={ExportMinor} />
      <Icon source={ExtendMajor} />
      <Icon source={ExtendMinor} />
      <Icon source={ExternalMinor} />
      <Icon source={ExternalSmallMinor} />
      <Icon source={EyeDropperMinor} />
      <Icon source={FacebookMinor} />
      <Icon source={FaviconMajor} />
      <Icon source={FavoriteMajor} />
      <Icon source={FeaturedCollectionMajor} />
      <Icon source={FeaturedContentMajor} />
      <Icon source={FileFilledMinor} />
      <Icon source={FileMinor} />
      <Icon source={FilterMajor} />
      <Icon source={FilterMinor} />
      <Icon source={FinancesMajor} />
      <Icon source={FinancesMinor} />
      <Icon source={FirstClickModelMinor} />
      <Icon source={FirstOrderMajor} />
      <Icon source={FirstVisitMajor} />
      <Icon source={FlagMajor} />
      <Icon source={FlipCameraMajor} />
      <Icon source={FolderDownMajor} />
      <Icon source={FolderMajor} />
      <Icon source={FolderMinusMajor} />
      <Icon source={FolderPlusMajor} />
      <Icon source={FolderUpMajor} />
      <Icon source={FollowUpEmailMajor} />
      <Icon source={FoodMajor} />
      <Icon source={FooterMajor} />
      <Icon source={FormsMajor} />
      <Icon source={FraudProtectMajor} />
      <Icon source={FraudProtectMinor} />
      <Icon source={FraudProtectPendingMajor} />
      <Icon source={FraudProtectPendingMinor} />
      <Icon source={FraudProtectUnprotectedMajor} />
      <Icon source={FraudProtectUnprotectedMinor} />
      <Icon source={FulfillmentFulfilledMajor} />
      <Icon source={FulfillmentOnHoldMajor} />
      <Icon source={GamesConsoleMajor} />
      <Icon source={GaugeMajor} />
      <Icon source={GaugeMinor} />
      <Icon source={GiftCardFilledMinor} />
      <Icon source={GiftCardMajor} />
      <Icon source={GiftCardMinor} />
      <Icon source={GlobeMajor} />
      <Icon source={GlobeMinor} />
      <Icon source={GrammarMajor} />
      <Icon source={HashtagMajor} />
      <Icon source={HashtagMinor} />
      <Icon source={HeaderMajor} />
      <Icon source={HeartMajor} />
      <Icon source={HideKeyboardMajor} />
      <Icon source={HideMinor} />
      <Icon source={HintMajor} />
      <Icon source={HomeFilledMinor} />
      <Icon source={HomeMajor} />
      <Icon source={HomeMinor} />
      <Icon source={HorizontalDotsMinor} />
      <Icon source={IconsFilledMajor} />
      <Icon source={IconsMajor} />
      <Icon source={IdentityCardFilledMajor} />
      <Icon source={IdentityCardMajor} />
      <Icon source={IllustrationMajor} />
      <Icon source={ImageAltMajor} />
      <Icon source={ImageAltMinor} />
      <Icon source={ImageMajor} />
      <Icon source={ImageWithTextMajor} />
      <Icon source={ImageWithTextOverlayMajor} />
      <Icon source={ImagesMajor} />
      <Icon source={ImportMinor} />
      <Icon source={ImportStoreMajor} />
      <Icon source={InactiveLocationMajor} />
      <Icon source={InactiveLocationMinor} />
      <Icon source={IncomingMajor} />
      <Icon source={IndentMajor} />
      <Icon source={IndentMinor} />
      <Icon source={InfoMinor} />
      <Icon source={InsertDynamicSourceMajor} />
      <Icon source={InsertDynamicSourceMinor} />
      <Icon source={InstagramMinor} />
      <Icon source={InstallMinor} />
      <Icon source={InventoryFilledMajor} />
      <Icon source={InventoryMajor} />
      <Icon source={InviteMinor} />
      <Icon source={IqMajor} />
      <Icon source={ItalicMajor} />
      <Icon source={ItalicMinor} />
      <Icon source={JobsFilledMajor} />
      <Icon source={JobsMajor} />
      <Icon source={KeyMajor} />
      <Icon source={KeyboardMajor} />
      <Icon source={KeyboardMinor} />
      <Icon source={LabelPrinterMajor} />
      <Icon source={LandingPageMajor} />
      <Icon source={LanguageFilledMinor} />
      <Icon source={LanguageMinor} />
      <Icon source={LastClickModelMinor} />
      <Icon source={LastNonDirectClickModelMinor} />
      <Icon source={LegalFilledMajor} />
      <Icon source={LegalMajor} />
      <Icon source={LinearModelMinor} />
      <Icon source={LinkMinor} />
      <Icon source={ListFilledMajor} />
      <Icon source={ListMajor} />
      <Icon source={ListMinor} />
      <Icon source={LiveViewFilledMajor} />
      <Icon source={LiveViewMajor} />
      <Icon source={LocationFilledMajor} />
      <Icon source={LocationMajor} />
      <Icon source={LocationsMinor} />
      <Icon source={LockFilledMajor} />
      <Icon source={LockMajor} />
      <Icon source={LockMinor} />
      <Icon source={LogOutMinor} />
      <Icon source={LogoBlockMajor} />
      <Icon source={MagicMajor} />
      <Icon source={MagicMinor} />
      <Icon source={ManagedStoreMajor} />
      <Icon source={MarkFulfilledMinor} />
      <Icon source={MarkPaidMinor} />
      <Icon source={MarketingFilledMinor} />
      <Icon source={MarketingMajor} />
      <Icon source={MarketingMinor} />
      <Icon source={MarketsFilledMajor} />
      <Icon source={MarketsMajor} />
      <Icon source={MaximizeMajor} />
      <Icon source={MaximizeMinor} />
      <Icon source={MeasurementMinor} />
      <Icon source={MentionMajor} />
      <Icon source={MergeMinor} />
      <Icon source={MetafieldsFilledMinor} />
      <Icon source={MetafieldsMajor} />
      <Icon source={MetafieldsMinor} />
      <Icon source={MetaobjectMinor} />
      <Icon source={MetaobjectReferenceMinor} />
      <Icon source={MicrophoneMajor} />
      <Icon source={MinimizeMajor} />
      <Icon source={MinimizeMinor} />
      <Icon source={MinusMajor} />
      <Icon source={MinusMinor} />
      <Icon source={MobileAcceptMajor} />
      <Icon source={MobileBackArrowMajor} />
      <Icon source={MobileCancelMajor} />
      <Icon source={MobileChevronMajor} />
      <Icon source={MobileHamburgerMajor} />
      <Icon source={MobileHorizontalDotsMajor} />
      <Icon source={MobileMajor} />
      <Icon source={MobilePlusMajor} />
      <Icon source={MobileVerticalDotsMajor} />
      <Icon source={MonerisMajor} />
      <Icon source={MoneyFilledMinor} />
      <Icon source={MoneyMinor} />
      <Icon source={NatureMajor} />
      <Icon source={NavigationMajor} />
      <Icon source={NoteMajor} />
      <Icon source={NoteMinor} />
      <Icon source={NotificationFilledMajor} />
      <Icon source={NotificationMajor} />
      <Icon source={OnlineStoreMajor} />
      <Icon source={OnlineStoreMinor} />
      <Icon source={OrderStatusMinor} />
      <Icon source={OrderedListMajor} />
      <Icon source={OrderedListMinor} />
      <Icon source={OrdersFilledMinor} />
      <Icon source={OrdersMajor} />
      <Icon source={OrdersMinor} />
      <Icon source={OrganizationMajor} />
      <Icon source={OutdentMajor} />
      <Icon source={OutdentMinor} />
      <Icon source={OutgoingMajor} />
      <Icon source={PackageFilledMajor} />
      <Icon source={PackageMajor} />
      <Icon source={PageDownMajor} />
      <Icon source={PageMajor} />
      <Icon source={PageMinusMajor} />
      <Icon source={PagePlusMajor} />
      <Icon source={PageReferenceMinor} />
      <Icon source={PageUpMajor} />
      <Icon source={PaginationEndMinor} />
      <Icon source={PaginationStartMinor} />
      <Icon source={PaintBrushMajor} />
      <Icon source={PaperCheckMajor} />
      <Icon source={PaperCheckMinor} />
      <Icon source={PasskeyFilledMinor} />
      <Icon source={PasskeyMajor} />
      <Icon source={PasskeyMinor} />
      <Icon source={PauseCircleMajor} />
      <Icon source={PauseMajor} />
      <Icon source={PauseMinor} />
      <Icon source={PaymentsFilledMajor} />
      <Icon source={PaymentsMajor} />
      <Icon source={PersonalizedTextMajor} />
      <Icon source={PhoneInMajor} />
      <Icon source={PhoneMajor} />
      <Icon source={PhoneOutMajor} />
      <Icon source={PinMajor} />
      <Icon source={PinMinor} />
      <Icon source={PinUnfilledMajor} />
      <Icon source={PinUnfilledMinor} />
      <Icon source={PintrestMinor} />
      <Icon source={PlanFilledMinor} />
      <Icon source={PlanMajor} />
      <Icon source={PlanMinor} />
      <Icon source={PlayCircleMajor} />
      <Icon source={PlayMajor} />
      <Icon source={PlayMinor} />
      <Icon source={PlusMinor} />
      <Icon source={PointOfSaleMajor} />
      <Icon source={PopularMajor} />
      <Icon source={PositionBasedModelMinor} />
      <Icon source={PriceLookupMinor} />
      <Icon source={PrintMajor} />
      <Icon source={PrintMinor} />
      <Icon source={ProductCostMajor} />
      <Icon source={ProductReferenceMinor} />
      <Icon source={ProductReturnsMinor} />
      <Icon source={ProductsFilledMinor} />
      <Icon source={ProductsMajor} />
      <Icon source={ProductsMinor} />
      <Icon source={ProfileMajor} />
      <Icon source={ProfileMinor} />
      <Icon source={PromoteFilledMinor} />
      <Icon source={PromoteMinor} />
      <Icon source={QuestionMarkInverseMajor} />
      <Icon source={QuestionMarkInverseMinor} />
      <Icon source={QuestionMarkMajor} />
      <Icon source={QuestionMarkMinor} />
      <Icon source={QuickSaleMajor} />
      <Icon source={ReadTimeMinor} />
      <Icon source={ReceiptMajor} />
      <Icon source={RecentSearchesMajor} />
      <Icon source={RedoMajor} />
      <Icon source={ReferralCodeMajor} />
      <Icon source={ReferralMajor} />
      <Icon source={RefreshMajor} />
      <Icon source={RefreshMinor} />
      <Icon source={RefundMajor} />
      <Icon source={RefundMinor} />
      <Icon source={RemoveProductMajor} />
      <Icon source={RepeatOrderMajor} />
      <Icon source={ReplaceMajor} />
      <Icon source={ReplayMinor} />
      <Icon source={ReportFilledMinor} />
      <Icon source={ReportMinor} />
      <Icon source={ReportsMajor} />
      <Icon source={ResetMinor} />
      <Icon source={ResourcesMajor} />
      <Icon source={ReturnMinor} />
      <Icon source={ReturnsMajor} />
      <Icon source={RichTextMinor} />
      <Icon source={RiskMajor} />
      <Icon source={RiskMinor} />
      <Icon source={Rows2Major} />
      <Icon source={SandboxMajor} />
      <Icon source={SaveMinor} />
      <Icon source={SearchMajor} />
      <Icon source={SearchMinor} />
      <Icon source={SectionMajor} />
      <Icon source={SecureMajor} />
      <Icon source={SelectMinor} />
      <Icon source={SendMajor} />
      <Icon source={SettingsFilledMinor} />
      <Icon source={SettingsMajor} />
      <Icon source={SettingsMinor} />
      <Icon source={ShareIosMinor} />
      <Icon source={ShareMinor} />
      <Icon source={ShipmentFilledMajor} />
      <Icon source={ShipmentMajor} />
      <Icon source={ShopcodesMajor} />
      <Icon source={SidebarLeftMajor} />
      <Icon source={SidebarRightMajor} />
      <Icon source={SidekickMajor} />
      <Icon source={SimplifyMajor} />
      <Icon source={SimplifyMinor} />
      <Icon source={SlideshowMajor} />
      <Icon source={SmileyHappyMajor} />
      <Icon source={SmileyJoyMajor} />
      <Icon source={SmileyNeutralMajor} />
      <Icon source={SmileySadMajor} />
      <Icon source={SnapchatMinor} />
      <Icon source={SocialAdMajor} />
      <Icon source={SocialPostMajor} />
      <Icon source={SoftPackMajor} />
      <Icon source={SortAscendingMajor} />
      <Icon source={SortDescendingMajor} />
      <Icon source={SortMinor} />
      <Icon source={SoundMajor} />
      <Icon source={StarFilledMinor} />
      <Icon source={StarOutlineMinor} />
      <Icon source={StatusActiveMajor} />
      <Icon source={StopMajor} />
      <Icon source={StoreDetailsFilledMinor} />
      <Icon source={StoreDetailsMinor} />
      <Icon source={StoreFilledMinor} />
      <Icon source={StoreMajor} />
      <Icon source={StoreMinor} />
      <Icon source={StoreStatusMajor} />
      <Icon source={TabletMajor} />
      <Icon source={TapChipMajor} />
      <Icon source={TaxFilledMajor} />
      <Icon source={TaxMajor} />
      <Icon source={TeamMajor} />
      <Icon source={TemplateMajor} />
      <Icon source={TemplateMinor} />
      <Icon source={TextAlignmentCenterMajor} />
      <Icon source={TextAlignmentLeftMajor} />
      <Icon source={TextAlignmentRightMajor} />
      <Icon source={TextBlockMajor} />
      <Icon source={TextColorMajor} />
      <Icon source={TextColorMinor} />
      <Icon source={TextMajor} />
      <Icon source={ThemeEditMajor} />
      <Icon source={ThemeStoreMajor} />
      <Icon source={ThemesMajor} />
      <Icon source={ThumbsDownMajor} />
      <Icon source={ThumbsDownMinor} />
      <Icon source={ThumbsUpMajor} />
      <Icon source={ThumbsUpMinor} />
      <Icon source={TickMinor} />
      <Icon source={TickSmallMinor} />
      <Icon source={TiktokMinor} />
      <Icon source={TimeDecayModelMinor} />
      <Icon source={TimelineAttachmentMajor} />
      <Icon source={TipsMajor} />
      <Icon source={TitleMinor} />
      <Icon source={ToggleMinor} />
      <Icon source={ToolsMajor} />
      <Icon source={TransactionFeeDollarMajor} />
      <Icon source={TransactionFeeEuroMajor} />
      <Icon source={TransactionFeePoundMajor} />
      <Icon source={TransactionFeeRupeeMajor} />
      <Icon source={TransactionFeeYenMajor} />
      <Icon source={TransactionMajor} />
      <Icon source={TransferFilledMajor} />
      <Icon source={TransferInMajor} />
      <Icon source={TransferMajor} />
      <Icon source={TransferOutMajor} />
      <Icon source={TransferWithinShopifyMajor} />
      <Icon source={TranslateMajor} />
      <Icon source={TransportMajor} />
      <Icon source={TroubleshootMajor} />
      <Icon source={TumblrMinor} />
      <Icon source={TwitchMinor} />
      <Icon source={TwitterMinor} />
      <Icon source={TypeMajor} />
      <Icon source={TypeMinor} />
      <Icon source={UnderlineMajor} />
      <Icon source={UnderlineMinor} />
      <Icon source={UndoMajor} />
      <Icon source={UnfulfilledMajor} />
      <Icon source={UnknownDeviceMajor} />
      <Icon source={UpdateInventoryMajor} />
      <Icon source={UploadMajor} />
      <Icon source={VariantMajor} />
      <Icon source={ViewMajor} />
      <Icon source={ViewMinor} />
      <Icon source={ViewportNarrowMajor} />
      <Icon source={ViewportShortMajor} />
      <Icon source={ViewportTallMajor} />
      <Icon source={ViewportWideMajor} />
      <Icon source={VimeoMinor} />
      <Icon source={VocabularyMajor} />
      <Icon source={VolumeMinor} />
      <Icon source={WandMajor} />
      <Icon source={WandMinor} />
      <Icon source={WearableMajor} />
      <Icon source={WeightMinor} />
      <Icon source={WholesaleMajor} />
      <Icon source={WifiMajor} />
      <Icon source={YoutubeMinor} />
    </>
  );
}
