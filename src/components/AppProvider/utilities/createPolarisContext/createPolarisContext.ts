import {PolarisContext} from '../../../types';
import {
  createThemeContext,
  ThemeContext as CreateThemeContext,
} from '../../../ThemeProvider';
import {Props as AppProviderProps} from '../../AppProvider';
import {StickyManager} from '../withSticky';
import createAppProviderContext, {
  CreateAppProviderContext,
} from '../createAppProviderContext';

export interface CreatePolarisContext extends AppProviderProps {
  stickyManager?: StickyManager;
}

export function createPolarisContext(): PolarisContext;
export function createPolarisContext(
  contextOne: CreateAppProviderContext | CreateThemeContext,
): PolarisContext;
export function createPolarisContext(
  contextOne: CreateAppProviderContext | CreateThemeContext,
  contextTwo: CreateAppProviderContext | CreateThemeContext,
): PolarisContext;
export default function createPolarisContext(
  contextOne?: CreateAppProviderContext | CreateThemeContext,
  contextTwo?: CreateAppProviderContext | CreateThemeContext,
): PolarisContext {
  let appProviderContext: CreateAppProviderContext | undefined;
  let themeContext: CreateThemeContext | undefined;
  if (contextOne && 'logo' in contextOne) {
    themeContext = contextOne as CreateThemeContext;
    appProviderContext = contextTwo;
  } else {
    appProviderContext = contextOne;
    themeContext = contextTwo as CreateThemeContext | undefined;
  }

  const appProvider = appProviderContext
    ? createAppProviderContext(appProviderContext)
    : createAppProviderContext();
  const theme = themeContext
    ? createThemeContext(themeContext)
    : createThemeContext();

  return {...appProvider, ...theme};
}
