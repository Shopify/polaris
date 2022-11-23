import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {ComponentType, useEffect} from 'react';
import styles from './PolarisExampleWrapper.module.scss';

export const withPolarisExample = (Component: ComponentType) => {
  const PolarisHOC = (props: any) => {
    useEffect(() => {
      window.parent.postMessage(
        'PLAYROOM COMPONENT LOADED',
        'http://localhost:3000',
      );
    });
    return (
      <>
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
