import React, {useCallback, useRef, useState} from 'react';
import {
  ChartVerticalIcon,
  AppsIcon,
  PlusCircleIcon,
  PersonIcon,
  DiscountIcon,
  ExternalIcon,
  GlobeIcon,
  HomeIcon,
  TargetIcon,
  OrderIcon,
  ProductIcon,
  SettingsIcon,
  WifiIcon,
  InfoIcon,
  CollectionIcon,
} from '@shopify/polaris-icons';

import {
  ActionList,
  Badge,
  ContextualSaveBar,
  DropZone,
  FormLayout,
  Frame,
  Layout,
  // eslint-disable-next-line import/no-deprecated
  LegacyCard,
  Loading,
  Modal,
  Navigation,
  Page,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  // eslint-disable-next-line import/no-deprecated
  LegacyStack,
  Text,
  // eslint-disable-next-line import/no-deprecated
  TextContainer,
  TextField,
  Thumbnail,
  Toast,
  TopBar,
  FooterHelp,
  Link,
  Card,
  BlockStack,
  InlineGrid,
  Icon,
  Tooltip,
} from '../src';
import type {DropZoneProps, PageProps} from '../src';

import {ComplexMultiSelect} from './components';
import styles from './DetailsPage.module.scss';

export function DetailsPage() {
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  });
  const skipToContentRef = useRef<HTMLAnchorElement>(null);
  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [navItemActive, setNavItemActive] = useState('products');
  const initialDescription =
    'The M60-A represents the benchmark and equilibrium between function and design for us at Rama Works. The gently exaggerated design of the frame is not understated, but rather provocative. Inspiration and evolution from previous models are evident in the beautifully articulated design and the well defined aesthetic, the fingerprint of our ‘Industrial Modern’ designs.';
  const [previewValue, setPreviewValue] = useState(initialDescription);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue,
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue,
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const contextControlMarkup = (
    <div className={styles.ContextControl}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.8956 8.39159C26.876 8.25021 26.751 8.17175 26.6473 8.16321C26.5443 8.15466 24.5277 8.12436 24.5277 8.12436C24.5277 8.12436 22.8411 6.50548 22.6745 6.3408C22.5079 6.17611 22.1825 6.22583 22.056 6.26312C22.0544 6.26389 21.7392 6.36022 21.2087 6.52257C21.1199 6.23826 20.9895 5.88869 20.8032 5.53757C20.2028 4.40498 19.3233 3.80605 18.2608 3.8045C18.2592 3.8045 18.2584 3.8045 18.2568 3.8045C18.183 3.8045 18.1099 3.81149 18.036 3.8177C18.0046 3.78042 17.9731 3.74391 17.9401 3.70817C17.4772 3.21878 16.8838 2.9803 16.1726 3.00127C14.8004 3.04011 13.4337 4.01968 12.3255 5.75974C11.5459 6.984 10.9525 8.52209 10.7843 9.71295C9.20858 10.1954 8.10673 10.5325 8.08237 10.5403C7.28702 10.7873 7.26187 10.8114 7.15813 11.5524C7.08111 12.1125 5 28.0186 5 28.0186L22.4403 31L29.9992 29.1426C29.9992 29.1426 26.9153 8.53297 26.8956 8.39159ZM20.3356 6.7898C19.934 6.91253 19.4774 7.05236 18.9822 7.20384C18.972 6.51714 18.8895 5.56165 18.5657 4.7359C19.607 4.93088 20.1195 6.09532 20.3356 6.7898ZM18.0698 7.48349C17.1558 7.76315 16.1584 8.06843 15.158 8.3745C15.4393 7.30949 15.973 6.24913 16.6284 5.55388C16.8721 5.29521 17.2131 5.00701 17.6171 4.84232C17.9967 5.62535 18.0792 6.73387 18.0698 7.48349ZM16.2001 3.90393C16.5223 3.89694 16.7935 3.96685 17.0253 4.11755C16.6544 4.30787 16.296 4.58131 15.9596 4.93787C15.088 5.86228 14.42 7.29706 14.1536 8.68134C13.3229 8.93536 12.5102 9.18472 11.762 9.4131C12.2344 7.23414 14.0821 3.96452 16.2001 3.90393Z"
          fill="#95BF47"
        />
        <path
          d="M26.6482 8.16418C26.5452 8.15564 24.5286 8.12534 24.5286 8.12534C24.5286 8.12534 22.842 6.50646 22.6754 6.34178C22.6133 6.28041 22.5292 6.24856 22.4412 6.23535L22.4419 30.9994L30.0001 29.1428C30.0001 29.1428 26.9162 8.53395 26.8965 8.39257C26.8769 8.25119 26.7511 8.17273 26.6482 8.16418Z"
          fill="#5E8E3E"
        />
        <path
          d="M18.2512 12.0055L17.3734 15.2518C17.3734 15.2518 16.3941 14.8113 15.2333 14.8836C13.531 14.99 13.5129 16.0511 13.5302 16.3176C13.623 17.7695 17.4873 18.0864 17.7042 21.4873C17.8748 24.1626 16.2684 25.9928 13.9538 26.1373C11.1756 26.3105 9.64624 24.6909 9.64624 24.6909L10.2349 22.2159C10.2349 22.2159 11.7745 23.3641 13.0068 23.2872C13.8116 23.2367 14.0992 22.5896 14.0702 22.132C13.9491 20.2382 10.8023 20.35 10.6035 17.2381C10.4361 14.6195 12.1761 11.9659 16.0153 11.7266C17.4944 11.6326 18.2512 12.0055 18.2512 12.0055Z"
          fill="white"
        />
      </svg>
      <p className={styles.ShopName}>Spectrally yours</p>
    </div>
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
        discardConfirmationModal: true,
      }}
      contextControl={contextControlMarkup}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      accessibilityLabel="User menu"
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
      contextControl={contextControlMarkup}
      searchResultsOverlayVisible
    />
  );
  // ---- Navigation ----
  const navigationMarkup = (
    <Navigation location="/" contextControl={contextControlMarkup}>
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('home');
            },
            matches: navItemActive === 'home',
            url: '#',
          },
          {
            label: 'Orders',
            icon: OrderIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('orders');
            },
            matches: navItemActive === 'orders',
            url: '#',
            subNavigationItems: [
              {
                label: 'All orders',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('all-orders');
                },
                matches: navItemActive.includes('orders'),
                url: '#',
              },
              {
                url: '#',
                label: 'Drafts',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('drafts');
                },
                matches: navItemActive === 'drafts',
              },
              {
                url: '#',
                label: 'Abandoned checkouts',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('abandoned');
                },
                matches: navItemActive === 'abandoned',
              },
            ],
          },
          {
            label: 'Products',
            icon: ProductIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('products');
            },
            matches: navItemActive === 'products',
            url: '#',
            subNavigationItems: [
              {
                label: 'All products',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('all-products');
                },
                matches: navItemActive.includes('products'),
                url: '#',
              },
              {
                url: '#',
                label: 'Inventory',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('inventory');
                },
                matches: navItemActive === 'inventory',
              },
              {
                url: '#',
                label: 'Transfers',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('transfers');
                },
                matches: navItemActive === 'transfers',
              },
            ],
          },
          {
            label: 'Customers',
            icon: PersonIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('customers');
            },
            matches: navItemActive === 'customers',
            url: '#',
          },
          {
            label: 'Analytics',
            icon: ChartVerticalIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('analytics');
            },
            matches: navItemActive === 'analytics',
            url: '#',
          },
          {
            label: 'Marketing',
            icon: TargetIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('marketing');
            },
            matches: navItemActive === 'marketing',
            url: '#',
          },
          {
            label: 'Discounts',
            icon: DiscountIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('discounts');
            },
            matches: navItemActive === 'discounts',
            url: '#',
          },
          {
            label: 'Apps',
            icon: AppsIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('apps');
            },
            matches: navItemActive === 'apps',
            url: '#',
          },
        ]}
      />
      <Navigation.Section
        fill
        title="Sales channels"
        action={{
          icon: PlusCircleIcon,
          accessibilityLabel: 'Add sales channel',
          onClick: toggleModalActive,
          tooltip: {
            content: 'Add sales channel',
          },
        }}
        items={[
          {
            label: 'Point of sale',
            icon: posIcon,
            onClick: () => {
              toggleIsLoading();
              setNavItemActive('pos');
            },
            matches: navItemActive === 'pos',
            url: '#',
            subNavigationItems: [
              {
                label: 'Overview',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('pos');
                },
                matches: navItemActive.includes('pos'),
                url: '#',
              },
              {
                url: '#',
                label: 'Staff',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('pos');
                },
                matches: navItemActive === 'pos',
              },
              {
                url: '#',
                label: 'Locations',
                onClick: () => {
                  toggleIsLoading();
                  setNavItemActive('pos');
                },
                matches: navItemActive === 'pos',
                external: true,
              },
            ],
          },
          {
            label: 'Updog Marketplace',
            icon: ProductIcon,
            onClick: () => {},
            matches: navItemActive === 'pos',
            url: '#',
            secondaryAction: {
              url: '#',
              accessibilityLabel: 'OLp',
              icon: ExternalIcon,
              tooltip: {
                content: 'Open Updog Marketplace',
              },
            },
          },
          {
            label: 'Radio',
            icon: WifiIcon,
            onClick: () => {},
            matches: navItemActive === 'pos',
            url: '#',
            secondaryAction: {
              url: '#',
              accessibilityLabel: 'radio',
              icon: GlobeIcon,
            },
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            icon: SettingsIcon,
            label: 'Settings',
            onClick: toggleModalActive,
          },
        ]}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <Text as="span" visuallyHidden>
      <a
        href="#SkipToContent"
        id="SkipToContentTarget"
        ref={skipToContentRef}
        tabIndex={-1}
      >
        Page content
      </a>
    </Text>
  );

  const [title, setTitle] = useState(
    "The North Face Ventrix Active Trail Hybrid Hoodie - Men's",
  );
  const [descriptionValue, setDescriptionValue] = useState(initialDescription);
  const [selected, setSelected] = useState('today');

  const options = [
    {label: 'Keyboard', value: 'keyboard'},
    {label: 'Accessories', value: 'accessories'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const handleChange = useCallback((newValue: string) => {
    setDescriptionValue(newValue);
    setPreviewValue(newValue);
  }, []);

  const actions1: PageProps['secondaryActions'] = [
    {
      content: 'Duplicate',
      onAction: () => console.log('duplicate'),
    },
    {
      content: 'Print',
      onAction: () => console.log('print'),
    },
  ];
  const actions2: PageProps['secondaryActions'] = [
    {
      content: 'Print',
      onAction: () => console.log('print'),
    },
  ];

  const [actions, setActions] =
    useState<PageProps['secondaryActions']>(actions1);

  const toggleActions = () => {
    if (Array.isArray(actions) && actions.length === 2) {
      setActions(actions2);
    } else {
      setActions(actions1);
    }
  };

  // ---- Dropzone ----
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback<NonNullable<DropZoneProps['onDrop']>>(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.indexOf(file.type) > 0
                ? URL.createObjectURL(file)
                : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304'
            }
          />
          <div>
            {file.name}{' '}
            <Text as="p" variant="bodySm">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  // ---- Page markup ----
  const actualPageMarkup = (
    <Page
      backAction={{content: 'Products', url: '/products/31'}}
      title={title}
      titleMetadata={<Badge tone="success">Success badge</Badge>}
      primaryAction={{
        content: 'Save this page',
        onAction: () => console.log('save'),
      }}
      additionalMetadata="Created May 8, 2020 at 7:31 am from Developer Tools (via import)"
      secondaryActions={
        Array.isArray(actions) && [
          ...actions,
          {
            content: 'View',
            onAction: () => {
              console.log(previewValue);
            },
          },
        ]
      }
      actionGroups={[
        {
          title: 'Promote',
          actions: [
            {content: 'Promote', onAction: () => console.log('promote')},
          ],
        },
        {
          title: 'More actions',
          actions: [
            {
              content: 'Embed on a website',
              onAction: () => console.log('embed'),
            },
            {
              content: 'Toggle page actions',
              onAction: toggleActions,
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Layout>
        {skipToContentTarget}
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Title"
                value={title}
                onChange={(title) => {
                  setTitle(title);
                  setIsDirty(true);
                }}
                autoComplete="off"
              />
              <TextField
                label="Description"
                value={descriptionValue}
                onChange={handleChange}
                autoComplete="off"
                multiline
              />
            </FormLayout>
          </LegacyCard>
          <LegacyCard title="Media" sectioned>
            <DropZone onDrop={handleDropZoneDrop}>
              {uploadedFiles}
              {fileUpload}
            </DropZone>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <InlineGrid columns="1fr auto" alignItems="center">
                <Text as="h2" variant="headingSm">
                  Collections and tags
                </Text>
                <Tooltip content="Learn more">
                  <Icon source={InfoIcon} tone="subdued" />
                </Tooltip>
              </InlineGrid>

              <ComplexMultiSelect
                resourceTitle="Collections"
                emptyStateTitle="No collections"
                defaultSelected={['01234567', '12345678', '23456789']}
                optionIcon={CollectionIcon}
                options={[
                  {value: '01234567', label: 'Table'},
                  {value: '12345678', label: 'Chair'},
                  {value: '23456789', label: 'Lamp'},
                  {value: '34567890', label: 'Couch'},
                  {value: '45678901', label: 'Bed'},
                  {value: '56789012', label: 'Desk'},
                  {value: '67890123', label: 'Stool'},
                ]}
              />
              <ComplexMultiSelect
                resourceTitle="Tags"
                emptyStateTitle="No tags"
                optionIcon={TagIcon}
                options={[
                  {value: '012345678', label: 'Bryght'},
                  {value: '123456789', label: 'Grovemade'},
                  {value: '234567890', label: 'Haworth'},
                  {value: '345678901', label: 'Knoll'},
                  {value: '456789012', label: 'Kvell'},
                  {value: '567890123', label: 'Montauk'},
                  {value: '678901234', label: 'Poppin'},
                  {value: '789012345', label: 'West Elm'},
                ]}
              />
              {/* Used for reference */}
              <Select
                label="Product type (Old select for reference)"
                options={options}
                onChange={setSelected}
                value={selected}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // ---- Loading ----
  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  // ---- Modal ----
  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: 'Send',
        onAction: toggleModalActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={setSupportSubject}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={setSupportMessage}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
      skipToContentTarget={skipToContentRef}
    >
      {contextualSaveBarMarkup}
      {loadingMarkup}
      {pageMarkup}
      {toastMarkup}
      {modalMarkup}
      <FooterHelp>
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    </Frame>
  );
}

const posIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20"><path d="M8.717 9.46l.77-2.26s-.52-.29-1.57-.29c-2.71 0-4.06 1.8-4.06 3.66 0 2.21 2.22 2.27 2.22 3.61 0 .33-.23.77-.8.77-.87 0-1.9-.88-1.9-.88l-.53 1.73s1.01 1.21 2.97 1.21c1.64 0 2.85-1.22 2.85-3.12 0-2.42-2.7-2.81-2.7-3.85 0-.18.06-.93 1.26-.93.82 0 1.49.35 1.49.35zm-2.34-5.62c-.51.14-.88.57-.94 1.09-.04.42.2.85.7.81s.9-.51 1-.97c.11-.49-.18-1.04-.76-.93zm1.35-2.7c-.32 0-.72.55-.84 1.36l1.6-.39c-.19-.64-.53-.97-.76-.97zm1.93.9c.32.09.62.29.81.58l1.62 2.13c.16.23.196.458.18.78l-.23 4.84-.33 6.68-.1 1.96c0 .13-.01.26-.03.38-.09.49-.51.67-.97.59l-8.65-1.62c-.51-.09-1.07-.15-1.57-.29-.6-.17-.34-1.1-.28-1.55l.36-2.78.82-6.23c.03-.21.05-.42.08-.63.05-.28.17-.55.34-.78l1.68-2.39c.18-.28.47-.48.8-.55l1.21-.3.3-.07c.09-1.58.94-2.79 2.04-2.79.9 0 1.65.86 1.92 2.04zM12 2l3.875 2.616c.168.157.276.37.31.598l1.77 13.008c.05.195 0 .4-.135.55-.13.15-.33.226-.527.2l-3.61-.37.066-1.36.33-6.864.25-5.208c.01-.182-.05-.36-.164-.503L12 2z"/></svg>`;

function TagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 7.5C5.05964 7.5 4.5 8.05964 4.5 8.75V11.75C4.5 12.4404 5.05964 13 5.75 13H12.1716C12.5031 13 12.821 12.8683 13.0555 12.6339L15.2626 10.4268C15.3602 10.3291 15.3602 10.1709 15.2626 10.0732L13.0555 7.86612C12.821 7.6317 12.5031 7.5 12.1716 7.5H5.75ZM3 8.75C3 7.23122 4.23122 6 5.75 6H12.1716C12.9009 6 13.6004 6.28973 14.1161 6.80546L16.3232 9.01256C17.0066 9.69598 17.0066 10.804 16.3232 11.4874L14.1161 13.6945C13.6004 14.2103 12.9009 14.5 12.1716 14.5H5.75C4.23122 14.5 3 13.2688 3 11.75V8.75Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 10.25C6 9.83579 6.33579 9.5 6.75 9.5H11.25C11.6642 9.5 12 9.83579 12 10.25C12 10.6642 11.6642 11 11.25 11H6.75C6.33579 11 6 10.6642 6 10.25Z"
        fill="black"
      />
    </svg>
  );
}
