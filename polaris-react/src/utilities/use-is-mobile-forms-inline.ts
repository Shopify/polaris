import {useBreakpoints} from './breakpoints';

export function useIsMobileFormsInline() {
  const {mdDown} = useBreakpoints();
  return mdDown;
}
