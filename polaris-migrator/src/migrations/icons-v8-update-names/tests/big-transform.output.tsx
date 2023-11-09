import React from 'react';
import {Icon} from '@shopify/polaris';
import {
  CartAbandonedFilledIcon,
  CartAbandonedIcon,
  EyeCheckMarkIcon,
  ActivitiesMajor,
  CodeAddIcon,
  ImageAddIcon,
  PlusIcon,
  NoteAddIcon,
  ProductAddIcon,
  AdjustMinor,
  AffiliateIcon,
  AlertCircleIcon,
  ChartHorizontalIcon,
  ChartStackedIcon,
  ChartCohortIcon,
  ChartDonutIcon,
  ChartVerticalFilledIcon,
  ChartFunnelIcon,
  ChartLineIcon,
  ChartVerticalIcon,
  ChartVerticalIcon,
  DataTableIcon,
  AnyClickModelMinor,
  AppExtensionIcon,
  AppsFilledIcon,
  AppsIcon,
  AppsIcon,
  ArchiveIcon,
  ArchiveIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  AttachmentFilledIcon,
  AttachmentIcon,
  AutomationFilledIcon,
  AutomationIcon,
  BackspaceIcon,
  WalletFilledIcon,
  WalletIcon,
  BankFilledMajor,
  BankIcon,
  BarcodeIcon,
  CursorFilledIcon,
  CursorIcon,
  CursorIcon,
  ReceiptDollarFilledIcon,
  ReceiptDollarIcon,
  ReceiptEuroFilledIcon,
  ReceiptEuroIcon,
  ReceiptPoundFilledIcon,
  ReceiptPoundIcon,
  ReceiptRupeeFilledIcon,
  ReceiptRupeeIcon,
  ReceiptYenFilledIcon,
  ReceiptYenIcon,
  LayoutBlockIcon,
  TextQuoteIcon,
  BlogIcon,
  TextBoldIcon,
  TextBoldIcon,
  BugIcon,
  CornerPillIcon,
  CornerRoundIcon,
  CornerSquareIcon,
  ButtonIcon,
  LayoutBuyButtonIcon,
  LayoutBuyButtonHorizontalIcon,
  ButtonPressIcon,
  LayoutBuyButtonVerticalIcon,
  CalendarIcon,
  CalendarIcon,
  CalendarCheckIcon,
  CalendarTimeIcon,
  CameraIcon,
  XIcon,
  XIcon,
  XSmallIcon,
  FlowerFilledIcon,
  FlowerIcon,
  PaymentCaptureIcon,
  CreditCardReaderChipIcon,
  CreditCardReaderIcon,
  CreditCardReaderTapIcon,
  CaretDownIcon,
  CaretUpIcon,
  CartDownFilledIcon,
  CartDownIcon,
  CartFilledIcon,
  CartIcon,
  CartUpIcon,
  CashDollarFilledIcon,
  CashDollarIcon,
  CashDollarIcon,
  CashEuroIcon,
  CashPoundIcon,
  CashRupeeIcon,
  CashYenIcon,
  CategoriesIcon,
  ChannelsIcon,
  ChatIcon,
  ClipboardChecklistIcon,
  ClipboardCheckIcon,
  CartIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  AlertCircleIcon,
  XCircleIcon,
  XCircleIcon,
  CircleChevronDownIcon,
  CircleChevronLeftIcon,
  CircleChevronRightIcon,
  CircleChevronUpIcon,
  DisabledIcon,
  CircleDisabledMajor,
  MenuHorizontalIcon,
  CircleDownIcon,
  InfoIcon,
  CircleLeftIcon,
  MinusCircleIcon,
  MinusCircleIcon,
  MinusCirlceIcon,
  PlusCircleIcon,
  PlusCircleIcon,
  PlusCircleIcon,
  CircleRightIcon,
  CheckCircleIcon,
  CheckCircleIcon,
  CheckCircleIcon,
  CircleUpIcon,
  ClipboardIcon,
  ClockIcon,
  ClockIcon,
  CodeIcon,
  CodeIcon,
  CollectionReferenceIcon,
  CollectionFilledIcon,
  CollectionIcon,
  ColorNoneIcon,
  ColorIcon,
  LayoutColumn1Icon,
  TextInColumnsIcon,
  LayoutColumns2Icon,
  LayoutColumns3Icon,
  LayoutColumns3Icon,
  ComposeIcon,
  ConfettiIcon,
  ConnectIcon,
  ContentFilledIcon,
  ContentIcon,
  ChatIcon,
  CreditCardCancelIcon,
  CreditCardIcon,
  CreditCardPercentIcon,
  CreditCardSecureIcon,
  CurrencyConvertIcon,
  PersonRemoveIcon,
  PersonAddIcon,
  PersonFilledIcon,
  PersonIcon,
  PersonIcon,
  DataDrivenModelMinor,
  DataPresentationIcon,
  HashtagDecimalIcon,
  DeleteIcon,
  DeleteIcon,
  DesktopIcon,
  DetailedPopUpMajor,
  AlertDiamondIcon,
  AlertDiamondIcon,
  MediaReceiverIcon,
  CartDiscountIcon,
  DiscountCodeIcon,
  DiscountFilledIcon,
  DiscountIcon,
  DiscountIcon,
  AlertBubbleIcon,
  DnsSettingsIcon,
  DockFloatingIcon,
  DockSideIcon,
  DomainNewIcon,
  DomainRedirectIcon,
  DomainFilledIcon,
  DomainIcon,
  OrderDraftFilledIcon,
  OrderDraftIcon,
  DragDropIcon,
  DragHandleIcon,
  CaretDownIcon,
  DuplicateIcon,
  DatabaseIcon,
  DatabaseIcon,
  EditIcon,
  EditIcon,
  EmailIcon,
  EmailNewsletterIcon,
  CodeIcon,
  CheckboxIcon,
  EnterIcon,
  EnvelopeIcon,
  ExchangeIcon,
  InventoryIcon,
  ExitIcon,
  ImageExploreIcon,
  ExportIcon,
  ArrowsOutHorizontalIcon,
  ArrowsOutHorizontalIcon,
  ExternalIcon,
  ExternalSmallIcon,
  EyeDropperIcon,
  SocialFacebookIcon,
  FaviconIcon,
  StarIcon,
  CollectionFeaturedIcon,
  PageHeartIcon,
  FileFilledIcon,
  FileIcon,
  FilterIcon,
  FilterIcon,
  MoneyIcon,
  BankIcon,
  FirstClickModelMinor,
  OrderFirstIcon,
  EyeFirstIcon,
  FlagIcon,
  CameraFlipIcon,
  FolderDownIcon,
  FolderIcon,
  FolderRemoveIcon,
  FolderAddIcon,
  FolderUpIcon,
  EmailFollowUpIcon,
  FoodIcon,
  LayoutFooterIcon,
  FormsIcon,
  ShieldPersonIcon,
  ShieldPersonIcon,
  ShieldPendingIcon,
  ShieldPendingIcon,
  ShieldNoneIcon,
  ShieldNoneIcon,
  PackageFulfilledIcon,
  PackageOnHoldIcon,
  GamesIcon,
  GaugeIcon,
  GaugeIcon,
  GiftCardFilledIcon,
  GiftCardIcon,
  GiftCardIcon,
  GlobeIcon,
  GlobeIcon,
  TextGrammarIcon,
  HashtagIcon,
  HashtagIcon,
  LayoutHeaderIcon,
  HeartIcon,
  KeyboardHideIcon,
  HideIcon,
  LightbulbIcon,
  HomeFilledIcon,
  HomeIcon,
  HomeIcon,
  MenuHorizontalIcon,
  IconsFilledIcon,
  IconsIcon,
  IdentityCardFilledIcon,
  IdentityCardIcon,
  PaintBrushRoundIcon,
  ImageAltIcon,
  ImageAltIcon,
  ImageIcon,
  TextWithImageIcon,
  ImageWithTextOverlayIcon,
  ImagesIcon,
  ImportIcon,
  StoreImportIcon,
  InactiveLocationMajor,
  InactiveLocationMinor,
  IncomingIcon,
  TextIndentIcon,
  TextIndentIcon,
  InfoIcon,
  DatabaseAddIcon,
  DatabaseAddIcon,
  SocialInstagramIcon,
  ImportIcon,
  InventoryFilledIcon,
  InventoryIcon,
  EmailIcon,
  IqIcon,
  TextItalicIcon,
  TextItalicIcon,
  WorkFilledIcon,
  WorkIcon,
  KeyIcon,
  KeyboardIcon,
  KeyboardIcon,
  LabelPrinterIcon,
  DomainLandingPageIcon,
  LanguageFilledIcon,
  LanguageIcon,
  LastClickModelMinor,
  LastNonDirectClickModelMinor,
  ContractFilledIcon,
  ContractIcon,
  LinearModelMinor,
  LinkIcon,
  ListFilledMajor,
  ListBulletedIcon,
  ListBulletedIcon,
  LiveFilledIcon,
  LiveIcon,
  LocationFilledIcon,
  LocationIcon,
  LocationIcon,
  LockFilledIcon,
  LockIcon,
  LockIcon,
  ExitIcon,
  LayoutLogoBlockIcon,
  MagicIcon,
  MagicIcon,
  StoreManagedIcon,
  OrderFullfilledIcon,
  ReceiptPaidIcon,
  TargetFilledIcon,
  TargetIcon,
  TargetIcon,
  MarketsFilledIcon,
  MarketsIcon,
  MaximizeIcon,
  MaximizeIcon,
  MeasurementSizeIcon,
  MentionIcon,
  MergeIcon,
  MetafieldsFilledIcon,
  MetafieldsIcon,
  MetafieldsIcon,
  MetaobjectIcon,
  MetaobjectReferenceIcon,
  MicrophoneIcon,
  MinimizeIcon,
  MinimizeIcon,
  MinusIcon,
  MinusIcon,
  CheckIcon,
  ArrowLeftIcon,
  XIcon,
  ChevronLeftIcon,
  MenuIcon,
  MenuHorizontalIcon,
  MobileIcon,
  PlusIcon,
  MenuVerticalIcon,
  CalculatorIcon,
  MoneyFilledMinor,
  MoneyIcon,
  NatureIcon,
  CompassIcon,
  NoteIcon,
  NoteIcon,
  NotificationFilledIcon,
  NotificationIcon,
  StoreOnlineIcon,
  StoreOnlineIcon,
  OrdersStatusIcon,
  ListNumberedIcon,
  ListNumberedIcon,
  OrderFilledIcon,
  OrderIcon,
  OrderIcon,
  OrganizationIcon,
  OutdentMajor,
  OutdentMinor,
  OutgoingIcon,
  PackageFilledIcon,
  PackageIcon,
  PageDownIcon,
  PageIcon,
  PageRemoveIcon,
  PageAddIcon,
  PageReferenceIcon,
  PageUpIcon,
  PaginationEndIcon,
  PaginationStartIcon,
  PaintBrushFlatIcon,
  PaperCheckIcon,
  PaperCheckIcon,
  PasskeyFilledIcon,
  PasskeyIcon,
  PasskeyIcon,
  PauseCircleIcon,
  PauseCircleIcon,
  PauseCircleIcon,
  PaymentFilledIcon,
  PaymentIcon,
  PersonalizedTextIcon,
  PhoneInIcon,
  PhoneIcon,
  PhoneOutIcon,
  PinFilledIcon,
  PinFilledIcon,
  PinIcon,
  PinIcon,
  SocialPintrestIcon,
  PlanFilledIcon,
  PlanIcon,
  PlanIcon,
  PlayCircleIcon,
  PlayIcon,
  PlayIcon,
  PlusIcon,
  PointOfSaleIcon,
  ChartPopularIcon,
  PositionBasedModelMinor,
  SearchListIcon,
  PrintIcon,
  PrintIcon,
  ProductCostIcon,
  ProductReferenceIcon,
  ProductReturnIcon,
  ProductFilledIcon,
  ProductIcon,
  ProductIcon,
  ProfileIcon,
  ProfileIcon,
  MegaphoneFilledIcon,
  MegaphoneIcon,
  QuestionCircleIcon,
  QuestionCircleIcon,
  QuestionCircleIcon,
  QuestionCircleIcon,
  CartSaleIcon,
  BookIcon,
  ReceiptIcon,
  SearchRecentIcon,
  RedoIcon,
  ReferralCodeIcon,
  ChatReferralIcon,
  RefreshIcon,
  RefreshIcon,
  ReceiptRefundIcon,
  ReceiptRefundIcon,
  ProductRemoveIcon,
  OrderRepeatIcon,
  ReplaceIcon,
  ReplayIcon,
  ReportFilledMinor,
  SearchResourceIcon,
  SearchResourceIcon,
  ResetIcon,
  EyeglassesIcon,
  ReturnIcon,
  PackageReturnedIcon,
  TextWithImageIcon,
  AlertTriangleIcon,
  AlertTriangleIcon,
  LayoutRows2Icon,
  SandboxIcon,
  SaveIcon,
  SearchIcon,
  SearchIcon,
  LayoutSectionIcon,
  ShieldCheckMarkIcon,
  SelectIcon,
  SendIcon,
  SettingsFilledIcon,
  SettingsIcon,
  SettingsIcon,
  ShareIcon,
  ShareIcon,
  DeliveryFilledIcon,
  DeliveryIcon,
  ShopcodesIcon,
  LayoutSidebarLeftIcon,
  LayoutSidebarRightIcon,
  SidekickIcon,
  ArrowsInHorizontalIcon,
  ArrowsInHorizontalIcon,
  SlideshowIcon,
  SmileyHappyIcon,
  SmileyJoyIcon,
  SmileyNeutralIcon,
  SmileySadIcon,
  SocialSnapchatIcon,
  SocialAdIcon,
  SocialPostIcon,
  EnvelopeSoftPackIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  SortIcon,
  SoundIcon,
  StarFilledIcon,
  StarIcon,
  StatusActiveIcon,
  StopCircleIcon,
  TextInRowsFilledIcon,
  TextInRowsIcon,
  StoreFilledIcon,
  StoreIcon,
  StoreIcon,
  StatusIcon,
  TabletIcon,
  CreditCartTapChipIcon,
  TaxFilledIcon,
  TaxIcon,
  TeamIcon,
  ThemeTemplateIcon,
  ThemeTemplateIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBlockIcon,
  TextColorIcon,
  TextColorIcon,
  TextIcon,
  ThemeEditIcon,
  ThemeStoreIcon,
  ThemeIcon,
  ThumbsDownIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  ThumbsUpIcon,
  CheckIcon,
  CheckSmallIcon,
  SocialTiktokIcon,
  TimeDecayModelMinor,
  PageAttachmentIcon,
  TipJarIcon,
  TextTitleIcon,
  ToggleIcon,
  WrenchIcon,
  TransactionFeeDollarIcon,
  TransactionFeeEuroIcon,
  TransactionFeePoundIcon,
  TransactionFeeRupeeIcon,
  TransactionFeeYenIcon,
  TransactionIcon,
  TransferFilledMajor,
  TransferInIcon,
  TransferIcon,
  TransferOutIcon,
  TransferInternalIcon,
  LanguageTranslateIcon,
  AirplaneIcon,
  WrenchIcon,
  SocialTumblrIcon,
  SocialTwitchIcon,
  SocialTwitterIcon,
  TextFontIcon,
  TextFontIcon,
  TextUnderlineIcon,
  TextUnderlineIcon,
  UndoIcon,
  OrderUnfulfilledIcon,
  UnknownDeviceIcon,
  InventoryUpdatedIcon,
  UploadIcon,
  VariantIcon,
  ViewIcon,
  ViewIcon,
  ViewportNarrowIcon,
  ViewportShortMajor,
  ViewportTallIcon,
  ViewportWideIcon,
  SocialVimeoIcon,
  BookOpenIcon,
  MeasurementVolumeIcon,
  WandIcon,
  WandIcon,
  WatchIcon,
  MeasurementWeightIcon,
  ForkliftIcon,
  WifiIcon,
  SocialYoutubeIcon,
} from '@shopify/polaris-icons';

export function App() {
  return (
    <>
      <Icon source={CartAbandonedFilledIcon} />
      <Icon source={CartAbandonedIcon} />
      <Icon source={EyeCheckMarkIcon} />
      <Icon source={ActivitiesMajor} />
      <Icon source={CodeAddIcon} />
      <Icon source={ImageAddIcon} />
      <Icon source={PlusIcon} />
      <Icon source={NoteAddIcon} />
      <Icon source={ProductAddIcon} />
      <Icon source={AdjustMinor} />
      <Icon source={AffiliateIcon} />
      <Icon source={AlertCircleIcon} />
      <Icon source={ChartHorizontalIcon} />
      <Icon source={ChartStackedIcon} />
      <Icon source={ChartCohortIcon} />
      <Icon source={ChartDonutIcon} />
      <Icon source={ChartVerticalFilledIcon} />
      <Icon source={ChartFunnelIcon} />
      <Icon source={ChartLineIcon} />
      <Icon source={ChartVerticalIcon} />
      <Icon source={ChartVerticalIcon} />
      <Icon source={DataTableIcon} />
      <Icon source={AnyClickModelMinor} />
      <Icon source={AppExtensionIcon} />
      <Icon source={AppsFilledIcon} />
      <Icon source={AppsIcon} />
      <Icon source={AppsIcon} />
      <Icon source={ArchiveIcon} />
      <Icon source={ArchiveIcon} />
      <Icon source={ArrowDownIcon} />
      <Icon source={ArrowLeftIcon} />
      <Icon source={ArrowRightIcon} />
      <Icon source={ArrowUpIcon} />
      <Icon source={AttachmentFilledIcon} />
      <Icon source={AttachmentIcon} />
      <Icon source={AutomationFilledIcon} />
      <Icon source={AutomationIcon} />
      <Icon source={BackspaceIcon} />
      <Icon source={WalletFilledIcon} />
      <Icon source={WalletIcon} />
      <Icon source={BankFilledMajor} />
      <Icon source={BankIcon} />
      <Icon source={BarcodeIcon} />
      <Icon source={CursorFilledIcon} />
      <Icon source={CursorIcon} />
      <Icon source={CursorIcon} />
      <Icon source={ReceiptDollarFilledIcon} />
      <Icon source={ReceiptDollarIcon} />
      <Icon source={ReceiptEuroFilledIcon} />
      <Icon source={ReceiptEuroIcon} />
      <Icon source={ReceiptPoundFilledIcon} />
      <Icon source={ReceiptPoundIcon} />
      <Icon source={ReceiptRupeeFilledIcon} />
      <Icon source={ReceiptRupeeIcon} />
      <Icon source={ReceiptYenFilledIcon} />
      <Icon source={ReceiptYenIcon} />
      <Icon source={LayoutBlockIcon} />
      <Icon source={TextQuoteIcon} />
      <Icon source={BlogIcon} />
      <Icon source={TextBoldIcon} />
      <Icon source={TextBoldIcon} />
      <Icon source={BugIcon} />
      <Icon source={CornerPillIcon} />
      <Icon source={CornerRoundIcon} />
      <Icon source={CornerSquareIcon} />
      <Icon source={ButtonIcon} />
      <Icon source={LayoutBuyButtonIcon} />
      <Icon source={LayoutBuyButtonHorizontalIcon} />
      <Icon source={ButtonPressIcon} />
      <Icon source={LayoutBuyButtonVerticalIcon} />
      <Icon source={CalendarIcon} />
      <Icon source={CalendarIcon} />
      <Icon source={CalendarCheckIcon} />
      <Icon source={CalendarTimeIcon} />
      <Icon source={CameraIcon} />
      <Icon source={XIcon} />
      <Icon source={XIcon} />
      <Icon source={XSmallIcon} />
      <Icon source={FlowerFilledIcon} />
      <Icon source={FlowerIcon} />
      <Icon source={PaymentCaptureIcon} />
      <Icon source={CreditCardReaderChipIcon} />
      <Icon source={CreditCardReaderIcon} />
      <Icon source={CreditCardReaderTapIcon} />
      <Icon source={CaretDownIcon} />
      <Icon source={CaretUpIcon} />
      <Icon source={CartDownFilledIcon} />
      <Icon source={CartDownIcon} />
      <Icon source={CartFilledIcon} />
      <Icon source={CartIcon} />
      <Icon source={CartUpIcon} />
      <Icon source={CashDollarFilledIcon} />
      <Icon source={CashDollarIcon} />
      <Icon source={CashDollarIcon} />
      <Icon source={CashEuroIcon} />
      <Icon source={CashPoundIcon} />
      <Icon source={CashRupeeIcon} />
      <Icon source={CashYenIcon} />
      <Icon source={CategoriesIcon} />
      <Icon source={ChannelsIcon} />
      <Icon source={ChatIcon} />
      <Icon source={ClipboardChecklistIcon} />
      <Icon source={ClipboardCheckIcon} />
      <Icon source={CartIcon} />
      <Icon source={ChevronDownIcon} />
      <Icon source={ChevronLeftIcon} />
      <Icon source={ChevronRightIcon} />
      <Icon source={ChevronUpIcon} />
      <Icon source={AlertCircleIcon} />
      <Icon source={XCircleIcon} />
      <Icon source={XCircleIcon} />
      <Icon source={CircleChevronDownIcon} />
      <Icon source={CircleChevronLeftIcon} />
      <Icon source={CircleChevronRightIcon} />
      <Icon source={CircleChevronUpIcon} />
      <Icon source={DisabledIcon} />
      <Icon source={CircleDisabledMajor} />
      <Icon source={MenuHorizontalIcon} />
      <Icon source={CircleDownIcon} />
      <Icon source={InfoIcon} />
      <Icon source={CircleLeftIcon} />
      <Icon source={MinusCircleIcon} />
      <Icon source={MinusCircleIcon} />
      <Icon source={MinusCirlceIcon} />
      <Icon source={PlusCircleIcon} />
      <Icon source={PlusCircleIcon} />
      <Icon source={PlusCircleIcon} />
      <Icon source={CircleRightIcon} />
      <Icon source={CheckCircleIcon} />
      <Icon source={CheckCircleIcon} />
      <Icon source={CheckCircleIcon} />
      <Icon source={CircleUpIcon} />
      <Icon source={ClipboardIcon} />
      <Icon source={ClockIcon} />
      <Icon source={ClockIcon} />
      <Icon source={CodeIcon} />
      <Icon source={CodeIcon} />
      <Icon source={CollectionReferenceIcon} />
      <Icon source={CollectionFilledIcon} />
      <Icon source={CollectionIcon} />
      <Icon source={ColorNoneIcon} />
      <Icon source={ColorIcon} />
      <Icon source={LayoutColumn1Icon} />
      <Icon source={TextInColumnsIcon} />
      <Icon source={LayoutColumns2Icon} />
      <Icon source={LayoutColumns3Icon} />
      <Icon source={LayoutColumns3Icon} />
      <Icon source={ComposeIcon} />
      <Icon source={ConfettiIcon} />
      <Icon source={ConnectIcon} />
      <Icon source={ContentFilledIcon} />
      <Icon source={ContentIcon} />
      <Icon source={ChatIcon} />
      <Icon source={CreditCardCancelIcon} />
      <Icon source={CreditCardIcon} />
      <Icon source={CreditCardPercentIcon} />
      <Icon source={CreditCardSecureIcon} />
      <Icon source={CurrencyConvertIcon} />
      <Icon source={PersonRemoveIcon} />
      <Icon source={PersonAddIcon} />
      <Icon source={PersonFilledIcon} />
      <Icon source={PersonIcon} />
      <Icon source={PersonIcon} />
      <Icon source={DataDrivenModelMinor} />
      <Icon source={DataPresentationIcon} />
      <Icon source={HashtagDecimalIcon} />
      <Icon source={DeleteIcon} />
      <Icon source={DeleteIcon} />
      <Icon source={DesktopIcon} />
      <Icon source={DetailedPopUpMajor} />
      <Icon source={AlertDiamondIcon} />
      <Icon source={AlertDiamondIcon} />
      <Icon source={MediaReceiverIcon} />
      <Icon source={CartDiscountIcon} />
      <Icon source={DiscountCodeIcon} />
      <Icon source={DiscountFilledIcon} />
      <Icon source={DiscountIcon} />
      <Icon source={DiscountIcon} />
      <Icon source={AlertBubbleIcon} />
      <Icon source={DnsSettingsIcon} />
      <Icon source={DockFloatingIcon} />
      <Icon source={DockSideIcon} />
      <Icon source={DomainNewIcon} />
      <Icon source={DomainRedirectIcon} />
      <Icon source={DomainFilledIcon} />
      <Icon source={DomainIcon} />
      <Icon source={OrderDraftFilledIcon} />
      <Icon source={OrderDraftIcon} />
      <Icon source={DragDropIcon} />
      <Icon source={DragHandleIcon} />
      <Icon source={CaretDownIcon} />
      <Icon source={DuplicateIcon} />
      <Icon source={DatabaseIcon} />
      <Icon source={DatabaseIcon} />
      <Icon source={EditIcon} />
      <Icon source={EditIcon} />
      <Icon source={EmailIcon} />
      <Icon source={EmailNewsletterIcon} />
      <Icon source={CodeIcon} />
      <Icon source={CheckboxIcon} />
      <Icon source={EnterIcon} />
      <Icon source={EnvelopeIcon} />
      <Icon source={ExchangeIcon} />
      <Icon source={InventoryIcon} />
      <Icon source={ExitIcon} />
      <Icon source={ImageExploreIcon} />
      <Icon source={ExportIcon} />
      <Icon source={ArrowsOutHorizontalIcon} />
      <Icon source={ArrowsOutHorizontalIcon} />
      <Icon source={ExternalIcon} />
      <Icon source={ExternalSmallIcon} />
      <Icon source={EyeDropperIcon} />
      <Icon source={SocialFacebookIcon} />
      <Icon source={FaviconIcon} />
      <Icon source={StarIcon} />
      <Icon source={CollectionFeaturedIcon} />
      <Icon source={PageHeartIcon} />
      <Icon source={FileFilledIcon} />
      <Icon source={FileIcon} />
      <Icon source={FilterIcon} />
      <Icon source={FilterIcon} />
      <Icon source={MoneyIcon} />
      <Icon source={BankIcon} />
      <Icon source={FirstClickModelMinor} />
      <Icon source={OrderFirstIcon} />
      <Icon source={EyeFirstIcon} />
      <Icon source={FlagIcon} />
      <Icon source={CameraFlipIcon} />
      <Icon source={FolderDownIcon} />
      <Icon source={FolderIcon} />
      <Icon source={FolderRemoveIcon} />
      <Icon source={FolderAddIcon} />
      <Icon source={FolderUpIcon} />
      <Icon source={EmailFollowUpIcon} />
      <Icon source={FoodIcon} />
      <Icon source={LayoutFooterIcon} />
      <Icon source={FormsIcon} />
      <Icon source={ShieldPersonIcon} />
      <Icon source={ShieldPersonIcon} />
      <Icon source={ShieldPendingIcon} />
      <Icon source={ShieldPendingIcon} />
      <Icon source={ShieldNoneIcon} />
      <Icon source={ShieldNoneIcon} />
      <Icon source={PackageFulfilledIcon} />
      <Icon source={PackageOnHoldIcon} />
      <Icon source={GamesIcon} />
      <Icon source={GaugeIcon} />
      <Icon source={GaugeIcon} />
      <Icon source={GiftCardFilledIcon} />
      <Icon source={GiftCardIcon} />
      <Icon source={GiftCardIcon} />
      <Icon source={GlobeIcon} />
      <Icon source={GlobeIcon} />
      <Icon source={TextGrammarIcon} />
      <Icon source={HashtagIcon} />
      <Icon source={HashtagIcon} />
      <Icon source={LayoutHeaderIcon} />
      <Icon source={HeartIcon} />
      <Icon source={KeyboardHideIcon} />
      <Icon source={HideIcon} />
      <Icon source={LightbulbIcon} />
      <Icon source={HomeFilledIcon} />
      <Icon source={HomeIcon} />
      <Icon source={HomeIcon} />
      <Icon source={MenuHorizontalIcon} />
      <Icon source={IconsFilledIcon} />
      <Icon source={IconsIcon} />
      <Icon source={IdentityCardFilledIcon} />
      <Icon source={IdentityCardIcon} />
      <Icon source={PaintBrushRoundIcon} />
      <Icon source={ImageAltIcon} />
      <Icon source={ImageAltIcon} />
      <Icon source={ImageIcon} />
      <Icon source={TextWithImageIcon} />
      <Icon source={ImageWithTextOverlayIcon} />
      <Icon source={ImagesIcon} />
      <Icon source={ImportIcon} />
      <Icon source={StoreImportIcon} />
      <Icon source={InactiveLocationMajor} />
      <Icon source={InactiveLocationMinor} />
      <Icon source={IncomingIcon} />
      <Icon source={TextIndentIcon} />
      <Icon source={TextIndentIcon} />
      <Icon source={InfoIcon} />
      <Icon source={DatabaseAddIcon} />
      <Icon source={DatabaseAddIcon} />
      <Icon source={SocialInstagramIcon} />
      <Icon source={ImportIcon} />
      <Icon source={InventoryFilledIcon} />
      <Icon source={InventoryIcon} />
      <Icon source={EmailIcon} />
      <Icon source={IqIcon} />
      <Icon source={TextItalicIcon} />
      <Icon source={TextItalicIcon} />
      <Icon source={WorkFilledIcon} />
      <Icon source={WorkIcon} />
      <Icon source={KeyIcon} />
      <Icon source={KeyboardIcon} />
      <Icon source={KeyboardIcon} />
      <Icon source={LabelPrinterIcon} />
      <Icon source={DomainLandingPageIcon} />
      <Icon source={LanguageFilledIcon} />
      <Icon source={LanguageIcon} />
      <Icon source={LastClickModelMinor} />
      <Icon source={LastNonDirectClickModelMinor} />
      <Icon source={ContractFilledIcon} />
      <Icon source={ContractIcon} />
      <Icon source={LinearModelMinor} />
      <Icon source={LinkIcon} />
      <Icon source={ListFilledMajor} />
      <Icon source={ListBulletedIcon} />
      <Icon source={ListBulletedIcon} />
      <Icon source={LiveFilledIcon} />
      <Icon source={LiveIcon} />
      <Icon source={LocationFilledIcon} />
      <Icon source={LocationIcon} />
      <Icon source={LocationIcon} />
      <Icon source={LockFilledIcon} />
      <Icon source={LockIcon} />
      <Icon source={LockIcon} />
      <Icon source={ExitIcon} />
      <Icon source={LayoutLogoBlockIcon} />
      <Icon source={MagicIcon} />
      <Icon source={MagicIcon} />
      <Icon source={StoreManagedIcon} />
      <Icon source={OrderFullfilledIcon} />
      <Icon source={ReceiptPaidIcon} />
      <Icon source={TargetFilledIcon} />
      <Icon source={TargetIcon} />
      <Icon source={TargetIcon} />
      <Icon source={MarketsFilledIcon} />
      <Icon source={MarketsIcon} />
      <Icon source={MaximizeIcon} />
      <Icon source={MaximizeIcon} />
      <Icon source={MeasurementSizeIcon} />
      <Icon source={MentionIcon} />
      <Icon source={MergeIcon} />
      <Icon source={MetafieldsFilledIcon} />
      <Icon source={MetafieldsIcon} />
      <Icon source={MetafieldsIcon} />
      <Icon source={MetaobjectIcon} />
      <Icon source={MetaobjectReferenceIcon} />
      <Icon source={MicrophoneIcon} />
      <Icon source={MinimizeIcon} />
      <Icon source={MinimizeIcon} />
      <Icon source={MinusIcon} />
      <Icon source={MinusIcon} />
      <Icon source={CheckIcon} />
      <Icon source={ArrowLeftIcon} />
      <Icon source={XIcon} />
      <Icon source={ChevronLeftIcon} />
      <Icon source={MenuIcon} />
      <Icon source={MenuHorizontalIcon} />
      <Icon source={MobileIcon} />
      <Icon source={PlusIcon} />
      <Icon source={MenuVerticalIcon} />
      <Icon source={CalculatorIcon} />
      <Icon source={MoneyFilledMinor} />
      <Icon source={MoneyIcon} />
      <Icon source={NatureIcon} />
      <Icon source={CompassIcon} />
      <Icon source={NoteIcon} />
      <Icon source={NoteIcon} />
      <Icon source={NotificationFilledIcon} />
      <Icon source={NotificationIcon} />
      <Icon source={StoreOnlineIcon} />
      <Icon source={StoreOnlineIcon} />
      <Icon source={OrdersStatusIcon} />
      <Icon source={ListNumberedIcon} />
      <Icon source={ListNumberedIcon} />
      <Icon source={OrderFilledIcon} />
      <Icon source={OrderIcon} />
      <Icon source={OrderIcon} />
      <Icon source={OrganizationIcon} />
      <Icon source={OutdentMajor} />
      <Icon source={OutdentMinor} />
      <Icon source={OutgoingIcon} />
      <Icon source={PackageFilledIcon} />
      <Icon source={PackageIcon} />
      <Icon source={PageDownIcon} />
      <Icon source={PageIcon} />
      <Icon source={PageRemoveIcon} />
      <Icon source={PageAddIcon} />
      <Icon source={PageReferenceIcon} />
      <Icon source={PageUpIcon} />
      <Icon source={PaginationEndIcon} />
      <Icon source={PaginationStartIcon} />
      <Icon source={PaintBrushFlatIcon} />
      <Icon source={PaperCheckIcon} />
      <Icon source={PaperCheckIcon} />
      <Icon source={PasskeyFilledIcon} />
      <Icon source={PasskeyIcon} />
      <Icon source={PasskeyIcon} />
      <Icon source={PauseCircleIcon} />
      <Icon source={PauseCircleIcon} />
      <Icon source={PauseCircleIcon} />
      <Icon source={PaymentFilledIcon} />
      <Icon source={PaymentIcon} />
      <Icon source={PersonalizedTextIcon} />
      <Icon source={PhoneInIcon} />
      <Icon source={PhoneIcon} />
      <Icon source={PhoneOutIcon} />
      <Icon source={PinFilledIcon} />
      <Icon source={PinFilledIcon} />
      <Icon source={PinIcon} />
      <Icon source={PinIcon} />
      <Icon source={SocialPintrestIcon} />
      <Icon source={PlanFilledIcon} />
      <Icon source={PlanIcon} />
      <Icon source={PlanIcon} />
      <Icon source={PlayCircleIcon} />
      <Icon source={PlayIcon} />
      <Icon source={PlayIcon} />
      <Icon source={PlusIcon} />
      <Icon source={PointOfSaleIcon} />
      <Icon source={ChartPopularIcon} />
      <Icon source={PositionBasedModelMinor} />
      <Icon source={SearchListIcon} />
      <Icon source={PrintIcon} />
      <Icon source={PrintIcon} />
      <Icon source={ProductCostIcon} />
      <Icon source={ProductReferenceIcon} />
      <Icon source={ProductReturnIcon} />
      <Icon source={ProductFilledIcon} />
      <Icon source={ProductIcon} />
      <Icon source={ProductIcon} />
      <Icon source={ProfileIcon} />
      <Icon source={ProfileIcon} />
      <Icon source={MegaphoneFilledIcon} />
      <Icon source={MegaphoneIcon} />
      <Icon source={QuestionCircleIcon} />
      <Icon source={QuestionCircleIcon} />
      <Icon source={QuestionCircleIcon} />
      <Icon source={QuestionCircleIcon} />
      <Icon source={CartSaleIcon} />
      <Icon source={BookIcon} />
      <Icon source={ReceiptIcon} />
      <Icon source={SearchRecentIcon} />
      <Icon source={RedoIcon} />
      <Icon source={ReferralCodeIcon} />
      <Icon source={ChatReferralIcon} />
      <Icon source={RefreshIcon} />
      <Icon source={RefreshIcon} />
      <Icon source={ReceiptRefundIcon} />
      <Icon source={ReceiptRefundIcon} />
      <Icon source={ProductRemoveIcon} />
      <Icon source={OrderRepeatIcon} />
      <Icon source={ReplaceIcon} />
      <Icon source={ReplayIcon} />
      <Icon source={ReportFilledMinor} />
      <Icon source={SearchResourceIcon} />
      <Icon source={SearchResourceIcon} />
      <Icon source={ResetIcon} />
      <Icon source={EyeglassesIcon} />
      <Icon source={ReturnIcon} />
      <Icon source={PackageReturnedIcon} />
      <Icon source={TextWithImageIcon} />
      <Icon source={AlertTriangleIcon} />
      <Icon source={AlertTriangleIcon} />
      <Icon source={LayoutRows2Icon} />
      <Icon source={SandboxIcon} />
      <Icon source={SaveIcon} />
      <Icon source={SearchIcon} />
      <Icon source={SearchIcon} />
      <Icon source={LayoutSectionIcon} />
      <Icon source={ShieldCheckMarkIcon} />
      <Icon source={SelectIcon} />
      <Icon source={SendIcon} />
      <Icon source={SettingsFilledIcon} />
      <Icon source={SettingsIcon} />
      <Icon source={SettingsIcon} />
      <Icon source={ShareIcon} />
      <Icon source={ShareIcon} />
      <Icon source={DeliveryFilledIcon} />
      <Icon source={DeliveryIcon} />
      <Icon source={ShopcodesIcon} />
      <Icon source={LayoutSidebarLeftIcon} />
      <Icon source={LayoutSidebarRightIcon} />
      <Icon source={SidekickIcon} />
      <Icon source={ArrowsInHorizontalIcon} />
      <Icon source={ArrowsInHorizontalIcon} />
      <Icon source={SlideshowIcon} />
      <Icon source={SmileyHappyIcon} />
      <Icon source={SmileyJoyIcon} />
      <Icon source={SmileyNeutralIcon} />
      <Icon source={SmileySadIcon} />
      <Icon source={SocialSnapchatIcon} />
      <Icon source={SocialAdIcon} />
      <Icon source={SocialPostIcon} />
      <Icon source={EnvelopeSoftPackIcon} />
      <Icon source={SortAscendingIcon} />
      <Icon source={SortDescendingIcon} />
      <Icon source={SortIcon} />
      <Icon source={SoundIcon} />
      <Icon source={StarFilledIcon} />
      <Icon source={StarIcon} />
      <Icon source={StatusActiveIcon} />
      <Icon source={StopCircleIcon} />
      <Icon source={TextInRowsFilledIcon} />
      <Icon source={TextInRowsIcon} />
      <Icon source={StoreFilledIcon} />
      <Icon source={StoreIcon} />
      <Icon source={StoreIcon} />
      <Icon source={StatusIcon} />
      <Icon source={TabletIcon} />
      <Icon source={CreditCartTapChipIcon} />
      <Icon source={TaxFilledIcon} />
      <Icon source={TaxIcon} />
      <Icon source={TeamIcon} />
      <Icon source={ThemeTemplateIcon} />
      <Icon source={ThemeTemplateIcon} />
      <Icon source={TextAlignCenterIcon} />
      <Icon source={TextAlignLeftIcon} />
      <Icon source={TextAlignRightIcon} />
      <Icon source={TextBlockIcon} />
      <Icon source={TextColorIcon} />
      <Icon source={TextColorIcon} />
      <Icon source={TextIcon} />
      <Icon source={ThemeEditIcon} />
      <Icon source={ThemeStoreIcon} />
      <Icon source={ThemeIcon} />
      <Icon source={ThumbsDownIcon} />
      <Icon source={ThumbsDownIcon} />
      <Icon source={ThumbsUpIcon} />
      <Icon source={ThumbsUpIcon} />
      <Icon source={CheckIcon} />
      <Icon source={CheckSmallIcon} />
      <Icon source={SocialTiktokIcon} />
      <Icon source={TimeDecayModelMinor} />
      <Icon source={PageAttachmentIcon} />
      <Icon source={TipJarIcon} />
      <Icon source={TextTitleIcon} />
      <Icon source={ToggleIcon} />
      <Icon source={WrenchIcon} />
      <Icon source={TransactionFeeDollarIcon} />
      <Icon source={TransactionFeeEuroIcon} />
      <Icon source={TransactionFeePoundIcon} />
      <Icon source={TransactionFeeRupeeIcon} />
      <Icon source={TransactionFeeYenIcon} />
      <Icon source={TransactionIcon} />
      <Icon source={TransferFilledMajor} />
      <Icon source={TransferInIcon} />
      <Icon source={TransferIcon} />
      <Icon source={TransferOutIcon} />
      <Icon source={TransferInternalIcon} />
      <Icon source={LanguageTranslateIcon} />
      <Icon source={AirplaneIcon} />
      <Icon source={WrenchIcon} />
      <Icon source={SocialTumblrIcon} />
      <Icon source={SocialTwitchIcon} />
      <Icon source={SocialTwitterIcon} />
      <Icon source={TextFontIcon} />
      <Icon source={TextFontIcon} />
      <Icon source={TextUnderlineIcon} />
      <Icon source={TextUnderlineIcon} />
      <Icon source={UndoIcon} />
      <Icon source={OrderUnfulfilledIcon} />
      <Icon source={UnknownDeviceIcon} />
      <Icon source={InventoryUpdatedIcon} />
      <Icon source={UploadIcon} />
      <Icon source={VariantIcon} />
      <Icon source={ViewIcon} />
      <Icon source={ViewIcon} />
      <Icon source={ViewportNarrowIcon} />
      <Icon source={ViewportShortMajor} />
      <Icon source={ViewportTallIcon} />
      <Icon source={ViewportWideIcon} />
      <Icon source={SocialVimeoIcon} />
      <Icon source={BookOpenIcon} />
      <Icon source={MeasurementVolumeIcon} />
      <Icon source={WandIcon} />
      <Icon source={WandIcon} />
      <Icon source={WatchIcon} />
      <Icon source={MeasurementWeightIcon} />
      <Icon source={ForkliftIcon} />
      <Icon source={WifiIcon} />
      <Icon source={SocialYoutubeIcon} />
    </>
  );
}
