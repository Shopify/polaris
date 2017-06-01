export function handleMouseUpByBlurring({currentTarget}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}
