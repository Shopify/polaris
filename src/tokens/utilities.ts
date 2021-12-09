const BASE_FONT_SIZE = 16;

export function rem(px: string) {
  return `${parseInt(px, 10) / BASE_FONT_SIZE}rem`;
}
