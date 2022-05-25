import {AppProvider, CustomProperties} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import { useEffect } from 'react';

interface ExampleProps {
    children: JSX.Element;
}

const stylesheetHref = 'https://unpkg.com/@shopify/polaris@9.9.0-next.1/build/esm/styles.css';

function PolarisExample(props: ExampleProps) {
  useEffect(() => {
    let stylesheetElement = document.createElement('link');

    stylesheetElement.href = stylesheetHref;
    stylesheetElement.rel = 'stylesheet';

    // document.head.appendChild(stylesheetElement);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@9.9.0-next.1/build/esm/styles.css"
      />
      <AppProvider i18n={translations}>
        <CustomProperties>
          {props.children}
        </CustomProperties>
      </AppProvider>
    </>
  );
}

export default PolarisExample;
