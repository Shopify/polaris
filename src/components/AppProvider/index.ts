<<<<<<< HEAD
export {Props, default} from './AppProvider';
export {
=======
import AppProvider from './AppProvider';

export {Props, Context} from './AppProvider';
export {
  translate,
  withAppProvider,
  createAppProviderContext,
>>>>>>> master
  createPolarisContext,
  polarisAppProviderContextTypes,
  CreatePolarisContext,
  withSticky,
<<<<<<< HEAD
  Intl,
  translate,
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
  withAppProvider,
  WithAppProviderProps,
  Link,
} from './utilities';
export {LinkLikeComponent} from 'components';
=======
} from './utils';
export {default as Intl} from './Intl';
export {LinkLikeComponent} from '../UnstyledLink';
export * from './types';
export {
  SCROLL_LOCKING_ATTRIBUTE,
  SCROLL_LOCKING_CUSTOM_PROPERTY,
} from './ScrollLockManager';

export default AppProvider;
>>>>>>> master
