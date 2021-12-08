export function rem(px: string) {
  const baseFontSize = 16;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}
