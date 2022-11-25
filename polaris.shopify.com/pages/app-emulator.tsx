import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {
  AppProvider,
  Frame,
  ActionList,
  Card,
  ContextualSaveBar,
  FormLayout,
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
} from '@shopify/polaris';
import {
  ArrowRightMinor,
  HomeMajor,
  OrdersMajor,
  ConversationMinor,
} from '@shopify/polaris-icons';
import enTranslations from '@shopify/polaris/locales/en.json';
import GrowFrame, {updateGrowFrameHeight} from '../src/components/GrowFrame';
import {fromFrame, Context} from '@shopify/app-bridge';
import {HostProvider, useHostContext} from '@shopify/app-bridge-host';
import AppBridgeLoading from '@shopify/app-bridge-host/components/Loading';
import AppBridgeModal from '@shopify/app-bridge-host/components/Modal';
import AppBridgeContextualSaveBar from '@shopify/app-bridge-host/components/ContextualSaveBar';
import {Group} from '@shopify/app-bridge/actions';
import {setFeaturesAvailable} from '@shopify/app-bridge-host/store';

// Force the CommonJS bundle (node_modules/@shopify/react-i18n/build/cjs) so it
// matches the bundle @shopify/app-bridge-host uses. Otherwise, the Context
// objects are different and we get errors.
const {I18nContext, I18nManager} = require('@shopify/react-i18n');

const DEFAULT_LOCALE = 'en';
const I18N_MANAGER = new I18nManager({locale: DEFAULT_LOCALE, country: 'US'});

const config = {
  apiKey: 'Client ID retrieved from the Partner Dashboard',
  appId: 'app id from GraphQL',
  handle: 'my-app-handle',
  shopId: 'shop id from GraphQL',
  url: 'http://localhost:3000/',
  name: 'app name',
};

const initialState = {
  features: setFeaturesAvailable(
    Group.AuthCode,
    Group.Button,
    Group.ButtonGroup,
    Group.Cart,
    Group.Client,
    Group.ContextualSaveBar,
    Group.Error,
    Group.Features,
    Group.FeedbackModal,
    Group.Fullscreen,
    Group.LeaveConfirmation,
    Group.Link,
    Group.Loading,
    Group.Menu,
    Group.Modal,
    Group.Navigation,
    Group.Performance,
    Group.Pos,
    Group.Print,
    Group.ResourcePicker,
    Group.Scanner,
    Group.SessionToken,
    Group.Share,
    Group.TitleBar,
    Group.Toast,
    Group.MarketingExternalActivityTopBar,
    Group.WebVitals,
  ),
};

// NOTE: Attempted to replace this with an AppBridge <MainFrame> component, but
// ran into some issues:
// 1. <MainFrame> strips the `.search` from the frame URL which our "app"
//    (Playroom preview) requires.
//    Possible fix: patch-package it back in.
// 2. The callback for `onLoad` of a <MainFrame> may trigger too early, so we
//    need a better place to run updateGrowFrameHeight() method so the docs site
//    knows the height to allocate to rendering the App Bridge + iframe.
const TheFrame = () => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const hostContext = useHostContext();

  // Forward the query string down to the "app" (Playroom preview): it contains
  // the code to render
  const {query} = useRouter();
  const stringifiedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const iframeSrc = `/playroom/preview/?${stringifiedQuery}`;

  useEffect(() => {
    if (!frameRef?.current) {
      console.error(
        'Unable to create frame transport: iframe has not loaded in time',
      );
      return;
    }

    // Listen to events posted from the app frame
    const transport = fromFrame(
      {
        window: frameRef.current.contentWindow,
        // We listen in to window.top here because app-bridge posts all messages to
        // window.top (https://developer.mozilla.org/en-US/docs/Web/API/Window/top):
        // https://github.com/Shopify/app-bridge/blob/2689a2b754321e0fc243aa33c16c9e43c8fb5c52/packages/app-bridge/src/MessageTransport.ts#LL230C17-L230C17
        // Which is called from https://github.com/Shopify/app-bridge/blob/2689a2b754321e0fc243aa33c16c9e43c8fb5c52/packages/app-bridge/src/client/Client.ts#L266
        // NOTE: In Web Admint this works because window.top IS the host window.
        // But in our case, we've got another window above (the polaris docs
        // site), so window.top no longer matches to the host window. This may
        // or may not be intentional behaviour in App Bridge.
        host: window.top,
      },
      window.location.origin,
      Context.Main,
    );
    const detach = hostContext.app.attach(transport);
    return detach;
  }, [hostContext.app]);

  // DEBUG output
  useEffect(() => {
    const messageListener = (e: any) => console.log('received message', e.data);
    window.top!.addEventListener('message', messageListener);
    return () => window.top!.removeEventListener('message', messageListener);
  }, []);
  // End DEBUG output

  return (
    <GrowFrame
      ref={frameRef}
      id="app-iframe"
      style={{
        display: 'block',
        resize: 'horizontal',
        overflow: 'auto',
        width: '100%',
        maxWidth: '100%',
        minWidth: '375px',
      }}
      defaultHeight="400px"
      src={iframeSrc}
      onContentLoad={() => {
        updateGrowFrameHeight(`${document.body.scrollHeight}px`);
      }}
    />
  );
};

const logo = {
  width: 124,
  topBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
  contextualSaveBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
  url: 'http://jadedpixel.com',
  accessibilityLabel: 'Jaded Pixel',
};

export default function AppEmulator() {
  return (
    <AppProvider i18n={enTranslations}>
      <I18nContext.Provider value={I18N_MANAGER}>
        {'' /* TODO: Tweak this to be more admin-like */}
        <Frame
          logo={logo}
          topBar={
            <TopBar
              showNavigationToggle
              userMenu={
                <TopBar.UserMenu
                  actions={[]}
                  open={false}
                  onToggle={() => {}}
                  name="Dharma"
                  initials="D"
                />
              }
              searchResultsVisible={false}
              searchField={null}
              searchResults={null}
            />
          }
          navigation={
            <Navigation location="/">
              <Navigation.Section
                items={[
                  {
                    label: 'Home',
                    icon: HomeMajor,
                  },
                  {
                    label: 'Orders',
                    icon: OrdersMajor,
                  },
                ]}
              />
              <Navigation.Section
                title="Apps"
                items={[
                  {
                    label: 'My App',
                    icon: HomeMajor,
                  },
                ]}
              />
            </Navigation>
          }
          showMobileNavigation={false}
        >
          <Page title="My App" divider fullWidth>
            <div
              style={{
                outline: '10px solid teal',
                borderRadius: '1px',
                marginBottom: '10px',
              }}
            >
              <HostProvider
                config={config}
                components={[
                  AppBridgeLoading,
                  AppBridgeModal,
                  AppBridgeContextualSaveBar,
                  TheFrame,
                ]}
                initialState={initialState}
              />
            </div>
          </Page>
        </Frame>
      </I18nContext.Provider>
    </AppProvider>
  );
}
