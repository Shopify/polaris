export function scrollOptionIntoView(
  option: HTMLElement,
  scrollable: HTMLElement,
) {
  const listTop = scrollable.scrollTop;
  const listBottom = listTop + scrollable.clientHeight;
  const {offsetHeight: optionHeight} = option;
  const {offsetTop: optionTop} = option;
  const optionBottom = optionTop + optionHeight;
  const isVisible = optionTop > listTop && optionBottom < listBottom;

  if (!isVisible) {
    let top = 0;
    if (optionBottom > listBottom) {
      top = optionBottom + optionHeight * 0.85 - listBottom;
    } else if (optionTop < listTop) {
      top = optionTop - optionHeight * 0.15 - listTop;
    }

    requestAnimationFrame(() => {
      scrollable.scrollBy({top, behavior: 'auto'});
    });
  }
}
