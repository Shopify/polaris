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

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  // ---- Navigation ----
  const navigationMarkup = (
    <Navigation location="/">
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
      />
      <Navigation.Section
        title="Contact support"
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
        items={[]}
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
