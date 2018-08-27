---
name: Frame
category: Structure
keywords:
  - navigation
  - nav
  - links
  - primary navigation
  - main navigation
  - global
  - frame
  - sidebar
  - side bar
  - loading
  - top bar
  - menu
  - toast
fullSizeExamples: true
---

# Frame

The frame component, while not visible in the user interface itself, provides the structure for any non-embedded application. It wraps the main elements and houses the primary [navigation](/components/navigation/navigation), [top bar](/components/structure/topbar), [toast](/components/structure/toast), and [contextual save bar](/components/structure/contextual-save-bar) components.

---

## Best practices

For the best experience when creating an application frame, use the following components:

- [Top bar](/components/structure/topbar)
- [Navigation](/components/navigation/navigation)
- [Contextual save bar](/components/structure/contextual-save-bar)
- [Toast](/components/structure/toast)
- [Loading](/components/structure/loading)

---

## Examples

### Frame

Use to present the frame structure and all of its elements.

```jsx
class FrameExample extends React.Component {
  defaultState = {
    emailFieldValue: 'ellen@ochoacrafts.com',
    nameFieldValue: 'Ochoa Crafts',
  };

  state = {
    showToast: false,
    isLoading: false,
    isDirty: false,
    searchActive: false,
    searchText: '',
    userMenuOpen: false,
    showMobileNavigation: false,
    modalActive: false,
    nameFieldValue: this.defaultState.nameFieldValue,
    emailFieldValue: this.defaultState.emailFieldValue,
    storeName: this.defaultState.nameFieldValue,
  };

  render() {
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName,
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content="Changes saved"
      />
    ) : null;

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={[
          {
            id: '123',
            items: [
              {content: 'Your profile', icon: 'profile'},
              {content: 'Log out', icon: 'logOut'},
            ],
          },
          {
            id: '456',
            items: [
              {content: 'Shopify help center'},
              {content: 'Community forums'},
            ],
          },
        ]}
        name="Ellen Ochoa"
        detail={storeName}
        avatarInitials="EO"
      />
    );

    const contextualSaveBarMarkup = (
      <ContextualSaveBar
        visible={isDirty}
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave,
        }}
        discardAction={{
          onAction: this.handleDiscard,
        }}
      />
    );

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              {content: 'Your profile', icon: 'profile'},
              {content: 'Log out', icon: 'logOut'},
            ],
          },
          {
            items: [
              {content: 'Shopify help center'},
              {content: 'Community forums'},
            ],
          },
        ]}
        name="Ellen Ochoa"
        detail={storeName}
        initials="EO"
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
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
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const navigationMarkup = (
      <Navigation location="/" userMenu={navigationUserMenuMarkup}>
        <Navigation.Section
          items={[
            {
              label: 'Home',
              icon: 'home',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Orders',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Products',
              icon: 'products',
              onClick: this.toggleState('isLoading'),
            },
          ]}
        />
        <Navigation.Section
          title="Sales channels"
          items={[
            {
              label: 'Online Store',
              icon: 'onlineStore',
              onClick: this.toggleState('isLoading'),
            },
          ]}
          separator
          action={{
            icon: 'circlePlusOutline',
            accessibilityLabel: 'Add a sales channel',
            onClick: this.toggleState('modalActive'),
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Settings">
        <Layout>
          <Layout.AnnotatedSection
            title="Store details"
            description="Shopify and your customers will use this information to contact you."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Store name"
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type="email"
                  label="Account email"
                  value={emailFieldValue}
                  onChange={this.handleEmailFieldChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

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

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState('modalActive')}
        title="Add sales channel"
        primaryAction={{
          content: 'Add Instagram',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <Stack wrap={false}>
            <Stack.Item>
              <img
                style={{
                  minWidth: '4rem',
                  maxWidth: '4rem',
                  height: '4rem',
                }}
                src="https://cdn.shopify.com/s/files/applications/e47f922e057de8e341967bbd31444fdb.png?1521134959"
                alt="Instagram logo"
              />
            </Stack.Item>
            <Stack.Item fill>
              <p>
                Sell your products directly on Instagram by tagging products in
                your posts, to create a seamless shopping experience for your
                customers.
              </p>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: '#108043',
        },
      },
      logo: {
        width: 104,
        topBarSource:
          'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-white.svg',
        contextualSaveBarSource:
          'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-black.svg',
      },
    };

    return (
      <AppProvider theme={theme}>
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={showMobileNavigation}
          onNavigationDismiss={this.toggleState('showMobileNavigation')}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
          {modalMarkup}
        </Frame>
      </AppProvider>
    );
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSearchFieldChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleEmailFieldChange = (emailFieldValue) => {
    this.setState({emailFieldValue});
    if (emailFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleNameFieldChange = (nameFieldValue) => {
    this.setState({nameFieldValue});
    if (nameFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue,
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false,
    });
  };
}
```

---

## Related components

- To display the navigation component on small screens, to provide search and a user menu, or to style the [frame](/components/structure/frame) component to reflect an application’s brand, use the [top bar](/components/structure/topbar) component.
- To display the primary navigation within the frame of a non-embedded application, use the [navigation](/components/structure/navigation) component.
- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](/components/structure/contextual-save-bar) component.
- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](/components/structure/toast) component.
- To indicate to merchants that a page is loading or an upload is processing use the [loading](/components/structure/loading) component.
