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
            url: '#',
            selected: true,
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
      <Navigation.Section
        title="Sales channels"
        items={[
          {
            url: '#',
            label: 'Online Store',
            icon:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 8c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zm0 6H4v-4c1.193 0 2.267-.525 3-1.357C7.733 9.475 8.807 10 10 10s2.267-.525 3-1.357c.733.832 1.807 1.357 3 1.357v4zm-3.28 4H7.28c.358-.702.537-1.434.628-2h4.184c.09.566.27 1.298.627 2zM12 6c0 1.103-.897 2-2 2s-2-.897-2-2h4zM2 6h4c0 1.103-.897 2-2 2s-2-.897-2-2zm1.618-4h12.764l1 2H2.618l1-2zm16.277 2.553l-2-4C17.725.213 17.38 0 17 0H3c-.38 0-.725.214-.895.553l-2 4C.035 4.69 0 4.845 0 5v1c0 1.474.81 2.75 2 3.444V15c0 .552.447 1 1 1h2.87c-.156.747-.507 1.7-1.317 2.105-.415.208-.633.673-.527 1.125.108.45.51.77.974.77h10c.464 0 .866-.32.974-.77.106-.452-.112-.917-.527-1.125-.8-.4-1.153-1.356-1.313-2.105H17c.553 0 1-.448 1-1V9.444c1.19-.694 2-1.97 2-3.444V5c0-.155-.036-.31-.105-.447z"/></svg>',
            selected: true,
            onClick: toggleIsLoading,
          },
          {
            label: 'Buy Button',
            onClick: toggleIsLoading,
            icon:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.873 13.679l-.72 4.32H4.677l-1.431-3.576c.59-.177 1.628-.134 3.047 1.284A.999.999 0 1 0 8 15V7a1.001 1.001 0 0 1 2 0v4a1 1 0 0 0 .684.949l5.189 1.73zM5 7.999A3 3 0 0 1 2 5c0-1.653 1.346-3 3-3h10c1.654 0 3 1.347 3 3 0 1.656-1.346 3-3 3h-3V7c0-1.653-1.346-3-3-3S6 5.347 6 7v1H5zm10 2c2.757 0 5-2.242 5-5 0-2.756-2.243-5-5-5H5A5.008 5.008 0 0 0 0 5c0 2.758 2.243 5 5 5h1v2.972c-2.184-1.214-3.959-.426-4.707.322-.283.283-.37.707-.222 1.079l2 5c.153.379.52.628.929.628h12a.999.999 0 0 0 .986-.835l1-6a.999.999 0 0 0-.67-1.113L12 10.28V10h3z"/></svg>',
          },
        ]}
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
