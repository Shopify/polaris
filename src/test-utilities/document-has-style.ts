export default function documentHasStyle(key: string, value?: string): boolean {
  if (!document) {
    return false;
  }

  const documentElement = document.querySelector('html');

  if (arguments.length === 1) {
    return (
      documentElement != null && Boolean(documentElement.style[key as any])
    );
  }

  return documentElement != null && documentElement.style[key as any] === value;
}
