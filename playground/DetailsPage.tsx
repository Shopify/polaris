import React, {useCallback, useRef, useState} from 'react';
import {
  ConversationMinor,
  HomeMajorTwotone,
  OrdersMajorTwotone,
  ProductsMajorTwotone,
  CustomersMajorTwotone,
  AnalyticsMajorTwotone,
  MarketingMajorTwotone,
  DiscountsMajorTwotone,
  AppsMajorTwotone,
  DuplicateMinor,
  ViewMinor,
} from '@shopify/polaris-icons';
import {
  ActionList,
  Card,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Modal,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  Toast,
  TopBar,
  Badge,
  Select,
  DropZone,
  Stack,
  Caption,
  Thumbnail,
} from '../src';

export function DetailsPage() {
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
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

  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    [],
  );
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    [],
  );
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
  const handleSearchFieldChange = useCallback((value) => {
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

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
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
    />
  );

  const searchResultsMarkup = (
    <Card>
      <ActionList
        items={[
          {content: 'Shopify help center'},
          {content: 'Community forums'},
        ]}
      />
    </Card>
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );
  // TODO: DELETE THIS STATIC MARKUP
  const contextControlMarkup = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '68px',
        padding: '0 16px',
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.8956 8.39159C26.876 8.25021 26.751 8.17175 26.6473 8.16321C26.5443 8.15466 24.5277 8.12436 24.5277 8.12436C24.5277 8.12436 22.8411 6.50548 22.6745 6.3408C22.5079 6.17611 22.1825 6.22583 22.056 6.26312C22.0544 6.26389 21.7392 6.36022 21.2087 6.52257C21.1199 6.23826 20.9895 5.88869 20.8032 5.53757C20.2028 4.40498 19.3233 3.80605 18.2608 3.8045C18.2592 3.8045 18.2584 3.8045 18.2568 3.8045C18.183 3.8045 18.1099 3.81149 18.036 3.8177C18.0046 3.78042 17.9731 3.74391 17.9401 3.70817C17.4772 3.21878 16.8838 2.9803 16.1726 3.00127C14.8004 3.04011 13.4337 4.01968 12.3255 5.75974C11.5459 6.984 10.9525 8.52209 10.7843 9.71295C9.20858 10.1954 8.10673 10.5325 8.08237 10.5403C7.28702 10.7873 7.26187 10.8114 7.15813 11.5524C7.08111 12.1125 5 28.0186 5 28.0186L22.4403 31L29.9992 29.1426C29.9992 29.1426 26.9153 8.53297 26.8956 8.39159ZM20.3356 6.7898C19.934 6.91253 19.4774 7.05236 18.9822 7.20384C18.972 6.51714 18.8895 5.56165 18.5657 4.7359C19.607 4.93088 20.1195 6.09532 20.3356 6.7898ZM18.0698 7.48349C17.1558 7.76315 16.1584 8.06843 15.158 8.3745C15.4393 7.30949 15.973 6.24913 16.6284 5.55388C16.8721 5.29521 17.2131 5.00701 17.6171 4.84232C17.9967 5.62535 18.0792 6.73387 18.0698 7.48349ZM16.2001 3.90393C16.5223 3.89694 16.7935 3.96685 17.0253 4.11755C16.6544 4.30787 16.296 4.58131 15.9596 4.93787C15.088 5.86228 14.42 7.29706 14.1536 8.68134C13.3229 8.93536 12.5102 9.18472 11.762 9.4131C12.2344 7.23414 14.0821 3.96452 16.2001 3.90393Z"
          fill="#95BF47"
        ></path>
        <path
          d="M26.6482 8.16418C26.5452 8.15564 24.5286 8.12534 24.5286 8.12534C24.5286 8.12534 22.842 6.50646 22.6754 6.34178C22.6133 6.28041 22.5292 6.24856 22.4412 6.23535L22.4419 30.9994L30.0001 29.1428C30.0001 29.1428 26.9162 8.53395 26.8965 8.39257C26.8769 8.25119 26.7511 8.17273 26.6482 8.16418Z"
          fill="#5E8E3E"
        ></path>
        <path
          d="M18.2512 12.0055L17.3734 15.2518C17.3734 15.2518 16.3941 14.8113 15.2333 14.8836C13.531 14.99 13.5129 16.0511 13.5302 16.3176C13.623 17.7695 17.4873 18.0864 17.7042 21.4873C17.8748 24.1626 16.2684 25.9928 13.9538 26.1373C11.1756 26.3105 9.64624 24.6909 9.64624 24.6909L10.2349 22.2159C10.2349 22.2159 11.7745 23.3641 13.0068 23.2872C13.8116 23.2367 14.0992 22.5896 14.0702 22.132C13.9491 20.2382 10.8023 20.35 10.6035 17.2381C10.4361 14.6195 12.1761 11.9659 16.0153 11.7266C17.4944 11.6326 18.2512 12.0055 18.2512 12.0055Z"
          fill="white"
        ></path>
      </svg>
      <p style={{marginLeft: '8px', fontWeight: '600', fontSize: '14px'}}>
        Spectrally yours
      </p>
    </div>
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
    />
  );

  // ---- Navigation ----
  const navigationMarkup = (
    <Navigation location="/" contextControl={contextControlMarkup}>
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Orders',
            icon: OrdersMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Products',
            icon: ProductsMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Customers',
            icon: CustomersMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Analytics',
            icon: AnalyticsMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Marketing',
            icon: MarketingMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Discounts',
            icon: DiscountsMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Apps',
            icon: AppsMajorTwotone,
            onClick: toggleIsLoading,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <a
      href="#SkipToContent"
      id="SkipToContentTarget"
      ref={skipToContentRef}
      tabIndex={-1}
    />
  );

  // ---- Description ----
  const [DescriptionValue, setValue] = useState(
    'The M60-A represents the benchmark and equilibrium between function and design for us at Rama Works. The gently exaggerated design of the frame is not understated, but rather provocative. Inspiration and evolution from previous models are evident in the beautifully articulated design and the well defined aesthetic, the fingerprint of our ‘Industrial Modern’ designs.',
  );

  // ---- Select ----
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {label: 'Keyboard', value: 'keyboard'},
    {label: 'Accessories', value: 'accessories'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  // ---- Dropzone ----
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.indexOf(file.type) > 0
                ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  window.URL.createObjectURL(file)
                : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304'
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  // ---- Page markup ----
  const actualPageMarkup = (
    <Page
      breadcrumbs={[{content: 'Products', url: '/products/31'}]}
      title="M60-A"
      titleMetadata={<Badge status="success">Success badge</Badge>}
      secondaryActions={[
        {
          content: 'Duplicate',
          icon: DuplicateMinor,
        },
        {
          content: 'View',
          icon: ViewMinor,
        },
      ]}
      actionGroups={[
        {
          title: 'Promote',
          actions: [{content: 'Share on Facebook'}],
        },
        {
          title: 'More actions',
          actions: [{content: 'Embed on a website'}],
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
          <Card sectioned>
            <FormLayout>
              <TextField label="Title" value="M60-A" onChange={() => {}} />
              <TextField
                label="Description"
                value={DescriptionValue}
                onChange={handleChange}
                multiline
              />
            </FormLayout>
          </Card>
          <Card title="Media" sectioned>
            <DropZone onDrop={handleDropZoneDrop}>
              {uploadedFiles}
              {fileUpload}
            </DropZone>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Organization">
            <Card.Section>
              <Select
                label="Product type"
                options={options}
                onChange={handleSelectChange}
                value={selected}
              />
              <br />
              <Select
                label="Vendor"
                options={options}
                onChange={handleSelectChange}
                value={selected}
              />
            </Card.Section>
            <Card.Section title="Collections"></Card.Section>
            <Card.Section title="Tags"></Card.Section>
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
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
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
            onChange={handleSubjectChange}
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
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
      skipToContentTarget={skipToContentRef.current}
    >
      {contextualSaveBarMarkup}
      {loadingMarkup}
      {pageMarkup}
      {toastMarkup}
      {modalMarkup}
    </Frame>
  );
}
