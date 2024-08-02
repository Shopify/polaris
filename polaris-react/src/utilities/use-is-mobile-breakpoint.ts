import {useBreakpoints} from './breakpoints';

export function useIsMobileBreakpoint() {
  const {mdDown} = useBreakpoints();
  return mdDown;
}
