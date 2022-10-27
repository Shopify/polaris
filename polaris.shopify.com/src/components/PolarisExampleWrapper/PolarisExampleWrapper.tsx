import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {ComponentType} from 'react';
import styles from './PolarisExampleWrapper.module.scss';

const stylesheetHref =
  'https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css';

export const withPolarisExample = (Component: ComponentType) => {
  const PolarisHOC = (props: any) => {
    return (
      <>
        <link rel="stylesheet" href={stylesheetHref} />
        <AppProvider i18n={translations}>
          <div className={styles.Container}>
            <div id="polaris-example" className={styles.Example}>
              <Component {...props} />
            </div>
          </div>
        </AppProvider>
      </>
    );
  };

  if (Component.displayName) {
    PolarisHOC.displayName = `PolarisExample${Component.displayName}`;
  }

  return PolarisHOC;
};
