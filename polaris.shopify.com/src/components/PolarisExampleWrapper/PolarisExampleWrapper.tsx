import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {ComponentType} from 'react';
import styles from './PolarisExampleWrapper.module.scss';

export const withPolarisExample = (Component: ComponentType) => {
  const PolarisHOC = (props: any) => {
    return (
      <>
        <AppProvider
          i18n={translations}
          features={{polarisSummerEditions2023: false}}
        >
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
