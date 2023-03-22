import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {type ComponentType, useLayoutEffect, useRef} from 'react';
import styles from './PolarisExampleWrapper.module.scss';
import {useGrowFrameUpdater} from '../GrowFrame';

export const withPolarisExample = (Component: ComponentType) => {
  const PolarisHOC = (props: any) => {
    useLayoutEffect(() => {
      // Need to undo Polaris's opinionated body height styles so we can shrink
      // the iframe when necessary.
      // Kludgy as fuck, but gets the job done.
      document.querySelectorAll('body, html').forEach((el) => {
        // @ts-expect-error Not sure how to tell TS that elements have a style
        el.style.height = 'auto';
        // @ts-expect-error Not sure how to tell TS that elements have a style
        el.style.minHeight = 'auto';
      });
    });

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Tell parent frame the rendered height of the given element
    useGrowFrameUpdater(wrapperRef);

    return (
      <>
        <AppProvider i18n={translations}>
          <div className={styles.Container} ref={wrapperRef}>
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
