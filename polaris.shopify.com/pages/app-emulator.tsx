import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {AppProvider, Frame} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import GrowFrame, {updateGrowFrameHeight} from '../src/components/GrowFrame';
import {HostProvider} from '@shopify/app-bridge-host';
import Loading from '@shopify/app-bridge-host/components/Loading';
import Modal from '@shopify/app-bridge-host/components/Modal';

import {Group} from '@shopify/app-bridge/actions';
import {setFeaturesAvailable} from '@shopify/app-bridge-host/store';

const config = {
  apiKey: 'Client ID retrieved from the Partner Dashboard',
  appId: 'app id from GraphQL',
  handle: 'my-app-handle',
  shopId: 'shop id from GraphQL',
  url: 'http://localhost:3000/',
  name: 'app name',
};

const initialState = {
  features: setFeaturesAvailable(Group.Loading, Group.Modal, Group.Navigation),
};

// TODO: Attempted to replace this with an AppBridge <MainFrame> component, but
// ran into some issues:
// 1. <MainFrame> strips the `.search` from the frame URL which our "app"
//    (Playroom preview) requires
// 2. There's no callback for `onLoad` of a <MainFrame> which need to trigger
//    the updateGrowFrameHeight() method so the docs site knows the height to
//    allocate to rendering the App Bridge + iframe.
// 3. The render tree looks approx like:
//    <window>
//      <body>
//        <iframe id="live-preview-iframe">
//          <iframe id="app-iframe" />
//        </iframe>
//      </body>
//    </window>
//    Within #app-iframe, the app-bridge code does window.top.postMessage(),
//    meaning messages are sent all the way up to the <window>.
//    However, within the #live-preview-iframe, the app-bridge-host code only
//    listens to events on window.addEventListener (note: no `.top`!), meaning
//    the #live-preview-iframe.
//    So the place the events are being listened for, and the place they're
//    being sent to are different. We attempted to forward events on to the
//    correct window (see below), but couldn't get it to work.
const TheFrame = () => {
  const {query} = useRouter();
  const stringifiedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const iframeSrc = `/playroom/preview/?${stringifiedQuery}`;
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const messageListener = (e: any) => {
      // TODO filter so we only log messages from app-bridge;
      // NOTE: There are other postMessage events coming in (eg; from
      // <GrowFrame>)
      if (e.source?.frameElement === frameRef?.current) {
        window.postMessage(e.data);
        console.log(e);
      }
    };
    // We listen in to window.top here
    // Because appbridge posts all messages to
    // window.top https://developer.mozilla.org/en-US/docs/Web/API/Window/top
    // This app-emulator is itself an iframe inside of the polaris docs site
    // this iFrame is not the top.
    window.top!.addEventListener('message', messageListener);
    return () => {
      return window.top!.removeEventListener('message', messageListener);
    };
  }, []);
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

export default function AppEmulator() {
  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <HostProvider
          config={config}
          components={[Loading, Modal, TheFrame]}
          initialState={initialState}
        />
      </Frame>
    </AppProvider>
  );
}
